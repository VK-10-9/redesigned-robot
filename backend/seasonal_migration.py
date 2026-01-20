"""
Seasonal Migration Mode for AMF.
Special handling for predictable migration patterns (agriculture, construction, etc).
"""

from datetime import datetime
from enum import Enum
from typing import Dict


class SeasonType(str, Enum):
    """Types of seasonal migration."""

    AGRICULTURE = "agriculture"
    CONSTRUCTION = "construction"
    FESTIVAL = "festival"
    OTHER = "other"


class SeasonalMigrationBatch:
    """Bulk seasonal migration record for group verification."""

    def __init__(
        self,
        batch_id: str,
        season_type: SeasonType,
        source_state: str,
        destination_state: str,
        destination_district: str,
        start_date: str,
        end_date: str,
        verifier_id: str,
        expected_workers: int,
    ):
        self.batch_id = batch_id
        self.season_type = season_type
        self.source_state = source_state
        self.destination_state = destination_state
        self.destination_district = destination_district
        self.start_date = start_date
        self.end_date = end_date
        self.verifier_id = verifier_id
        self.expected_workers = expected_workers
        self.verified_workers = 0
        self.created_at = datetime.now().isoformat()

    def to_dict(self) -> Dict:
        return {
            "batch_id": self.batch_id,
            "season_type": self.season_type.value,
            "source_state": self.source_state,
            "destination_state": self.destination_state,
            "destination_district": self.destination_district,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "verifier_id": self.verifier_id,
            "expected_workers": self.expected_workers,
            "verified_workers": self.verified_workers,
            "verification_rate": round(
                (self.verified_workers / max(self.expected_workers, 1)) * 100,
                2,
            ),
            "created_at": self.created_at,
        }


def create_seasonal_batch(
    season_type: str,
    source_state: str,
    destination_state: str,
    destination_district: str,
    start_date: str,
    end_date: str,
    verifier_id: str,
    expected_workers: int,
) -> Dict:
    """Create a seasonal migration batch for bulk verification."""
    try:
        stype = SeasonType(season_type)
    except ValueError:
        return {"success": False, "error": "Invalid season type"}

    if expected_workers < 1:
        return {
            "success": False,
            "error": "Expected workers must be >= 1",
        }

    batch_id = f"seasonal_{int(datetime.now().timestamp())}"
    batch = SeasonalMigrationBatch(
        batch_id=batch_id,
        season_type=stype,
        source_state=source_state,
        destination_state=destination_state,
        destination_district=destination_district,
        start_date=start_date,
        end_date=end_date,
        verifier_id=verifier_id,
        expected_workers=expected_workers,
    )

    return {
        "success": True,
        "batch": batch.to_dict(),
        "message": "Seasonal batch created",
    }


def add_worker_to_batch(
    batch_id: str,
    aadhaar: str,
) -> Dict:
    """Add a worker to a seasonal migration batch."""
    # In production: lookup batch from database and update
    return {
        "success": True,
        "batch_id": batch_id,
        "aadhaar": aadhaar,
        "message": "Worker added to seasonal batch",
    }


def enable_group_renewal(
    batch_id: str,
    extension_days: int,
) -> Dict:
    """Enable group renewal for entire batch."""
    if extension_days < 7 or extension_days > 365:
        return {
            "success": False,
            "error": "Extension days must be between 7 and 365",
        }

    return {
        "success": True,
        "batch_id": batch_id,
        "extension_days": extension_days,
        "workers_renewed": 0,  # Mock: would update all workers in batch
        "message": "Group renewal enabled for batch",
    }


def get_seasonal_categories() -> Dict:
    """Return available seasonal migration categories."""
    return {
        "agriculture": {
            "description": "Farm workers, harvest season",
            "typical_duration_days": 120,
            "regions": ["North India", "Deccan", "Eastern India"],
        },
        "construction": {
            "description": "Construction workers, project-based",
            "typical_duration_days": 180,
            "regions": ["Urban centers", "Special Economic Zones"],
        },
        "festival": {
            "description": "Festival and event workers",
            "typical_duration_days": 30,
            "regions": ["Pilgrimage centers", "Event venues"],
        },
        "other": {
            "description": "Other seasonal patterns",
            "typical_duration_days": 90,
            "regions": ["Variable"],
        },
    }
