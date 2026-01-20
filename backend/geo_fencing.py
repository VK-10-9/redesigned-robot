"""
Virtual Geo-Fencing Validation for AMF.
Validates temporary address proximity to workplace using GPS.
"""

import math
from typing import Dict


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates (in km)."""
    r = 6371  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.asin(math.sqrt(a))
    return r * c


def validate_geo_fence(
    workplace_lat: float,
    workplace_lon: float,
    temp_address_lat: float,
    temp_address_lon: float,
    max_radius_km: float = 15.0,
) -> Dict:
    """Validate that temporary address is within acceptable radius of workplace.

    Args:
        workplace_lat, workplace_lon: Employer location
        temp_address_lat, temp_address_lon: Claimed temporary residence
        max_radius_km: Maximum acceptable distance (default 15 km)

    Returns:
        Dict with validity and distance info
    """
    distance = haversine_distance(
        workplace_lat, workplace_lon, temp_address_lat, temp_address_lon
    )

    is_valid = distance <= max_radius_km

    return {
        "is_valid": is_valid,
        "distance_km": round(distance, 2),
        "max_radius_km": max_radius_km,
        "status": "approved" if is_valid else "rejected",
        "reason": (
            f"Address within {max_radius_km} km radius"
            if is_valid
            else f"Address {distance:.2f} km away (exceeds {max_radius_km} km limit)"
        ),
    }


def validate_geo_fence_strict(
    workplace_lat: float,
    workplace_lon: float,
    temp_address_lat: float,
    temp_address_lon: float,
) -> Dict:
    """Strict geo-fence validation (5 km radius)."""
    return validate_geo_fence(
        workplace_lat,
        workplace_lon,
        temp_address_lat,
        temp_address_lon,
        max_radius_km=5.0,
    )


def validate_geo_fence_lenient(
    workplace_lat: float,
    workplace_lon: float,
    temp_address_lat: float,
    temp_address_lon: float,
) -> Dict:
    """Lenient geo-fence validation (25 km radius)."""
    return validate_geo_fence(
        workplace_lat,
        workplace_lon,
        temp_address_lat,
        temp_address_lon,
        max_radius_km=25.0,
    )
