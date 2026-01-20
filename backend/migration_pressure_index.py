"""
Migration Pressure Index (MPI) for PROF.
Calculates migration pressure for each district based on Aadhaar address updates.
Identifies stressed districts facing high population inflow/outflow.
"""

from collections import defaultdict
from typing import Dict, List


def calculate_mpi(records: List[Dict[str, str]]) -> Dict[str, float]:
    """Calculate Migration Pressure Index (MPI) by district.

    MPI = 0-1 scale indicating population pressure and migration stress.
    High MPI: incoming migrants, rapid changes, stressed infrastructure.
    Low MPI: stable or outflow, lower pressure.

    Returns dict mapping district -> MPI score.
    """
    district_stats = defaultdict(
        lambda: {"inflow": 0, "outflow": 0, "updates": 0, "velocity": 0}
    )

    for record in records:
        # Extract address info
        district = record.get("district", "").strip()

        if not district:
            continue

        # Categorize as inflow (new Aadhaar) or outflow (address change away)
        aadhaar_age = record.get("aadhaar_age", "new")
        prev_district = record.get("previous_district", district).strip()

        if aadhaar_age == "new":
            district_stats[district]["inflow"] += 1
        elif prev_district != district:
            # Person moved to this district
            district_stats[district]["inflow"] += 1
            # And away from previous
            if prev_district:
                district_stats[prev_district]["outflow"] += 1
        else:
            # Address update within same district
            district_stats[district]["updates"] += 1

    # Calculate MPI: normalize inflow, penalize velocity (rapid changes)
    mpi_scores = {}
    max_inflow = max((stats["inflow"] for stats in district_stats.values()), default=1)
    max_updates = max(
        (stats["updates"] for stats in district_stats.values()), default=1
    )

    for district, stats in district_stats.items():
        # Inflow component: normalized
        inflow_score = stats["inflow"] / max_inflow if max_inflow > 0 else 0

        # Velocity component: rapid updates suggest stress
        velocity_score = stats["updates"] / max_updates if max_updates > 0 else 0

        # Outflow penalty: reduce MPI if people are leaving
        outflow_penalty = min(stats["outflow"] / (max_inflow + 1), 0.3)

        # Combined MPI: 60% inflow, 30% velocity, 10% outflow penalty
        mpi = (inflow_score * 0.6 + velocity_score * 0.3) - outflow_penalty * 0.1
        mpi_scores[district] = max(0.0, min(mpi, 1.0))  # Clamp to 0-1

    return mpi_scores


def rank_districts_by_mpi(mpi_scores: Dict[str, float]) -> List[tuple]:
    """Rank districts by MPI (highest pressure first).

    Returns list of (district, mpi_score) tuples sorted by MPI descending.
    """
    return sorted(mpi_scores.items(), key=lambda x: x[1], reverse=True)


def classify_pressure(mpi_score: float) -> str:
    """Classify MPI score into pressure category.

    High pressure (>0.7): urgent resources needed
    Medium pressure (0.4-0.7): monitor and plan
    Low pressure (<0.4): stable, routine resources sufficient
    """
    if mpi_score > 0.7:
        return "high"
    elif mpi_score >= 0.4:
        return "medium"
    else:
        return "low"
