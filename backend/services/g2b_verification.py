"""
G2B (Government-to-Business) API Handshake for AMF.
Enables verified employers to vouch for temporary residence.
"""

from datetime import datetime
from typing import Dict


class EmployerVerification:
    """Digital vouching by employer for worker residence."""

    def __init__(
        self,
        verification_id: str,
        aadhaar: str,
        employer_pan_gst: str,
        employer_name: str,
        employment_start_date: str,
        employment_end_date: str,
        workplace_address: str,
        workplace_lat: float,
        workplace_lon: float,
    ):
        self.verification_id = verification_id
        self.aadhaar = aadhaar
        self.employer_pan_gst = employer_pan_gst
        self.employer_name = employer_name
        self.employment_start = employment_start_date
        self.employment_end = employment_end_date
        self.workplace_address = workplace_address
        self.workplace_lat = workplace_lat
        self.workplace_lon = workplace_lon
        self.verified_at = datetime.now().isoformat()

    def to_dict(self) -> Dict:
        return {
            "verification_id": self.verification_id,
            "aadhaar": self.aadhaar,
            "employer_pan_gst": self.employer_pan_gst,
            "employer_name": self.employer_name,
            "employment_start": self.employment_start,
            "employment_end": self.employment_end,
            "workplace_address": self.workplace_address,
            "workplace_lat": self.workplace_lat,
            "workplace_lon": self.workplace_lon,
            "verified_at": self.verified_at,
        }


def validate_employer_credentials(pan_gst: str, employer_name: str) -> bool:
    """Validate employer PAN/GST against government database (mock)."""
    # In production: call GST/PAN API
    if not pan_gst or len(pan_gst) < 5:
        return False
    if not employer_name or len(employer_name) < 3:
        return False
    # Mock: simple check
    return True


def create_employer_verification(
    aadhaar: str,
    employer_pan_gst: str,
    employer_name: str,
    employment_start_date: str,
    employment_end_date: str,
    workplace_lat: float,
    workplace_lon: float,
    workplace_address: str,
) -> Dict:
    """Create a G2B verification record."""
    # Validate employer
    if not validate_employer_credentials(employer_pan_gst, employer_name):
        return {"success": False, "error": "Invalid employer credentials"}

    # Check employment dates
    try:
        start = datetime.fromisoformat(employment_start_date)
        end = datetime.fromisoformat(employment_end_date)
        if end <= start:
            return {"success": False, "error": "End date must be after start date"}
    except ValueError:
        return {"success": False, "error": "Invalid date format"}

    # Create verification
    verification_id = f"g2b_{aadhaar}_{int(datetime.now().timestamp())}"
    verification = EmployerVerification(
        verification_id=verification_id,
        aadhaar=aadhaar,
        employer_pan_gst=employer_pan_gst,
        employer_name=employer_name,
        employment_start_date=employment_start_date,
        employment_end_date=employment_end_date,
        workplace_address=workplace_address,
        workplace_lat=workplace_lat,
        workplace_lon=workplace_lon,
    )

    return {
        "success": True,
        "verification": verification.to_dict(),
        "message": "Employer verification successful",
    }
