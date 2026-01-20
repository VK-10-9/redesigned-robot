"""
Load cleaned aggregated CSVs (CSV-first workflow).

Postgres support is deprecated in this repository. The script supports a dry-run CSV summary
mode (recommended) and will not write to a database unless an explicit --db-url is provided.
If you need the legacy Postgres import, see `scripts/postgres_deprecated/` for archived helpers.

Usage (dry-run summary):
  python scripts/load_dataset.py --dir dataset/clean --dry-run --sample 50000

Usage (DEPRECATED: write to Postgres):
  python scripts/load_dataset.py --dir dataset/clean --db-url postgresql://user:pass@localhost:5432/vidyut
"""

# ruff: noqa: E402

import argparse
import os

# psycopg2 is only required when writing to Postgres. Import lazily so dry-run works without it.
try:
    import psycopg2
    from psycopg2.extras import execute_values

    PSYCOPG2_AVAILABLE = True
except Exception:
    psycopg2 = None
    execute_values = None
    PSYCOPG2_AVAILABLE = False

import csv
import hashlib
import sys
from datetime import datetime
from pathlib import Path

# Ensure project root is importable when this script is run directly
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


def compute_md5(path, chunk_size=8192):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            h.update(chunk)
    return h.hexdigest()


def preprocess_files_to_temp(
    file_paths, kind, normalize=False, dedup_mode="none", dedup_keys=None
):
    """Combine multiple CSV files, optionally normalize and deduplicate, and write a single temp CSV.
    Returns (temp_file_path, rows_written).
    """
    import tempfile

    try:
        from backend.adif_normalizer import dedupe_iter, normalize_row
    except Exception:
        import sys
        from pathlib import Path

        sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
        from backend.adif_normalizer import dedupe_iter, normalize_row

    keys = [k.strip() for k in (dedup_keys or "").split(",")] if dedup_keys else None
    field_map = {
        "enrollment": [
            "date",
            "state",
            "district",
            "pincode",
            "age_0_5",
            "age_5_17",
            "age_18_greater",
        ],
        "demographic": [
            "date",
            "state",
            "district",
            "pincode",
            "demo_age_5_17",
            "demo_age_17_plus",
        ],
        "biometric": [
            "date",
            "state",
            "district",
            "pincode",
            "bio_age_5_17",
            "bio_age_17_plus",
        ],
    }
    fields = field_map.get(kind)
    tmp = tempfile.NamedTemporaryFile(
        delete=False, mode="w", encoding="utf-8", newline=""
    )
    rows_written = 0
    with tmp:
        writer = csv.DictWriter(tmp, fieldnames=fields)
        writer.writeheader()

        def gen_all():
            for p in file_paths:
                with open(p, "r", encoding="utf-8", errors="replace") as f:
                    reader = csv.DictReader(f)
                    for r in reader:
                        if normalize:
                            r = normalize_row(r)
                        yield r

        rows_iter = (
            dedupe_iter(gen_all(), mode=dedup_mode, composite_keys=keys)
            if (dedup_mode and dedup_mode != "none")
            else gen_all()
        )
        for r in rows_iter:
            out = {k: r.get(k, "") for k in fields}
            writer.writerow(out)
            rows_written += 1

    return tmp.name, rows_written


def processed_file_exists(conn, md5sum):
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM processed_files WHERE md5 = %s LIMIT 1", (md5sum,))
        return cur.fetchone() is not None


def mark_file_processed(conn, file_path, md5sum, size):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO processed_files (file_path, md5, file_size, loaded_at) VALUES (%s, %s, %s, %s) ON CONFLICT (md5) DO UPDATE SET loaded_at = EXCLUDED.loaded_at, file_path = EXCLUDED.file_path",
            (file_path, md5sum, size, datetime.now()),
        )
    conn.commit()


def get_conn(db_url):
    if not PSYCOPG2_AVAILABLE:
        raise RuntimeError(
            "psycopg2 is not installed in this environment. Install requirements or run with --dry-run"
        )
    return psycopg2.connect(db_url)


