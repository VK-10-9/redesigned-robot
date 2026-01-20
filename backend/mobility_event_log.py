"""
Mobility Event Log for AMF.
Maintains historical record of migration events (address timeline).
"""

from datetime import datetime
from typing import Dict, List


class MobilityEvent:
    """Records a single migration event."""

    def __init__(
        self,
        event_id: str,
        aadhaar: str,
        event_type: str,  # "migration", "verification", "expiry"
        source_address: str,
        source_state: str,
        destination_address: str,
        destination_state: str,
        event_date: str,
        verification_authority: str,
        duration_days: int = 0,
    ):
        self.event_id = event_id
        self.aadhaar = aadhaar
        self.event_type = event_type
        self.source_address = source_address
        self.source_state = source_state
        self.destination_address = destination_address
        self.destination_state = destination_state
        self.event_date = event_date
        self.verification_authority = verification_authority
        self.duration_days = duration_days
        self.recorded_at = datetime.now().isoformat()

    def to_dict(self) -> Dict:
        return {
            "event_id": self.event_id,
            "aadhaar": self.aadhaar,
            "event_type": self.event_type,
            "source_address": self.source_address,
            "source_state": self.source_state,
            "destination_address": self.destination_address,
            "destination_state": self.destination_state,
            "event_date": self.event_date,
            "verification_authority": self.verification_authority,
            "duration_days": self.duration_days,
            "recorded_at": self.recorded_at,
        }


class MobilityEventLog:
    """Maintains immutable timeline of mobility events."""

    def __init__(self):
        self._events: Dict[str, List[Dict]] = {}  # aadhaar -> list of events

    def add_event(
        self,
        aadhaar: str,
        event_type: str,
        source_address: str,
        source_state: str,
        destination_address: str,
        destination_state: str,
        verification_authority: str,
        duration_days: int = 0,
    ) -> Dict:
        """Add a migration event to the log."""
        event_id = f"event_{aadhaar}_{int(datetime.now().timestamp())}"
        event = MobilityEvent(
            event_id=event_id,
            aadhaar=aadhaar,
            event_type=event_type,
            source_address=source_address,
            source_state=source_state,
            destination_address=destination_address,
            destination_state=destination_state,
            event_date=datetime.now().isoformat(),
            verification_authority=verification_authority,
            duration_days=duration_days,
        )

        if aadhaar not in self._events:
            self._events[aadhaar] = []

        self._events[aadhaar].append(event.to_dict())

        return {
            "success": True,
            "event": event.to_dict(),
            "message": "Mobility event recorded",
        }

    def get_timeline(self, aadhaar: str) -> List[Dict]:
        """Retrieve full migration timeline for an Aadhaar."""
        return self._events.get(aadhaar, [])

    def get_summary(self, aadhaar: str) -> Dict:
        """Get summary of mobility for an Aadhaar."""
        events = self._events.get(aadhaar, [])
        if not events:
            return {
                "aadhaar": aadhaar,
                "total_events": 0,
                "migrations": 0,
                "summary": "No mobility events recorded",
            }

        migrations = [e for e in events if e.get("event_type") == "migration"]
        return {
            "aadhaar": aadhaar,
            "total_events": len(events),
            "migrations": len(migrations),
            "first_recorded": events[0]["event_date"] if events else None,
            "last_recorded": events[-1]["event_date"] if events else None,
        }


# Global event log (in production: use database)
_global_mobility_log = MobilityEventLog()


def log_mobility_event(
    aadhaar: str,
    event_type: str,
    source_address: str,
    source_state: str,
    destination_address: str,
    destination_state: str,
    verification_authority: str,
    duration_days: int = 0,
) -> Dict:
    """Log a mobility event globally."""
    return _global_mobility_log.add_event(
        aadhaar,
        event_type,
        source_address,
        source_state,
        destination_address,
        destination_state,
        verification_authority,
        duration_days,
    )


def get_mobility_timeline(aadhaar: str) -> List[Dict]:
    """Retrieve mobility timeline globally."""
    return _global_mobility_log.get_timeline(aadhaar)


def get_mobility_summary(aadhaar: str) -> Dict:
    """Get mobility summary globally."""
    return _global_mobility_log.get_summary(aadhaar)
