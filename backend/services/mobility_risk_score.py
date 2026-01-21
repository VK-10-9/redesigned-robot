"""
Mobility Risk Score for AMF.
Calculates dynamic risk based on movement patterns and verification quality.
"""

from enum import Enum
from typing import Dict


class MobilityRiskLevel(str, Enum):
    """Mobility risk classification."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    VERY_HIGH = "very_high"


def calculate_mobility_risk_score(
    frequency_of_changes: int,
    distance_km: float,
    verification_quality: float,
    days_since_last_change: int = 0,
) -> Dict:
    """Calculate mobility risk score (0-1 scale).

    Args:
        frequency_of_changes: Number of address changes in past year
        distance_km: Average distance of migrations
        verification_quality: Quality of verification sources (0-1)
        days_since_last_change: Days since last address change

    Returns:
        Risk score dict with classification
    """
    # Component 1: Frequency (0-0.4)
    # More than 4 changes/year = high frequency
    freq_score = min(0.4, (frequency_of_changes / 4.0) * 0.4)

    # Component 2: Distance (0-0.3)
    # More than 500 km = very high distance
    dist_score = min(0.3, (distance_km / 500.0) * 0.3)

    # Component 3: Verification Quality (negative; good quality lowers risk)
    # Lower verification quality = higher risk
    quality_penalty = (1 - verification_quality) * 0.3

    # Component 4: Recency (negative; recent changes increase risk slightly)
    # Changes within 30 days = recent
    recency_boost = 0.0
    if days_since_last_change < 30:
        recency_boost = 0.1 * (30 - days_since_last_change) / 30.0

    # Total risk score
    risk_score = freq_score + dist_score + quality_penalty + recency_boost
    risk_score = min(1.0, max(0.0, risk_score))

    # Classify
    if risk_score < 0.3:
        level = MobilityRiskLevel.LOW
    elif risk_score < 0.6:
        level = MobilityRiskLevel.MEDIUM
    elif risk_score < 0.8:
        level = MobilityRiskLevel.HIGH
    else:
        level = MobilityRiskLevel.VERY_HIGH

    # Recommended action
    actions = {
        MobilityRiskLevel.LOW: "standard_processing",
        MobilityRiskLevel.MEDIUM: "standard_processing",
        MobilityRiskLevel.HIGH: "soft_verification_required",
        MobilityRiskLevel.VERY_HIGH: "enhanced_verification_required",
    }

    return {
        "risk_score": round(risk_score, 2),
        "risk_level": level.value,
        "frequency_score": round(freq_score, 2),
        "distance_score": round(dist_score, 2),
        "quality_penalty": round(quality_penalty, 2),
        "recency_boost": round(recency_boost, 2),
        "recommended_action": actions[level],
    }


def get_verification_requirement(risk_level: str) -> Dict:
    """Get verification requirements based on risk level."""
    requirements = {
        MobilityRiskLevel.LOW.value: {
            "required": False,
            "type": None,
            "priority": "none",
        },
        MobilityRiskLevel.MEDIUM.value: {
            "required": False,
            "type": None,
            "priority": "low",
        },
        MobilityRiskLevel.HIGH.value: {
            "required": True,
            "type": "soft_verification",
            "priority": "high",
            "details": "Additional document/biometric may be required",
        },
        MobilityRiskLevel.VERY_HIGH.value: {
            "required": True,
            "type": "enhanced_verification",
            "priority": "critical",
            "details": "In-person verification or video KYC required",
        },
    }

    return requirements.get(
        risk_level,
        {
            "required": False,
            "type": None,
            "priority": "unknown",
        },
    )
