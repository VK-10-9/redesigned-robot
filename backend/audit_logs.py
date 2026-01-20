"""
Tamper-evident audit logs for AFIF.
Maintains immutable, traceable logs for all enrollment, update,
and verification events to support forensic investigation.
"""

import hashlib
from datetime import datetime
from typing import Dict, Optional


class AuditLogEntry:
    """Represents a single audit log entry with tamper-detection."""

    def __init__(
        self,
        event_id: str,
        event_type: str,
        record_id: str,
        action: str,
        actor: str,
        details: Optional[Dict] = None,
    ):
        self.event_id = event_id
        self.event_type = (
            event_type  # enrollment, update, verification, escalation, etc.
        )
        self.record_id = record_id
        self.action = action  # create, modify, verify, flag, etc.
        self.actor = actor  # system, user_id, or "automated"
        self.details = details or {}
        self.timestamp = datetime.now().isoformat()
        self.hash = None  # Will be computed

    def compute_hash(self, previous_hash: str = "") -> str:
        """Compute cryptographic hash for this entry (tamper-evident).

        Includes previous_hash to form a chain.
        """
        content = (
            f"{self.event_id}{self.event_type}{self.record_id}"
            f"{self.action}{self.actor}{self.timestamp}"
            f"{previous_hash}"
        )
        self.hash = hashlib.sha256(content.encode()).hexdigest()
        return self.hash

    def to_dict(self) -> Dict:
        """Serialize to dictionary for storage/transmission."""
        return {
            "event_id": self.event_id,
            "event_type": self.event_type,
            "record_id": self.record_id,
            "action": self.action,
            "actor": self.actor,
            "timestamp": self.timestamp,
            "details": self.details,
            "hash": self.hash,
        }


class AuditLog:
    """In-memory audit log with tamper-detection (chain of hashes)."""

    def __init__(self):
        self.entries: list[AuditLogEntry] = []
        self.last_hash = ""

    def log_event(
        self,
        event_id: str,
        event_type: str,
        record_id: str,
        action: str,
        actor: str,
        details: Optional[Dict] = None,
    ) -> AuditLogEntry:
        """Add an event to the audit log."""
        entry = AuditLogEntry(event_id, event_type, record_id, action, actor, details)
        entry.compute_hash(self.last_hash)
        self.entries.append(entry)
        self.last_hash = entry.hash
        return entry

    def get_log(self) -> list[Dict]:
        """Return all log entries as list of dicts."""
        return [e.to_dict() for e in self.entries]

    def verify_integrity(self) -> bool:
        """Verify that the log chain has not been tampered with."""
        if not self.entries:
            return True

        prev_hash = ""
        for entry in self.entries:
            if entry.compute_hash(prev_hash) != entry.hash:
                return False
            prev_hash = entry.hash

        return True


# Global audit log instance (in production, use a database)
_global_audit_log = AuditLog()


def log_event(
    event_id: str,
    event_type: str,
    record_id: str,
    action: str,
    actor: str = "system",
    details: Optional[Dict] = None,
) -> Dict:
    """Log an event to the global audit trail."""
    entry = _global_audit_log.log_event(
        event_id, event_type, record_id, action, actor, details
    )
    return entry.to_dict()


def get_audit_log() -> list[Dict]:
    """Retrieve all audit log entries."""
    return _global_audit_log.get_log()


def verify_audit_log() -> bool:
    """Verify the integrity of the audit log chain."""
    return _global_audit_log.verify_integrity()