def copy_csv_to_temp(conn, csv_path, temp_table, columns):
    with conn.cursor() as cur, open(csv_path, "r", encoding="utf-8") as f:
        # Use COPY FROM STDIN for speed
        cur.execute(
            f"CREATE TEMP TABLE {temp_table} (LIKE {temp_table}_template) ON COMMIT DROP;"
        )
        # We use copy_expert with explicit columns
        sql = f"COPY {temp_table} ({', '.join(columns)}) FROM STDIN WITH CSV HEADER"
        cur.copy_expert(sql, f)
    conn.commit()


def upsert_enrollment(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO enrollment_aggregated (date, state, district, pincode, age_0_5, age_5_17, age_18_greater)
            SELECT date, state, district, pincode, SUM(age_0_5), SUM(age_5_17), SUM(age_18_greater)
            FROM temp_enrollment
            GROUP BY date, state, district, pincode
            ON CONFLICT (date, state, district, pincode) DO UPDATE
            SET age_0_5 = enrollment_aggregated.age_0_5 + EXCLUDED.age_0_5,
                age_5_17 = enrollment_aggregated.age_5_17 + EXCLUDED.age_5_17,
                age_18_greater = enrollment_aggregated.age_18_greater + EXCLUDED.age_18_greater
            """
        )
    conn.commit()


def upsert_demographic(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO demographic_aggregated (date, state, district, pincode, demo_age_5_17, demo_age_17_plus)
            SELECT date, state, district, pincode, SUM(demo_age_5_17), SUM(demo_age_17_plus)
            FROM temp_demographic
            GROUP BY date, state, district, pincode
            ON CONFLICT (date, state, district, pincode) DO UPDATE
            SET demo_age_5_17 = demographic_aggregated.demo_age_5_17 + EXCLUDED.demo_age_5_17,
                demo_age_17_plus = demographic_aggregated.demo_age_17_plus + EXCLUDED.demo_age_17_plus
            """
        )
    conn.commit()


