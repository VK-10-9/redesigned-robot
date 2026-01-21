"""
Multi-factor identity verification for IRF.
Combines biometric, behavioral, and historical signals to make robust
identity verification decisions.
"""

from typing import Dict


def biometric_score(record: Dict[str, str]) -> float:
    """Compute biometric quality/success score (0..1).

    Based on fields like iris_quality, fingerprint_quality, face_match, etc.
    """
    scores = []
    for field in ["iris_quality", "fingerprint_quality", "face_match"]:
        val = (record.get(field) or "").strip().lower()
        if val in ("excellent", "1.0", "100", "verified"):
            scores.append(1.0)
        elif val in ("good", "0.8", "80"):
            scores.append(0.8)
        elif val in ("fair", "0.6", "60"):
            scores.append(0.6)
        elif val in ("poor", "failed", "0"):
            scores.append(0.0)
    return (sum(scores) / len(scores)) if scores else 0.5


def behavioral_score(record: Dict[str, str]) -> float:
    """Compute behavioral consistency score based on history and patterns.

    Fields: update_frequency, verification_history, enrollment_consistency.
    """
    scores = []
    # Regular updates suggest consistent citizen
    upd_freq = (record.get("update_frequency") or "").strip().lower()
    if upd_freq in ("monthly", "quarterly", "regular"):
        scores.append(0.9)
    elif upd_freq in ("annual", "occasional"):
        scores.append(0.7)
    else:
        scores.append(0.5)

    # Verification history
    ver_hist = (record.get("verification_history") or "").strip().lower()
    if ver_hist in ("always_passed", "consistent", "reliable"):
        scores.append(0.95)
    elif ver_hist in ("mostly_passed", "occasional_failures"):
        scores.append(0.75)
    else:
        scores.append(0.5)

    return (sum(scores) / len(scores)) if scores else 0.6


def historical_score(record: Dict[str, str]) -> float:
    """Compute historical verification consistency.

    Fields: verified_at_enrollment, past_transactions, data_stability.
    """
    scores = []
    verified = (record.get("verified_at_enrollment") or "").strip().lower()
    if verified in ("yes", "true", "1"):
        scores.append(1.0)
    else:
        scores.append(0.6)

    # Past successful transactions
    txn = (record.get("past_transactions") or "0").strip()
    try:
        n_txn = int(txn)
        if n_txn > 100:
            scores.append(0.95)
        elif n_txn > 10:
            scores.append(0.8)
        elif n_txn > 0:
            scores.append(0.6)
        else:
            scores.append(0.5)
    except (ValueError, TypeError):
        scores.append(0.5)

    return (sum(scores) / len(scores)) if scores else 0.6


def multi_factor_verification_score(record: Dict[str, str]) -> float:
    """Weighted combination of biometric, behavioral, and historical scores."""
    bio = biometric_score(record)
    bhv = behavioral_score(record)
    hist = historical_score(record)

    # Weights: biometric is primary, but behavioral/history provide context
    score = 0.5 * bio + 0.25 * bhv + 0.25 * hist
    return round(max(0.0, min(1.0, score)), 3)
