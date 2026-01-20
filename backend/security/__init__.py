"""
Security and Audit modules

Modules:
- audit_logs: Tamper-evident audit trail logging
- escalation: Case escalation and fail-safe mechanisms
"""

from backend.audit_logs import log_event, get_audit_log, verify_audit_log
from backend.escalation import create_escalation, fail_safe_response

__all__ = [
    "log_event",
    "get_audit_log",
    "verify_audit_log",
    "create_escalation",
    "fail_safe_response",
]
