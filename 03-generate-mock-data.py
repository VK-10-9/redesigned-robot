import json
import random
import sys
from datetime import datetime, timedelta

# Configuration
NUM_RECORDS = 50000
STATES = [
    "AP",
    "AR",
    "AS",
    "BR",
    "CG",
    "GA",
    "GJ",
    "HR",
    "HP",
    "JH",
    "KA",
    "KL",
    "MP",
    "MH",
    "MN",
    "ML",
    "MZ",
    "NL",
    "OD",
    "PB",
    "RJ",
    "SK",
    "TN",
    "TG",
    "TR",
    "UP",
    "UT",
    "WB",
]
DISTRICTS = {
    "KA": ["Bangalore Urban", "Bangalore Rural", "Belagavi"],
    "MH": ["Mumbai Suburban", "Mumbai City", "Pune"],
    "TN": ["Chennai", "Coimbatore"],
    "AP": ["Hyderabad", "Visakhapatnam"],
}
AGE_GROUPS = ["0-5", "5-18", "18-35", "35-60", "60+"]
GENDERS = ["M", "F", "O"]
URBAN_RURAL = ["Urban", "Rural"]
STATUSES = ["Active", "Inactive", "Suspended"]


def generate_aadhaar_id():
    """Generate a fake 12-digit Aadhaar ID"""
    return "".join([str(random.randint(0, 9)) for _ in range(12)])


def random_date(start_year=2010, end_year=2024):
    """Generate a random enrollment date"""
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    return start + timedelta(days=random.randint(0, (end - start).days))


def generate_records(num_records):
    """Generate mock Aadhaar enrollment records"""
    records = []

    for i in range(num_records):
        state = random.choice(STATES)

        # Get districts for this state (with fallback)
        districts_for_state = DISTRICTS.get(
            state, [f"{state}-District-1", f"{state}-District-2"]
        )
        district = random.choice(districts_for_state)

        record = {
            "aadhaar_id": generate_aadhaar_id(),
            "state": state,
            "district": district,
            "enrollment_date": random_date().strftime("%Y-%m-%d"),
            "age_group": random.choice(AGE_GROUPS),
            "gender": random.choice(GENDERS),
            "urban_rural": random.choice(URBAN_RURAL),
            "enrollment_status": random.choice(STATUSES),
        }
        records.append(record)

        # Progress indicator
        if (i + 1) % 5000 == 0:
            print(f"Generated {i + 1}/{num_records} records", file=sys.stderr)

    return records


if __name__ == "__main__":
    print(f"Generating {NUM_RECORDS} mock Aadhaar enrollment records...")
    records = generate_records(NUM_RECORDS)

    # Output as JSONL (JSON Lines) format for easy bulk loading
    for record in records:
        print(json.dumps(record))

    print(f"\nGenerated {NUM_RECORDS} records successfully!", file=sys.stderr)
