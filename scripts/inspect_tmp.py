# ruff: noqa: E402
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from scripts.load_dataset import preprocess_files_to_temp

FIXTURE_DIR = Path(__file__).parent.parent / "tests" / "fixtures" / "dataset" / "clean"
ENROLL_FILES = [
    str(FIXTURE_DIR / "api_data_aadhar_enrolment" / f)
    for f in ["enroll1.csv", "enroll2.csv", "dups.csv"]
]

if __name__ == "__main__":
    tmp, rows = preprocess_files_to_temp(
        ENROLL_FILES, kind="enrollment", normalize=True, dedup_mode="hash"
    )
    print("tmp", tmp, "rows", rows)
    import csv
    import json

    with open(tmp, "r", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            print(json.dumps(r))
