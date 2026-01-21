"""
Near-duplicate detection utilities for ADIF.
Uses RapidFuzz for string similarity and computes a composite similarity
score between two records.
"""

from typing import Dict, List, Tuple

from rapidfuzz import fuzz


def _normalize_str(s: str) -> str:
    if not s:
        return ""
    return " ".join(s.strip().lower().split())


def similarity_score(a: Dict[str, str], b: Dict[str, str]) -> float:
    """Return a similarity score between 0 and 1 for two records.

    The score is a weighted combination of name, dob, state/district, and
    pincode similarities. Exact Aadhaar match short-circuits to 1.0.
    """
    # If aadhaar present and matches exactly, treat as duplicate
    aid_a = (a.get("aadhaar") or "").strip()
    aid_b = (b.get("aadhaar") or "").strip()
    if aid_a and aid_b and aid_a == aid_b:
        return 1.0

    name_a = _normalize_str(a.get("name") or a.get("full_name") or "")
    name_b = _normalize_str(b.get("name") or b.get("full_name") or "")
    name_score = fuzz.token_sort_ratio(name_a, name_b) / 100.0

    dob_a = a.get("date_of_birth") or a.get("dob") or a.get("date") or ""
    dob_b = b.get("date_of_birth") or b.get("dob") or b.get("date") or ""
    dob_score = 1.0 if dob_a and dob_b and dob_a == dob_b else 0.0

    state_score = (
        fuzz.token_sort_ratio(
            _normalize_str(a.get("state") or ""), _normalize_str(b.get("state") or "")
        )
        / 100.0
    )
    district_score = (
        fuzz.token_sort_ratio(
            _normalize_str(a.get("district") or ""),
            _normalize_str(b.get("district") or ""),
        )
        / 100.0
    )

    pincode_a = (a.get("pincode") or "").strip()
    pincode_b = (b.get("pincode") or "").strip()
    pincode_score = 1.0 if pincode_a and pincode_b and pincode_a == pincode_b else 0.0

    # Weighted sum (tuned for Aadhaar-like enrollees)
    weights = {
        "name": 0.5,
        "dob": 0.2,
        "state": 0.08,
        "district": 0.12,
        "pincode": 0.1,
    }

    score = (
        name_score * weights["name"]
        + dob_score * weights["dob"]
        + state_score * weights["state"]
        + district_score * weights["district"]
        + pincode_score * weights["pincode"]
    )

    # Clip to [0,1]
    return max(0.0, min(1.0, score))


def detect_duplicates_in_rows(
    rows: List[Dict[str, str]], threshold: float = 0.85
) -> List[Tuple[int, int, float]]:
    """Brute-force O(n^2) detection for rows; returns list of (i, j, score)

    For MVP this is acceptable; callers should limit the number of rows to scan.
    """
    results = []
    n = len(rows)
    for i in range(n):
        for j in range(i + 1, n):
            s = similarity_score(rows[i], rows[j])
            if s >= threshold:
                results.append((i, j, s))
    return results
