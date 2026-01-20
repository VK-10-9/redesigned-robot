"""
Fail-safe and escalation logic for IRF.
Routes unresolved or high-risk identity cases to human review with
clear audit trails and temporal guarantees.
"""

from datetime import datetime
from typing import Dict, List


class EscalationCase:
    """Represents a flagged case for human review."""

    def __init__(
        self,
        record_id: str,
        reason: str,
        severity: str = "medium",
        citizen_data: Dict = None,
    ):
        self.record_id = record_id
        self.reason = reason  # e.g., "repeated_biometric_failures", "duplicate_match"
        self.severity = severity  # "low", "medium", "high"
        self.citizen_data = citizen_data or {}
        self.created_at = datetime.now().isoformat()
        self.status = "pending"  # pending, reviewed, resolved, escalated
        self.reviewer_id = None
        self.decision = None  # e.g., "approve", "reject", "request_update"
        self.resolved_at = None


def should_fail_safe_mode(
    biometric_failure_count: int, consecutive_failures: int = 3
) -> bool:
    """Determine if fail-safe mode should be activated.

    Activates temporary limited access after N consecutive biometric failures.
    """
    return consecutive_failures >= 3


def create_escalation(
    record_id: str,
    reason: str,
    severity: str = "medium",
    citizen_data: Dict = None,
) -> EscalationCase:
    """Create and log an escalation case for manual review."""
    case = EscalationCase(record_id, reason, severity, citizen_data)
    return case


def fail_safe_response(record_id: str, reason: str) -> Dict:
    """Generate a fail-safe access grant with temporary privileges.

    Returns a response dict for essential service access while escalation
    is being processed.
    """
    return {
        "status": "fail_safe_mode",
        "record_id": record_id,
        "access_granted": "temporary_essential_services",
        "services": ["identity_verification", "pension", "ration_card"],
        "reason": reason,
        "valid_until": "24_hours",
        "escalation_created": datetime.now().isoformat(),
        "next_action": "Contact local authority for manual verification",
    }


def escalation_queue() -> List[Dict]:
    """Return a list of pending escalation cases (mock).

    In production, this would query a database or message queue.
    """
    return []


def resolve_escalation(case_id: str, decision: str, reviewer_id: str) -> Dict:
    """Resolve an escalation case with human decision.

    Args:
        case_id: ID of the escalation case
        decision: "approve", "reject", "request_update"
        reviewer_id: ID of the official who reviewed
    """
    return {
        "case_id": case_id,
        "decision": decision,
        "reviewer_id": reviewer_id,
        "resolved_at": datetime.now().isoformat(),
        "audit_trail": f"Case {case_id} resolved by {reviewer_id} "
        f"with decision: {decision}",
    }
