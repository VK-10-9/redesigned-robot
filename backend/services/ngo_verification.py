"""
NGO/Community Verification Layer for AMF.
Enables registered NGOs, unions, SHGs to vouch for informal workers.
"""

from datetime import datetime
from enum import Enum
from typing import Dict


class VerifierType(str, Enum):
    """Types of community verifiers."""

    NGO = "ngo"
    UNION = "union"
    SHG = "self_help_group"
    COMMUNITY_GROUP = "community_group"


class CommunityVerifier:
    """Registered community verifier (NGO, Union, SHG, etc.)."""

    def __init__(
        self,
        verifier_id: str,
        verifier_name: str,
        verifier_type: VerifierType,
        registration_number: str,
        state: str,
        district: str,
        reputation_score: float = 0.8,
    ):
        self.verifier_id = verifier_id
        self.verifier_name = verifier_name
        self.verifier_type = verifier_type
        self.registration_number = registration_number
        self.state = state
        self.district = district
        self.reputation_score = min(1.0, max(0.0, reputation_score))
        self.volume_verified = 0
        self.registered_at = datetime.now().isoformat()

    def to_dict(self) -> Dict:
        return {
            "verifier_id": self.verifier_id,
            "verifier_name": self.verifier_name,
            "verifier_type": self.verifier_type.value,
            "registration_number": self.registration_number,
            "state": self.state,
            "district": self.district,
            "reputation_score": self.reputation_score,
            "volume_verified": self.volume_verified,
            "registered_at": self.registered_at,
        }


def validate_community_verifier(
    verifier_type: VerifierType,
    reputation_score: float,
) -> bool:
    """Validate if verifier meets minimum standards."""
    # Minimum reputation score: 0.5
    if reputation_score < 0.5:
        return False

    # All registered verifier types are allowed
    return True


def create_community_verification(
    aadhaar: str,
    verifier_id: str,
    verifier_name: str,
    verifier_type: str,
    temp_address: str,
    temp_state: str,
    temp_district: str,
    verification_notes: str = "",
) -> Dict:
    """Create a community-based verification for residence."""
    try:
        vtype = VerifierType(verifier_type)
    except ValueError:
        return {"success": False, "error": "Invalid verifier type"}

    # Validate minimum requirements
    if not verifier_name or len(verifier_name) < 3:
        return {
            "success": False,
            "error": "Invalid verifier name",
        }

    verification_id = f"comm_ver_{aadhaar}_{int(datetime.now().timestamp())}"

    return {
        "success": True,
        "verification_id": verification_id,
        "aadhaar": aadhaar,
        "verifier_id": verifier_id,
        "verifier_name": verifier_name,
        "verifier_type": vtype.value,
        "temp_address": temp_address,
        "temp_state": temp_state,
        "temp_district": temp_district,
        "verification_notes": verification_notes,
        "verified_at": datetime.now().isoformat(),
        "message": "Community verification created",
    }


def get_verifier_capacity(
    verifier: CommunityVerifier,
    max_monthly_verifications: int = 50,
) -> Dict:
    """Check if verifier has capacity for more verifications."""
    # Mock: check if under monthly limit
    can_verify = (
        verifier.volume_verified < max_monthly_verifications
        and verifier.reputation_score >= 0.5
    )

    return {
        "verifier_id": verifier.verifier_id,
        "can_verify": can_verify,
        "volume_verified": verifier.volume_verified,
        "capacity": max_monthly_verifications,
        "reputation_score": verifier.reputation_score,
        "slots_remaining": max(0, max_monthly_verifications - verifier.volume_verified),
    }
