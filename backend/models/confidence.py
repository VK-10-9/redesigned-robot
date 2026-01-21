"""
Data confidence scoring utilities.
Provides a simple deterministic confidence score (0..1) for an input record
based on completeness and verification indicators.
"""

from typing import Dict

REQUIRED_FIELDS = ["name", "date", "state", "district"]


def completeness_score(row: Dict[str, str]) -> float:
    present = sum(1 for f in REQUIRED_FIELDS if (row.get(f) or "").strip())
    return present / len(REQUIRED_FIELDS)


def verification_score(row: Dict[str, str]) -> float:
    """Simple mapping: if a row has 'verified' or 'source' fields indicating
    a trusted verification, return higher score.
    """
    verified = (row.get("verified") or "").strip().lower()
    if verified in ("yes", "true", "1"):
        return 1.0
    source = (row.get("source") or "").strip().lower()
    if source in ("aadhaar_offline", "aadhaar_online", "rbdms"):
        return 0.9
    return 0.5


def score_record(row: Dict[str, str]) -> float:
    """Return a combined confidence score between 0 and 1."""
    c = completeness_score(row)
    v = verification_score(row)
    # Weigh completeness slightly higher
    return round(max(0.0, min(1.0, 0.6 * c + 0.4 * v)), 3)
