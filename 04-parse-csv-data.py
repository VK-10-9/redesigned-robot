import csv
import json
from collections import defaultdict
from datetime import datetime


# Parse the CSV data file
def parse_aadhaar_csv(csv_content):
    """Parse CSV data and aggregate by state and district"""
    lines = csv_content.strip().split("\n")
    reader = csv.DictReader(lines)

    # Aggregation dictionaries
    state_district_data = defaultdict(
        lambda: defaultdict(lambda: {"age_5_17": 0, "age_17_plus": 0, "dates": set()})
    )
    state_totals = defaultdict(lambda: {"age_5_17": 0, "age_17_plus": 0, "records": 0})

    for row in reader:
        if not row.get("state") or not row.get("district"):
            continue

        try:
            state = row["state"].strip()
            district = row["district"].strip()
            age_5_17 = int(row.get("bio_age_5_17", 0))
            age_17_plus = int(row.get("bio_age_17_", 0))
            date = row.get("date", "").strip()

            # Aggregate by state and district
            state_district_data[state][district]["age_5_17"] += age_5_17
            state_district_data[state][district]["age_17_plus"] += age_17_plus
            if date:
                state_district_data[state][district]["dates"].add(date)

            # Aggregate state totals
            state_totals[state]["age_5_17"] += age_5_17
            state_totals[state]["age_17_plus"] += age_17_plus
            state_totals[state]["records"] += 1
        except (ValueError, KeyError) as e:
            print(f"Error parsing row: {row}, error: {e}")
            continue

    return state_district_data, state_totals


def generate_mock_data_from_csv(csv_content):
    """Generate mock data JSON structure from parsed CSV"""
    state_district_data, state_totals = parse_aadhaar_csv(csv_content)

    # Generate national overview
    total_enrollments = sum(
        totals["age_5_17"] + totals["age_17_plus"] for totals in state_totals.values()
    )
    total_states = len(state_totals)

    national_overview = {
        "total_enrollments": total_enrollments,
        "active_users": int(total_enrollments * 0.85),  # Assume 85% active
        "states_covered": total_states,
        "anomalies_detected": max(
            0, int(total_enrollments * 0.001)
        ),  # 0.1% anomaly rate
        "timestamp": datetime.now().isoformat(),
    }

    # Generate state distribution
    states_list = []
    for state in sorted(state_totals.keys()):
        total = state_totals[state]["age_5_17"] + state_totals[state]["age_17_plus"]
        states_list.append(
            {
                "state": state,
                "total_enrollments": total,
                "active_users": int(total * 0.85),
                "urban_count": int(total * 0.6),  # Estimate 60% urban
                "rural_count": int(total * 0.4),  # Estimate 40% rural
            }
        )

    # Sort by total enrollments and keep top 6
    states_list = sorted(
        states_list, key=lambda x: x["total_enrollments"], reverse=True
    )[:6]

    # Generate demographics
    total_age_5_17 = sum(totals["age_5_17"] for totals in state_totals.values())
    total_age_17_plus = sum(totals["age_17_plus"] for totals in state_totals.values())

    demographics = {
        "by_age_group": [
            {
                "age_group": "5-17",
                "count": total_age_5_17,
                "male": int(total_age_5_17 * 0.51),
                "female": int(total_age_5_17 * 0.49),
            },
            {
                "age_group": "17+",
                "count": total_age_17_plus,
                "male": int(total_age_17_plus * 0.50),
                "female": int(total_age_17_plus * 0.50),
            },
        ],
        "by_location": [
            {"urban_rural": "Urban", "count": int(total_enrollments * 0.6)},
            {"urban_rural": "Rural", "count": int(total_enrollments * 0.4)},
        ],
    }

    return {
        "national_overview": national_overview,
        "state_distribution": {"states": states_list, "total_states": total_states},
        "demographics": demographics,
    }


if __name__ == "__main__":
    # Read CSV from stdin
    import sys

    csv_content = sys.stdin.read()

    result = generate_mock_data_from_csv(csv_content)
    print(json.dumps(result, indent=2))
