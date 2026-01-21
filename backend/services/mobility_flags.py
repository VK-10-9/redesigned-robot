"""
Mobility Status Tiers for AMF.
Represents citizen mobility states: Permanent, Active Migrant, Transitioning.
"""

from enum import Enum
from typing import Dict


class MobilityTier(str, Enum):
    """Mobility status tiers for Aadhaar records."""

    TIER_1_PERMANENT = "tier_1_permanent"
    TIER_2_ACTIVE_MIGRANT = "tier_2_active_migrant"
    TIER_3_TRANSITIONING = "tier_3_transitioning"


def get_mobility_tier_details(tier: MobilityTier) -> Dict:
    """Return details for a mobility tier."""
    details = {
        MobilityTier.TIER_1_PERMANENT: {
            "name": "Permanent Resident",
            "description": "No active migration",
            "requires_verification": False,
            "service_access": "home_location_only",
        },
        MobilityTier.TIER_2_ACTIVE_MIGRANT: {
            "name": "Active Migrant",
            "description": "Verified temporary address linked to employment/community",
            "requires_verification": True,
            "service_access": "presence_location_primary",
        },
        MobilityTier.TIER_3_TRANSITIONING: {
            "name": "Transitioning Migrant",
            "description": "Previous temp address expired, re-verification pending",
            "requires_verification": True,
            "service_access": "home_location_with_soft_verification",
        },
    }
    return details.get(tier, {})


def transition_tier(
    current_tier: MobilityTier,
    trigger: str,  # "address_expiry", "new_verification", "manual_reset"
) -> MobilityTier:
    """Transition between mobility tiers based on trigger event."""
    transitions = {
        MobilityTier.TIER_1_PERMANENT: {
            "new_verification": MobilityTier.TIER_2_ACTIVE_MIGRANT,
        },
        MobilityTier.TIER_2_ACTIVE_MIGRANT: {
            "address_expiry": MobilityTier.TIER_3_TRANSITIONING,
            "manual_reset": MobilityTier.TIER_1_PERMANENT,
        },
        MobilityTier.TIER_3_TRANSITIONING: {
            "new_verification": MobilityTier.TIER_2_ACTIVE_MIGRANT,
            "manual_reset": MobilityTier.TIER_1_PERMANENT,
        },
    }

    next_tier = transitions.get(current_tier, {}).get(trigger)
    return next_tier if next_tier else current_tier
