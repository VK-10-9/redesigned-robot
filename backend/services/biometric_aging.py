"""
Biometric aging model for IRF.
Adjusts verification thresholds based on age, occupational factors, and
natural biometric degradation over time.
"""

from typing import Dict, Tuple


def age_adjustment_factor(age: int) -> float:
    """Return a threshold adjustment factor based on age.

    Older citizens (65+) and very young (<18) get slightly relaxed
    thresholds to account for natural biometric variation.
    """
    if age < 0 or age > 150:
        return 1.0  # Invalid age; use standard threshold
    if 65 <= age <= 100:
        # Elderly: relax threshold by 10-15%
        return 0.9
    if age < 18:
        # Youth: relax threshold by 5%
        return 0.95
    return 1.0  # Standard threshold for adults 18-65


def occupation_adjustment_factor(occupation: str) -> float:
    """Adjust threshold for occupations with known biometric wear.

    Manual laborers, construction workers, etc. experience fingerprint
    degradation; slightly lower thresholds account for this.
    """
    occupation = (occupation or "").strip().lower()
    high_wear = [
        "construction",
        "manufacturing",
        "agriculture",
        "mining",
        "manual labor",
    ]
    if any(h in occupation for h in high_wear):
        return 0.92  # 8% threshold reduction for wear-prone jobs
    return 1.0


def enrollment_tenure_adjustment(years_since_enrollment: int) -> float:
    """Adjust threshold based on enrollment age.

    Citizens enrolled for many years have more historical verification;
    natural biometric drift is expected and tolerated.
    """
    if years_since_enrollment < 0:
        return 1.0
    if years_since_enrollment >= 10:
        # Long-term enrollees: 10% threshold relaxation
        return 0.90
    if years_since_enrollment >= 5:
        # 5% relaxation
        return 0.95
    return 1.0  # New enrollees: standard threshold


def adjusted_threshold(
    base_threshold: float, age: int, occupation: str, years_enrolled: int
) -> float:
    """Compute the adjusted verification threshold for an individual.

    Combines age, occupation, and tenure adjustments. Returns a final
    threshold that is typically 5-15% lower for vulnerable populations.
    """
    age_factor = age_adjustment_factor(age)
    occ_factor = occupation_adjustment_factor(occupation)
    tenure_factor = enrollment_tenure_adjustment(years_enrolled)

    # Multiplicative combination (conservative; all factors must be met)
    adjusted = base_threshold * age_factor * occ_factor * tenure_factor
    return round(max(0.0, min(1.0, adjusted)), 3)


def biometric_aging_assessment(
    record: Dict[str, str], base_threshold: float = 0.85
) -> Tuple[float, str]:
    """Assess biometric quality with aging adjustments.

    Returns (adjusted_threshold, reason_str).
    """
    try:
        age = int((record.get("age") or "0").strip())
    except (ValueError, TypeError):
        age = 0

    occupation = record.get("occupation") or ""

    try:
        enrollment_date = record.get("enrollment_date") or ""
        # Simple year extraction (format: YYYY-MM-DD or YYYY)
        year_enrolled = int(enrollment_date.split("-")[0])
        years_since = 2026 - year_enrolled
    except (ValueError, IndexError, TypeError):
        years_since = 0

    adjusted = adjusted_threshold(base_threshold, age, occupation, years_since)

    reasons = []
    if age >= 65:
        reasons.append("elderly_relaxation")
    if age < 18:
        reasons.append("youth_relaxation")
    if "construction" in occupation.lower() or "manual" in occupation.lower():
        reasons.append("wear_prone_occupation")
    if years_since >= 10:
        reasons.append("long_term_enrollee")

    reason_str = ", ".join(reasons) if reasons else "standard_threshold"
    return adjusted, reason_str