def upsert_biometric(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO biometric_aggregated (date, state, district, pincode, bio_age_5_17, bio_age_17_plus)
            SELECT date, state, district, pincode, SUM(bio_age_5_17), SUM(bio_age_17_plus)
            FROM temp_biometric
            GROUP BY date, state, district, pincode
            ON CONFLICT (date, state, district, pincode) DO UPDATE
            SET bio_age_5_17 = biometric_aggregated.bio_age_5_17 + EXCLUDED.bio_age_5_17,
                bio_age_17_plus = biometric_aggregated.bio_age_17_plus + EXCLUDED.bio_age_17_plus
            """
        )
    conn.commit()


import time


def load_folder(
    conn,
    folder_path,
    kind,
    force=False,
    single_file=None,
    normalize=False,
    dedup_mode="none",
    dedup_keys=None,
):
    files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(".csv")])
    if not files:
        print(f"No CSV files found in {folder_path}")
        return 0

    files_to_process = files
    if single_file:
        single_name = os.path.basename(single_file)
        if single_name in files:
            files_to_process = [single_name]
        else:
            files_to_process = [single_file]  # allow absolute path

    loaded_count = 0

    # If dedup is requested and there are multiple files, create one combined preprocessed CSV and load once
    if (dedup_mode and dedup_mode != "none") and len(files_to_process) > 1:
        file_paths = [
            f if os.path.isabs(f) else os.path.join(folder_path, f)
            for f in files_to_process
        ]
        print(
            f"Performing cross-file dedup for {len(file_paths)} files in {folder_path}..."
        )
        tmp_path, rows_written = preprocess_files_to_temp(
            file_paths,
            kind,
            normalize=normalize,
            dedup_mode=dedup_mode,
            dedup_keys=dedup_keys,
        )
        try:
            print(
                f"Loading combined preprocessed file {tmp_path} ({rows_written} rows) into DB"
            )
            # Create temp template if needed (reuse existing per-kind templates)
            if kind == "enrollment":
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        CREATE TEMP TABLE IF NOT EXISTS temp_enrollment_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            age_0_5 INT,
                            age_5_17 INT,
                            age_18_greater INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_enrollment (LIKE temp_enrollment_template) ON COMMIT DROP;"
                )
                with open(tmp_path, "r", encoding="utf-8") as f:
                    cur.copy_expert(
                        "COPY temp_enrollment FROM STDIN WITH CSV HEADER", f
                    )
                conn.commit()
                upsert_enrollment(conn)
            elif kind == "demographic":
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        CREATE TEMP TABLE IF NOT EXISTS temp_demographic_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            demo_age_5_17 INT,
                            demo_age_17_plus INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_demographic (LIKE temp_demographic_template) ON COMMIT DROP;"
                )
                with open(tmp_path, "r", encoding="utf-8") as f:
                    cur.copy_expert(
                        "COPY temp_demographic FROM STDIN WITH CSV HEADER", f
                    )
                conn.commit()
                upsert_demographic(conn)
            elif kind == "biometric":
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        CREATE TEMP TABLE IF NOT EXISTS temp_biometric_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            bio_age_5_17 INT,
                            bio_age_17_plus INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_biometric (LIKE temp_biometric_template) ON COMMIT DROP;"
                )
                with open(tmp_path, "r", encoding="utf-8") as f:
                    cur.copy_expert("COPY temp_biometric FROM STDIN WITH CSV HEADER", f)
                conn.commit()
                upsert_biometric(conn)

            # Mark all original files processed on success
            for fname in files_to_process:
                full = (
                    fname if os.path.isabs(fname) else os.path.join(folder_path, fname)
                )
                md5sum = compute_md5(full)
                size = os.path.getsize(full)
                mark_file_processed(conn, full, md5sum, size)
                loaded_count += 1
            print(f"Loaded combined file and marked {loaded_count} files processed.")
        finally:
            try:
                os.remove(tmp_path)
            except Exception:
                pass
        return loaded_count

    for fname in files_to_process:
        full = fname if os.path.isabs(fname) else os.path.join(folder_path, fname)
        md5sum = compute_md5(full)
        size = os.path.getsize(full)

        # Check processed files
        if processed_file_exists(conn, md5sum) and not force:
            print(f"Skipping already-processed file: {full}")
            continue

        print(f"Loading {full} ({kind})...")
        start = time.time()
        # Count rows in file for progress summary
        try:
            with open(full, "r", encoding="utf-8", errors="replace") as fh:
                total_rows = sum(1 for _ in fh) - 1
        except Exception:
            total_rows = None

        try:
            if kind == "enrollment":
                # Create a temporary table template to use in copy
                with conn.cursor() as cur, open(full, "r", encoding="utf-8") as f:
                    # Ensure temp template exists
                    cur.execute(
                        """
                        CREATE TEMP TABLE IF NOT EXISTS temp_enrollment_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            age_0_5 INT,
                            age_5_17 INT,
                            age_18_greater INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                    # Preprocess CSV (normalize/dedup) if requested
                preprocessed = full
                if normalize or (dedup_mode and dedup_mode != "none"):
                    import tempfile

                    from backend.adif_normalizer import dedupe_iter, normalize_row

                    keys = (
                        [k.strip() for k in (dedup_keys or "").split(",")]
                        if dedup_keys
                        else None
                    )
                    tmp = tempfile.NamedTemporaryFile(
                        delete=False, mode="w", encoding="utf-8", newline=""
                    )
                    with (
                        open(full, "r", encoding="utf-8", errors="replace") as inf,
                        tmp,
                    ):
                        reader = csv.DictReader(inf)
                        writer = csv.DictWriter(
                            tmp,
                            fieldnames=[
                                "date",
                                "state",
                                "district",
                                "pincode",
                                "age_0_5",
                                "age_5_17",
                                "age_18_greater",
                            ],
                        )
                        writer.writeheader()

                        def gen():
                            for r in reader:
                                if normalize:
                                    r = normalize_row(r)
                                yield r

                        rows_iter = (
                            dedupe_iter(gen(), mode=dedup_mode, composite_keys=keys)
                            if (dedup_mode and dedup_mode != "none")
                            else gen()
                        )
                        for r in rows_iter:
                            # ensure ordering of columns
                            out = {
                                k: r.get(k, "")
                                for k in [
                                    "date",
                                    "state",
                                    "district",
                                    "pincode",
                                    "age_0_5",
                                    "age_5_17",
                                    "age_18_greater",
                                ]
                            }
                            writer.writerow(out)
                    preprocessed = tmp.name

                # Copy into a working temp table then upsert
                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_enrollment (LIKE temp_enrollment_template) ON COMMIT DROP;"
                )
                with open(preprocessed, "r", encoding="utf-8") as f:
                    cur.copy_expert(
                        "COPY temp_enrollment FROM STDIN WITH CSV HEADER", f
                    )
                conn.commit()
                upsert_enrollment(conn)
            elif kind == "demographic":
                with conn.cursor() as cur:
                    cur.execute(
                        """
                    cur.execute("CREATE TEMP TABLE IF NOT EXISTS temp_demographic_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            demo_age_5_17 INT,
                            demo_age_17_plus INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                # Preprocess for demographic
                preprocessed = full
                if normalize or (dedup_mode and dedup_mode != "none"):
                    import tempfile

                    from backend.adif_normalizer import dedupe_iter, normalize_row

                    keys = (
                        [k.strip() for k in (dedup_keys or "").split(",")]
                        if dedup_keys
                        else None
                    )
                    tmp = tempfile.NamedTemporaryFile(
                        delete=False, mode="w", encoding="utf-8", newline=""
                    )
                    with (
                        open(full, "r", encoding="utf-8", errors="replace") as inf,
                        tmp,
                    ):
                        reader = csv.DictReader(inf)
                        writer = csv.DictWriter(
                            tmp,
                            fieldnames=[
                                "date",
                                "state",
                                "district",
                                "pincode",
                                "demo_age_5_17",
                                "demo_age_17_plus",
                            ],
                        )
                        writer.writeheader()

                        def gen():
                            for r in reader:
                                if normalize:
                                    r = normalize_row(r)
                                yield r

                        rows_iter = (
                            dedupe_iter(gen(), mode=dedup_mode, composite_keys=keys)
                            if (dedup_mode and dedup_mode != "none")
                            else gen()
                        )
                        for r in rows_iter:
                            out = {
                                k: r.get(k, "")
                                for k in [
                                    "date",
                                    "state",
                                    "district",
                                    "pincode",
                                    "demo_age_5_17",
                                    "demo_age_17_plus",
                                ]
                            }
                            writer.writerow(out)
                    preprocessed = tmp.name

                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_demographic (LIKE temp_demographic_template) ON COMMIT DROP;"
                )
                with open(preprocessed, "r", encoding="utf-8") as f:
                    cur.copy_expert(
                        "COPY temp_demographic FROM STDIN WITH CSV HEADER", f
                    )
                conn.commit()
                upsert_demographic(conn)
            elif kind == "biometric":
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        CREATE TEMP TABLE IF NOT EXISTS temp_biometric_template (
                            date DATE,
                            state TEXT,
                            district TEXT,
                            pincode TEXT,
                            bio_age_5_17 INT,
                            bio_age_17_plus INT
                        ) ON COMMIT DROP
                        """
                    )
                    conn.commit()
                # Preprocess for biometric
                preprocessed = full
                if normalize or (dedup_mode and dedup_mode != "none"):
                    import tempfile

                    from backend.adif_normalizer import dedupe_iter, normalize_row

                    keys = (
                        [k.strip() for k in (dedup_keys or "").split(",")]
                        if dedup_keys
                        else None
                    )
                    tmp = tempfile.NamedTemporaryFile(
                        delete=False, mode="w", encoding="utf-8", newline=""
                    )
                    with (
                        open(full, "r", encoding="utf-8", errors="replace") as inf,
                        tmp,
                    ):
                        reader = csv.DictReader(inf)
                        writer = csv.DictWriter(
                            tmp,
                            fieldnames=[
                                "date",
                                "state",
                                "district",
                                "pincode",
                                "bio_age_5_17",
                                "bio_age_17_plus",
                            ],
                        )
                        writer.writeheader()

                        def gen():
                            for r in reader:
                                if normalize:
                                    r = normalize_row(r)
                                yield r

                        rows_iter = (
                            dedupe_iter(gen(), mode=dedup_mode, composite_keys=keys)
                            if (dedup_mode and dedup_mode != "none")
                            else gen()
                        )
                        for r in rows_iter:
                            out = {
                                k: r.get(k, "")
                                for k in [
                                    "date",
                                    "state",
                                    "district",
                                    "pincode",
                                    "bio_age_5_17",
                                    "bio_age_17_plus",
                                ]
                            }
                            writer.writerow(out)
                    preprocessed = tmp.name

                cur = conn.cursor()
                cur.execute(
                    "CREATE TEMP TABLE temp_biometric (LIKE temp_biometric_template) ON COMMIT DROP;"
                )
                with open(preprocessed, "r", encoding="utf-8") as f:
                    cur.copy_expert("COPY temp_biometric FROM STDIN WITH CSV HEADER", f)
                conn.commit()
                upsert_biometric(conn)
            else:
                print(f"Unknown kind: {kind}")

            # Mark file processed on success
            mark_file_processed(conn, full, md5sum, size)
            elapsed = time.time() - start
            loaded_count += 1
            print(
                f"Loaded and recorded: {full} (rows: {total_rows if total_rows is not None else 'unknown'}, elapsed: {elapsed:.1f}s)"
            )
        except Exception as e:
            print(f"Error loading {full}: {e}")
            # Do not mark as processed on failure
            continue

    return loaded_count


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--dir",
        default="dataset/clean",
        help="Directory containing cleaned CSV folders",
    )
    parser.add_argument(
        "--db-url",
        default=os.getenv("DATABASE_URL", None),
        help="Postgres DB URL (DEPRECATED: set to write to Postgres; default is None)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Force reprocess files even if already recorded",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Dry run: summarize CSVs without writing to DB",
    )
    parser.add_argument(
        "--sample",
        type=int,
        default=0,
        help="Only read N rows from each CSV (0 = full file)",
    )
    parser.add_argument(
        "--file",
        type=str,
        default=None,
        help="Optional: path to a single CSV file to process instead of folders",
    )
    parser.add_argument(
        "--validate",
        action="store_true",
        help="Run post-load validation queries against DB",
    )
    parser.add_argument(
        "--normalize",
        action="store_true",
        help="Normalize rows (ADIF normalization) before processing",
    )
    parser.add_argument(
        "--dedup",
        choices=["none", "hash", "composite", "id"],
        default="none",
        help="Dedup mode to apply when processing rows",
    )
    parser.add_argument(
        "--dedup-keys",
        type=str,
        default=None,
        help="Comma-separated keys for composite dedup (e.g., date,state)",
    )
    args = parser.parse_args()

    # Dry-run mode: summarize CSV files locally without DB changes
    # Writing to Postgres is deprecated. To avoid accidental DB writes, require an explicit
    # --db-url to be provided when running non-dry modes. Use --dry-run for CSV summaries.
    if not args.dry_run and not args.db_url:
        print(
            "Error: Writing to Postgres is deprecated. Use --dry-run for CSV summaries or provide --db-url explicitly to proceed (not recommended)."
        )
        exit(1)

    if args.dry_run:

        def dry_run_file(
            path, kind, sample=0, normalize=False, dedup_mode="none", dedup_keys=None
        ):
            # Summarize totals per state and per month
            def safe_int(val):
                if val is None:
                    return 0
                s = "".join(c for c in str(val) if c.isdigit())
                try:
                    return int(s) if s else 0
                except ValueError:
                    return 0

            totals_by_state = {}
            totals_by_month = {}
            top_districts = {}
            rows = 0
            # Optionally apply normalization and deduplication by creating a generator pipeline
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                reader = csv.DictReader(f)

                def gen_rows():
                    cnt = 0
                    for r in reader:
                        if sample:
                            cnt += 1
                            if cnt > sample:
                                break
                        # Normalize first if requested
                        if normalize:
                            from backend.adif_normalizer import normalize_row

                            r = normalize_row(r)
                        yield r

                # Apply dedup if requested
                if dedup_mode and dedup_mode != "none":
                    try:
                        from backend.adif_normalizer import dedupe_iter
                    except Exception:
                        import sys
                        from pathlib import Path

                        sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
                        from backend.adif_normalizer import dedupe_iter

                    keys = (
                        [k.strip() for k in (dedup_keys or "").split(",")]
                        if dedup_keys
                        else None
                    )
                    row_iter = dedupe_iter(
                        gen_rows(), mode=dedup_mode, composite_keys=keys
                    )
                else:
                    row_iter = gen_rows()

                for row in row_iter:
                    rows += 1
                    state = (row.get("state") or row.get("State") or "").strip()
                    district = (
                        row.get("district") or row.get("District") or ""
                    ).strip()
                    date_raw = row.get("date") or row.get("Date")
                    # handle date formats like 01-03-2025 or 2025-03-09
                    date_key = None
                    if date_raw:
                        parts = str(date_raw).split("-")
                        if len(parts) >= 3 and len(parts[0]) == 4:
                            # YYYY-MM-DD
                            date_key = str(date_raw)[:7]
                        elif len(parts) >= 3:
                            # DD-MM-YYYY -> YYYY-MM
                            date_key = f"{parts[2]}-{parts[1]}"
                    # compute totals depending on kind
                    if kind == "enrollment":
                        a0 = safe_int(
                            row.get("age_0_5")
                            or row.get("age_0-5")
                            or row.get("age_0_5 ")
                        )
                        a5 = safe_int(
                            row.get("age_5_17")
                            or row.get("age_5-17")
                            or row.get("age_5_17 ")
                        )
                        a18 = safe_int(
                            row.get("age_18_greater")
                            or row.get("age_18+")
                            or row.get("age_18_greater ")
                        )
                        total = a0 + a5 + a18
                    elif kind == "demographic":
                        a5 = safe_int(
                            row.get("demo_age_5_17")
                            or row.get("demo_age_5-17")
                            or row.get("demo_age_5_17 ")
                        )
                        a17 = safe_int(
                            row.get("demo_age_17_")
                            or row.get("demo_age_17")
                            or row.get("demo_age_17 ")
                        )
                        total = a5 + a17
                    elif kind == "biometric":
                        b5 = safe_int(
                            row.get("bio_age_5_17")
                            or row.get("bio_age_5-17")
                            or row.get("bio_age_5_17 ")
                        )
                        b17 = safe_int(
                            row.get("bio_age_17_")
                            or row.get("bio_age_17")
                            or row.get("bio_age_17 ")
                        )
                        total = b5 + b17
                    else:
                        total = 0

                    if state:
                        s = state.strip()
                        totals_by_state[s] = totals_by_state.get(s, 0) + total
                    if date_key:
                        totals_by_month[date_key] = (
                            totals_by_month.get(date_key, 0) + total
                        )
                    if district:
                        k = f"{state}::{district}"
                        top_districts[k] = top_districts.get(k, 0) + total

            # Prepare summaries
            top_states = sorted(
                totals_by_state.items(), key=lambda x: x[1], reverse=True
            )[:10]
            top_months = sorted(totals_by_month.items(), key=lambda x: x[0])
            top_districts_list = sorted(
                top_districts.items(), key=lambda x: x[1], reverse=True
            )[:10]
            return {
                "path": path,
                "rows_read": rows,
                "top_states": top_states,
                "top_months": top_months[:12],
                "top_districts": top_districts_list,
            }

        def dry_run_folder(
            folder_path,
            kind,
            sample=0,
            normalize=False,
            dedup_mode="none",
            dedup_keys=None,
        ):
            files = sorted(
                [f for f in os.listdir(folder_path) if f.lower().endswith(".csv")]
            )
            if not files:
                print(f"No CSV files found in {folder_path}")
                return []

            # If dedup is enabled, combine files and dedup across them (single combined summary)
            if dedup_mode and dedup_mode != "none":
                try:
                    from backend.adif_normalizer import dedupe_iter, normalize_row
                except Exception:
                    # make project root importable and retry (when invoked as a subprocess)
                    import sys
                    from pathlib import Path

                    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
                    from backend.adif_normalizer import dedupe_iter, normalize_row

                keys = (
                    [k.strip() for k in (dedup_keys or "").split(",")]
                    if dedup_keys
                    else None
                )

                def combined_gen():
                    for fname in files[:2]:
                        full = os.path.join(folder_path, fname)
                        print(f"Dry-run summarizing {full} (combined dedup)...")
                        with open(full, "r", encoding="utf-8", errors="replace") as f:
                            reader = csv.DictReader(f)
                            for r in reader:
                                if normalize:
                                    r = normalize_row(r)
                                yield r

                rows = list(
                    dedupe_iter(combined_gen(), mode=dedup_mode, composite_keys=keys)
                )
                # Summarize combined rows
                totals_by_state = {}
                totals_by_month = {}
                top_districts = {}

                def local_safe_int(val):
                    if val is None:
                        return 0
                    s = "".join(c for c in str(val) if c.isdigit())
                    try:
                        return int(s) if s else 0
                    except ValueError:
                        return 0

                for row in rows:
                    state = (row.get("state") or row.get("State") or "").strip()
                    district = (
                        row.get("district") or row.get("District") or ""
                    ).strip()
                    date_raw = row.get("date") or row.get("Date")
                    date_key = None
                    if date_raw:
                        parts = str(date_raw).split("-")
                        if len(parts) >= 3 and len(parts[0]) == 4:
                            date_key = str(date_raw)[:7]
                        elif len(parts) >= 3:
                            date_key = f"{parts[2]}-{parts[1]}"
                    if kind == "enrollment":
                        total = (
                            local_safe_int(
                                row.get("age_0_5")
                                or row.get("age_0-5")
                                or row.get("age_0_5 ")
                            )
                            + local_safe_int(
                                row.get("age_5_17")
                                or row.get("age_5-17")
                                or row.get("age_5_17 ")
                            )
                            + local_safe_int(
                                row.get("age_18_greater")
                                or row.get("age_18+")
                                or row.get("age_18_greater ")
                            )
                        )
                    elif kind == "demographic":
                        total = local_safe_int(
                            row.get("demo_age_5_17")
                            or row.get("demo_age_5-17")
                            or row.get("demo_age_5_17 ")
                        ) + local_safe_int(
                            row.get("demo_age_17_")
                            or row.get("demo_age_17")
                            or row.get("demo_age_17 ")
                        )
                    elif kind == "biometric":
                        total = local_safe_int(
                            row.get("bio_age_5_17")
                            or row.get("bio_age_5-17")
                            or row.get("bio_age_5_17 ")
                        ) + local_safe_int(
                            row.get("bio_age_17_")
                            or row.get("bio_age_17")
                            or row.get("bio_age_17 ")
                        )
                    else:
                        total = 0
                    if state:
                        totals_by_state[state] = totals_by_state.get(state, 0) + total
                    if date_key:
                        totals_by_month[date_key] = (
                            totals_by_month.get(date_key, 0) + total
                        )
                    if district:
                        k = f"{state}::{district}"
                        top_districts[k] = top_districts.get(k, 0) + total

                top_states = sorted(
                    totals_by_state.items(), key=lambda x: x[1], reverse=True
                )[:10]
                top_months = sorted(totals_by_month.items(), key=lambda x: x[0])
                top_districts_list = sorted(
                    top_districts.items(), key=lambda x: x[1], reverse=True
                )[:10]
                return [
                    {
                        "path": f"{folder_path}/combined",
                        "rows_read": len(rows),
                        "top_states": top_states,
                        "top_months": top_months[:12],
                        "top_districts": top_districts_list,
                    }
                ]

            # Default behaviour: summarize files individually (up to 2)
            results = []
            for fname in files[:2]:  # run on up to 2 files for quick validation
                full = os.path.join(folder_path, fname)
                print(f"Dry-run summarizing {full}...")
                res = dry_run_file(
                    full,
                    kind,
                    sample=sample,
                    normalize=normalize,
                    dedup_mode="none",
                    dedup_keys=None,
                )
                results.append(res)
            return results

        # Run dry-run for each dataset type (limit to 2 files each)
        enroll_folder = os.path.join(args.dir, "api_data_aadhar_enrolment")
        if os.path.isdir(enroll_folder):
            enroll_results = dry_run_folder(
                enroll_folder,
                "enrollment",
                sample=args.sample,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
            for r in enroll_results:
                print("\nEnrollment file summary:", r["path"])
                print("Rows read:", r["rows_read"])
                print("Top states (by total):")
                for s, val in r["top_states"]:
                    print(f"  {s}: {val:,}")
                print("Monthly sample:")
                for m, val in r["top_months"]:
                    print(f"  {m}: {val:,}")
                print("Top districts:")
                for d, val in r["top_districts"]:
                    print(f"  {d}: {val:,}")

        demo_folder = os.path.join(args.dir, "api_data_aadhar_demographic")
        if os.path.isdir(demo_folder):
            # handle nested folder
            sub = os.path.join(demo_folder, "api_data_aadhar_demographic")
            if os.path.isdir(sub):
                demo_folder = sub
            demo_results = dry_run_folder(
                demo_folder,
                "demographic",
                sample=args.sample,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
            for r in demo_results:
                print("\nDemographic file summary:", r["path"])
                print("Rows read:", r["rows_read"])
                print("Top states (by total):")
                for s, val in r["top_states"]:
                    print(f"  {s}: {val:,}")

        bio_folder = os.path.join(args.dir, "api_data_aadhar_biometric")
        if os.path.isdir(bio_folder):
            bio_results = dry_run_folder(
                bio_folder,
                "biometric",
                sample=args.sample,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
            for r in bio_results:
                print("\nBiometric file summary:", r["path"])
                print("Rows read:", r["rows_read"])
                print("Top states (by total):")
                for s, val in r["top_states"]:
                    print(f"  {s}: {val:,}")

        print("\nDry-run complete")
        exit(0)

    conn = get_conn(args.db_url) if not args.dry_run else None

    total_loaded = 0

    # If a single file specified, handle it directly
    if args.file:
        # Decide which kind by folder name heuristic
        p = args.file
        if "enrol" in p.lower():
            total_loaded += load_folder(
                conn,
                os.path.dirname(p) or ".",
                "enrollment",
                force=args.force,
                single_file=p,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
        elif "demo" in p.lower():
            total_loaded += load_folder(
                conn,
                os.path.dirname(p) or ".",
                "demographic",
                force=args.force,
                single_file=p,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
        elif "bio" in p.lower():
            total_loaded += load_folder(
                conn,
                os.path.dirname(p) or ".",
                "biometric",
                force=args.force,
                single_file=p,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )
        else:
            # Try all folders
            enroll_folder = os.path.join(args.dir, "api_data_aadhar_enrolment")
            if os.path.isdir(enroll_folder):
                total_loaded += load_folder(
                    conn,
                    enroll_folder,
                    "enrollment",
                    force=args.force,
                    single_file=p,
                    normalize=args.normalize,
                    dedup_mode=args.dedup,
                    dedup_keys=args.dedup_keys,
                )
    else:
        # Enrollment
        enroll_folder = os.path.join(args.dir, "api_data_aadhar_enrolment")
        if os.path.isdir(enroll_folder):
            total_loaded += load_folder(
                conn,
                enroll_folder,
                "enrollment",
                force=args.force,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )

        demo_folder = os.path.join(args.dir, "api_data_aadhar_demographic")
        if os.path.isdir(demo_folder):
            # Some datasets use a nested folder - handle both
            sub = os.path.join(demo_folder, "api_data_aadhar_demographic")
            if os.path.isdir(sub):
                demo_folder = sub
            total_loaded += load_folder(
                conn,
                demo_folder,
                "demographic",
                force=args.force,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )

        bio_folder = os.path.join(args.dir, "api_data_aadhar_biometric")
        if os.path.isdir(bio_folder):
            total_loaded += load_folder(
                conn,
                bio_folder,
                "biometric",
                force=args.force,
                normalize=args.normalize,
                dedup_mode=args.dedup,
                dedup_keys=args.dedup_keys,
            )

    print(f"Total files loaded: {total_loaded}")

    if args.validate and conn:
        # Run quick validation
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            print("\nValidation: top states by enrollment total")
            cur.execute(
                "SELECT state, SUM(age_0_5 + age_5_17 + age_18_greater) as total FROM enrollment_aggregated GROUP BY state ORDER BY total DESC LIMIT 10"
            )
            for r in cur.fetchall():
                print(f"  {r['state']}: {int(r['total']):,}")

            print("\nValidation: monthly timeline (last 12 months)")
            cur.execute(
                "SELECT DATE_TRUNC('month', date)::DATE as month, SUM(age_0_5 + age_5_17 + age_18_greater) as total FROM enrollment_aggregated WHERE date >= CURRENT_DATE - INTERVAL '12 months' GROUP BY month ORDER BY month ASC"
            )
            for r in cur.fetchall():
                print(f"  {r['month']}: {int(r['total']):,}")

            print("\nValidation: processed files count")
            cur.execute("SELECT COUNT(*) as processed_files FROM processed_files")
            print("  ", cur.fetchone()["processed_files"])

    if conn:
        conn.close()
    print("Load complete")
