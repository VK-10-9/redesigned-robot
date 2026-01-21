"""
Time-Bound Address Leasing for AMF.
Manages temporary address validity with auto-expiry.
"""

from datetime import datetime, timedelta
from enum import Enum
from typing import Dict


class AddressLeaseStatus(str, Enum):
    """Status of a leased temporary address."""

    ACTIVE = "active"
    EXPIRED = "expired"
    RENEWAL_PENDING = "renewal_pending"
    REVOKED = "revoked"


class AddressLease:
    """Represents a time-bound temporary address lease."""

    def __init__(
        self,
        lease_id: str,
        aadhaar: str,
        temp_address: str,
        temp_lat: float,
        temp_lon: float,
        start_date: str,
        validity_days: int = 180,
    ):
        self.lease_id = lease_id
        self.aadhaar = aadhaar
        self.temp_address = temp_address
        self.temp_lat = temp_lat
        self.temp_lon = temp_lon
        self.start_date = start_date
        self.validity_days = validity_days

        # Calculate end date
        start_dt = datetime.fromisoformat(start_date)
        self.end_date = (start_dt + timedelta(days=validity_days)).isoformat()
        self.created_at = datetime.now().isoformat()

    def get_status(self) -> AddressLeaseStatus:
        """Get current status of lease."""
        now = datetime.now()
        end_dt = datetime.fromisoformat(self.end_date)

        if end_dt < now:
            return AddressLeaseStatus.EXPIRED
        elif end_dt - now <= timedelta(days=7):
            return AddressLeaseStatus.RENEWAL_PENDING
        else:
            return AddressLeaseStatus.ACTIVE

    def days_remaining(self) -> int:
        """Get days remaining until expiry."""
        now = datetime.now()
        end_dt = datetime.fromisoformat(self.end_date)
        delta = end_dt - now
        return max(0, delta.days)

    def to_dict(self) -> Dict:
        return {
            "lease_id": self.lease_id,
            "aadhaar": self.aadhaar,
            "temp_address": self.temp_address,
            "temp_lat": self.temp_lat,
            "temp_lon": self.temp_lon,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "validity_days": self.validity_days,
            "status": self.get_status().value,
            "days_remaining": self.days_remaining(),
            "created_at": self.created_at,
        }


def create_address_lease(
    aadhaar: str,
    temp_address: str,
    temp_lat: float,
    temp_lon: float,
    validity_days: int = 180,
) -> Dict:
    """Create a new temporary address lease."""
    if validity_days < 30 or validity_days > 365:
        return {
            "success": False,
            "error": "Validity must be between 30 and 365 days",
        }

    lease_id = f"lease_{aadhaar}_{int(datetime.now().timestamp())}"
    lease = AddressLease(
        lease_id=lease_id,
        aadhaar=aadhaar,
        temp_address=temp_address,
        temp_lat=temp_lat,
        temp_lon=temp_lon,
        start_date=datetime.now().isoformat(),
        validity_days=validity_days,
    )

    return {
        "success": True,
        "lease": lease.to_dict(),
        "message": "Address lease created",
    }


def renew_address_lease(lease_id: str, additional_days: int = 180) -> Dict:
    """Renew an existing address lease."""
    # In production: lookup lease from database
    # For MVP: return mock renewal
    return {
        "success": True,
        "lease_id": lease_id,
        "renewed_until": (datetime.now() + timedelta(days=additional_days)).isoformat(),
        "message": "Lease renewed successfully",
    }
