"""
DEPRECATED: Postgres validation helper.

This script is retained for archival purposes. For CSV-only workflows use
`python scripts/load_dataset.py --dry-run` to get summaries. If you still want to run
validation against a Postgres instance, provide --db-url explicitly.
"""

import argparse

import psycopg2
from psycopg2.extras import RealDictCursor


def get_conn(db_url):
    return psycopg2.connect(db_url)


def top_states(conn, limit=10):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(
            "SELECT state, SUM(age_0_5 + age_5_17 + age_18_greater) as total "
            "FROM enrollment_aggregated "
            "GROUP BY state ORDER BY total DESC LIMIT %s",
            (limit,),
        )
        return cur.fetchall()


def timeline(conn, months=12):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(
            "SELECT DATE_TRUNC('month', date)::DATE as month, SUM(age_0_5 + age_5_17 + age_18_greater) as total "
            "FROM enrollment_aggregated "
            "WHERE date >= CURRENT_DATE - INTERVAL '%s months' "
            "GROUP BY month ORDER BY month ASC",
            (months,),
        )
        return cur.fetchall()


def processed_files_count(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) as total FROM processed_files")
        return cur.fetchone()[0]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--db-url", default=None)
    args = parser.parse_args()

    if not args.db_url:
        print(
            "Deprecated: This script requires a Postgres DB. Provide --db-url to run or use `scripts/load_dataset.py --dry-run` for CSV summaries."
        )
        exit(0)

    conn = get_conn(args.db_url)

    print("Top states by enrollment total:")
    for r in top_states(conn):
        print(f"  {r['state']}: {int(r['total']):,}")

    print("\nMonthly timeline (last 12 months):")
    for r in timeline(conn):
        print(f"  {r['month']}: {int(r['total']):,}")

    print("\nProcessed files count: ", processed_files_count(conn))

    conn.close()
