"""
Auto-Expiry Safety Net for AMF.
Sends alerts before address expiry and provides grace period.
"""

from datetime import datetime, timedelta
from enum import Enum
from typing import Dict, List


class AlertType(str, Enum):
    """Types of expiry alerts."""

    CRITICAL_ALERT = "critical"  # 3 days before
    WARNING_ALERT = "warning"  # 7 days before
    REMINDER_ALERT = "reminder"  # 30 days before


class ExpiryAlert:
    """Alert for upcoming address lease expiry."""

    def __init__(
        self,
        alert_id: str,
        aadhaar: str,
        lease_id: str,
        alert_type: AlertType,
        expiry_date: str,
        contact_methods: List[str],  # ["sms", "app", "ivr"]
    ):
        self.alert_id = alert_id
        self.aadhaar = aadhaar
        self.lease_id = lease_id
        self.alert_type = alert_type
        self.expiry_date = expiry_date
        self.contact_methods = contact_methods
        self.created_at = datetime.now().isoformat()
        self.acknowledged = False

    def to_dict(self) -> Dict:
        return {
            "alert_id": self.alert_id,
            "aadhaar": self.aadhaar,
            "lease_id": self.lease_id,
            "alert_type": self.alert_type.value,
            "expiry_date": self.expiry_date,
            "contact_methods": self.contact_methods,
            "created_at": self.created_at,
            "acknowledged": self.acknowledged,
        }


def calculate_alert_schedule(
    lease_start_date: str,
    lease_validity_days: int,
) -> Dict:
    """Calculate when alerts should be triggered."""
    try:
        start_dt = datetime.fromisoformat(lease_start_date)
    except ValueError:
        return {"success": False, "error": "Invalid date format"}

    expiry_dt = start_dt + timedelta(days=lease_validity_days)
    now = datetime.now()

    days_until_expiry = (expiry_dt - now).days

    alerts = []

    # Reminder: 30 days before
    if days_until_expiry <= 30:
        alerts.append(
            {
                "alert_type": AlertType.REMINDER_ALERT.value,
                "trigger_days_before": 30,
                "should_trigger": True,
            }
        )

    # Warning: 7 days before
    if days_until_expiry <= 7:
        alerts.append(
            {
                "alert_type": AlertType.WARNING_ALERT.value,
                "trigger_days_before": 7,
                "should_trigger": True,
            }
        )

    # Critical: 3 days before
    if days_until_expiry <= 3:
        alerts.append(
            {
                "alert_type": AlertType.CRITICAL_ALERT.value,
                "trigger_days_before": 3,
                "should_trigger": True,
            }
        )

    return {
        "success": True,
        "expiry_date": expiry_dt.isoformat(),
        "days_until_expiry": days_until_expiry,
        "scheduled_alerts": alerts,
    }


def create_expiry_alert(
    aadhaar: str,
    lease_id: str,
    expiry_date: str,
    alert_type: str = "warning",
    contact_methods: List[str] = None,
) -> Dict:
    """Create an expiry alert."""
    if contact_methods is None:
        contact_methods = ["sms", "app"]

    try:
        alert_enum = AlertType(alert_type)
    except ValueError:
        return {"success": False, "error": "Invalid alert type"}

    alert_id = f"alert_{aadhaar}_{int(datetime.now().timestamp())}"
    alert = ExpiryAlert(
        alert_id=alert_id,
        aadhaar=aadhaar,
        lease_id=lease_id,
        alert_type=alert_enum,
        expiry_date=expiry_date,
        contact_methods=contact_methods,
    )

    return {
        "success": True,
        "alert": alert.to_dict(),
        "message": "Expiry alert created",
    }


def calculate_grace_period(
    expiry_date: str,
    grace_days: int = 7,
) -> Dict:
    """Calculate grace period after expiry."""
    try:
        expiry_dt = datetime.fromisoformat(expiry_date)
    except ValueError:
        return {"success": False, "error": "Invalid date format"}

    grace_end = expiry_dt + timedelta(days=grace_days)
    now = datetime.now()

    in_grace_period = expiry_dt <= now <= grace_end

    return {
        "success": True,
        "expiry_date": expiry_date,
        "grace_period_end": grace_end.isoformat(),
        "grace_days": grace_days,
        "in_grace_period": in_grace_period,
        "days_remaining_in_grace": max(0, (grace_end - now).days),
    }
