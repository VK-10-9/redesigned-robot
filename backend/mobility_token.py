"""
Inter-State Mobility Token for AMF.
Short-lived digital proof of temporary residence for essential services.
"""

from datetime import datetime, timedelta
from enum import Enum
from typing import Dict


class TokenStatus(str, Enum):
    """Status of a mobility token."""

    ACTIVE = "active"
    EXPIRED = "expired"
    REVOKED = "revoked"


class MobilityToken:
    """Short-lived token linked to Presence Address."""

    def __init__(
        self,
        token_id: str,
        aadhaar: str,
        presence_address: str,
        presence_state: str,
        presence_lat: float,
        presence_lon: float,
        validity_days: int = 90,
    ):
        self.token_id = token_id
        self.aadhaar = aadhaar
        self.presence_address = presence_address
        self.presence_state = presence_state
        self.presence_lat = presence_lat
        self.presence_lon = presence_lon
        self.issued_at = datetime.now()
        self.expiry_date = self.issued_at + timedelta(days=validity_days)
        self.validity_days = validity_days

    def get_status(self) -> TokenStatus:
        """Get current token status."""
        now = datetime.now()
        if now > self.expiry_date:
            return TokenStatus.EXPIRED
        return TokenStatus.ACTIVE

    def get_qr_code(self) -> str:
        """Generate QR-code representation (mock)."""
        # In production: generate actual QR with encoded data
        return f"QR:{self.token_id}::{self.aadhaar}"

    def to_dict(self) -> Dict:
        return {
            "token_id": self.token_id,
            "aadhaar": self.aadhaar,
            "presence_address": self.presence_address,
            "presence_state": self.presence_state,
            "presence_lat": self.presence_lat,
            "presence_lon": self.presence_lon,
            "issued_at": self.issued_at.isoformat(),
            "expiry_date": self.expiry_date.isoformat(),
            "validity_days": self.validity_days,
            "status": self.get_status().value,
            "qr_code": self.get_qr_code(),
        }


def create_mobility_token(
    aadhaar: str,
    presence_address: str,
    presence_state: str,
    presence_lat: float,
    presence_lon: float,
    validity_days: int = 90,
) -> Dict:
    """Create a new inter-state mobility token."""
    if validity_days < 7 or validity_days > 180:
        return {
            "success": False,
            "error": "Validity must be between 7 and 180 days",
        }

    token_id = f"mob_token_{aadhaar}_{int(datetime.now().timestamp())}"
    token = MobilityToken(
        token_id=token_id,
        aadhaar=aadhaar,
        presence_address=presence_address,
        presence_state=presence_state,
        presence_lat=presence_lat,
        presence_lon=presence_lon,
        validity_days=validity_days,
    )

    return {
        "success": True,
        "token": token.to_dict(),
        "message": "Mobility token created",
    }


def validate_token_for_service(
    token_id: str,
    service_type: str,  # "healthcare", "pds", "transport", "basic_services"
    requesting_state: str,
) -> Dict:
    """Validate if token can be used for a specific service."""
    # Mock: check token validity
    valid_services = ["healthcare", "pds", "transport", "basic_services"]

    if service_type not in valid_services:
        return {
            "valid": False,
            "reason": f"Unknown service type: {service_type}",
        }

    return {
        "valid": True,
        "token_id": token_id,
        "service_type": service_type,
        "requesting_state": requesting_state,
        "message": "Token valid for service",
    }


def revoke_token(token_id: str) -> Dict:
    """Revoke a mobility token."""
    return {
        "success": True,
        "token_id": token_id,
        "status": TokenStatus.REVOKED.value,
        "message": "Token revoked",
    }
