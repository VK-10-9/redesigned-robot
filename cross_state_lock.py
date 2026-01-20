"""
Cross-State Identity Lock for AMF.
Prevents duplicate state-level entitlements during migration.
"""

from enum import Enum
from typing import Dict, List


class EntitlementLockStatus(str, Enum):
    """Lock status for state entitlements."""

    UNLOCKED = "unlocked"
    LOCKED_FOR_MIGRATION = "locked_for_migration"
    GRACE_PERIOD = "grace_period"


def create_identity_lock(
    aadhaar: str,
    home_state: str,
    presence_state: str,
) -> Dict:
    """Create lock on home_state entitlements when migrating to presence_state."""
    if home_state == presence_state:
        return {
            "success": False,
            "message": "No lock needed; migration is within same state",
        }

    return {
        "success": True,
        "aadhaar": aadhaar,
        "locked_state": home_state,
        "active_state": presence_state,
        "lock_status": EntitlementLockStatus.LOCKED_FOR_MIGRATION.value,
        "message": f"Entitlements locked in {home_state}; active in {presence_state}",
    }


def release_identity_lock(
    aadhaar: str,
    locked_state: str,
) -> Dict:
    """Release lock when migration ends."""
    return {
        "success": True,
        "aadhaar": aadhaar,
        "unlocked_state": locked_state,
        "lock_status": EntitlementLockStatus.UNLOCKED.value,
        "message": f"Entitlements in {locked_state} restored",
    }


def get_lock_status(
    aadhaar: str,
    current_state: str,
    locked_states: List[str],
) -> Dict:
    """Get lock status for a citizen across states."""
    return {
        "aadhaar": aadhaar,
        "current_presence_state": current_state,
        "locked_states": locked_states,
        "locked_state_count": len(locked_states),
        "can_access_home": current_state not in locked_states,
        "summary": (
            f"Entitlements locked in {len(locked_states)} state(s)"
            if locked_states
            else "No locks; full access across states"
        ),
    }


def validate_entitlement_access(
    aadhaar: str,
    requesting_state: str,
    presence_state: str,
    locked_states: List[str],
) -> Dict:
    """Validate if Aadhaar can access services in a requesting state."""
    if requesting_state == presence_state:
        return {
            "allowed": True,
            "reason": "Active presence state",
            "service_level": "primary",
        }

    if requesting_state in locked_states:
        return {
            "allowed": False,
            "reason": "State locked due to active migration",
            "service_level": "none",
        }

    return {
        "allowed": True,
        "reason": "Home state; soft verification recommended",
        "service_level": "soft_verification",
    }
