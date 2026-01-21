"""
Dual-Address Model for AMF.
Maintains parallel Home (Permanent) and Presence (Temporary) addresses.
"""

from typing import Dict, Optional


class DualAddressRecord:
    """Maintains dual addresses for a single Aadhaar."""

    def __init__(
        self,
        aadhaar: str,
        home_address: str,
        home_lat: float,
        home_lon: float,
        home_state: str,
        home_district: str,
    ):
        self.aadhaar = aadhaar
        self.home_address = home_address
        self.home_lat = home_lat
        self.home_lon = home_lon
        self.home_state = home_state
        self.home_district = home_district

        # Presence (temporary) address - initially None
        self.presence_address: Optional[str] = None
        self.presence_lat: Optional[float] = None
        self.presence_lon: Optional[float] = None
        self.presence_state: Optional[str] = None
        self.presence_district: Optional[str] = None
        self.presence_lease_id: Optional[str] = None

    def set_presence_address(
        self,
        presence_address: str,
        presence_lat: float,
        presence_lon: float,
        presence_state: str,
        presence_district: str,
        lease_id: str,
    ) -> Dict:
        """Set temporary presence address (does not overwrite home)."""
        self.presence_address = presence_address
        self.presence_lat = presence_lat
        self.presence_lon = presence_lon
        self.presence_state = presence_state
        self.presence_district = presence_district
        self.presence_lease_id = lease_id

        return {
            "success": True,
            "message": "Presence address set; home address preserved",
            "home_address": self.home_address,
            "presence_address": self.presence_address,
        }

    def clear_presence_address(self) -> Dict:
        """Clear temporary presence address."""
        self.presence_address = None
        self.presence_lat = None
        self.presence_lon = None
        self.presence_state = None
        self.presence_district = None
        self.presence_lease_id = None

        return {
            "success": True,
            "message": "Presence address cleared",
            "home_address": self.home_address,
        }

    def get_active_address(self) -> Dict:
        """Return currently active address (presence if available, else home)."""
        if self.presence_address:
            return {
                "address": self.presence_address,
                "state": self.presence_state,
                "district": self.presence_district,
                "latitude": self.presence_lat,
                "longitude": self.presence_lon,
                "type": "presence",
            }
        else:
            return {
                "address": self.home_address,
                "state": self.home_state,
                "district": self.home_district,
                "latitude": self.home_lat,
                "longitude": self.home_lon,
                "type": "home",
            }

    def to_dict(self) -> Dict:
        return {
            "aadhaar": self.aadhaar,
            "home_address": {
                "address": self.home_address,
                "state": self.home_state,
                "district": self.home_district,
                "latitude": self.home_lat,
                "longitude": self.home_lon,
            },
            "presence_address": (
                {
                    "address": self.presence_address,
                    "state": self.presence_state,
                    "district": self.presence_district,
                    "latitude": self.presence_lat,
                    "longitude": self.presence_lon,
                    "lease_id": self.presence_lease_id,
                }
                if self.presence_address
                else None
            ),
            "active_address_type": ("presence" if self.presence_address else "home"),
        }
