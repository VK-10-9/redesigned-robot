"""
Risk-based alerting system for AFIF.
Generates tiered alerts based on hub anomalies, network patterns,
and historical behavior.
"""

from enum import Enum
from typing import Dict, List


class AlertSeverity(str, Enum):
    """Alert severity levels for tiered response."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


def compute_alert_severity(
    hub_z_score: float = 0, network_risk: float = 0, repeat_offender: bool = False
) -> AlertSeverity:
    """Compute alert severity based on risk factors.

    Args:
        hub_z_score: Anomaly score from hub detection (0-10+)
        network_risk: Network clique risk (0-1)
        repeat_offender: True if previous alerts exist
    """
    risk_score = (hub_z_score / 10.0) * 0.5 + network_risk * 0.4
    if repeat_offender:
        risk_score += 0.1

    if risk_score > 0.8:
        return AlertSeverity.CRITICAL
    elif risk_score > 0.6:
        return AlertSeverity.HIGH
    elif risk_score > 0.3:
        return AlertSeverity.MEDIUM
    else:
        return AlertSeverity.LOW


def generate_alert(
    alert_id: str,
    hub: str,
    severity: AlertSeverity,
    reason: str,
    recommended_action: str = "monitor",
) -> Dict:
    """Generate a tiered alert with recommended action."""
    actions_by_severity = {
        AlertSeverity.LOW: "monitor",
        AlertSeverity.MEDIUM: "audit",
        AlertSeverity.HIGH: "investigate",
        AlertSeverity.CRITICAL: "escalate_to_enforcement",
    }

    return {
        "alert_id": alert_id,
        "hub": hub,
        "severity": severity,
        "reason": reason,
        "recommended_action": actions_by_severity.get(severity, "monitor"),
        "status": "open",
    }


def generate_alerts_from_hubs(anomalies: List[Dict]) -> List[Dict]:
    """Generate tiered alerts from detected hub anomalies."""
    alerts = []
    for i, anomaly in enumerate(anomalies):
        severity = (
            AlertSeverity.CRITICAL
            if anomaly["severity"] == "high"
            else AlertSeverity.MEDIUM
        )
        alert = generate_alert(
            alert_id=f"ALR_{i:04d}",
            hub=anomaly["hub"],
            severity=severity,
            reason=f"Unusual activity spike (z-score: {anomaly['z_score']})",
        )
        alerts.append(alert)

    return alerts
