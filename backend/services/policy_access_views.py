"""
Privacy-Preserving Analytics Framework (PPAF) - Component 4: Policy-Only Access Views
Role-based access control for aggregated, anonymized analytics dashboards.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List


class UserRole(str, Enum):
    """User roles for analytics access."""

    POLICYMAKER = "policymaker"  # High-level aggregate views only
    ANALYST = "analyst"  # State/district aggregates
    AUDITOR = "auditor"  # Read-only aggregates with full audit trail
    ADMIN = "admin"  # All aggregates + access control management
    PUBLIC = "public"  # Very limited public aggregates


class DataClassification(str, Enum):
    """Data sensitivity levels."""

    PUBLIC = "public"  # Can be shared with everyone
    INTERNAL = "internal"  # Only for government staff
    SENSITIVE = "sensitive"  # Only for authorized analysts
    RESTRICTED = "restricted"  # Only for admins


class AccessControl:
    """Role-based access control for analytics."""

    def __init__(self, user_id: str, role: UserRole):
        """
        Initialize access control for user.

        Args:
            user_id: Unique user identifier (email/ID)
            role: User role determining access level
        """
        self.user_id = user_id
        self.role = role
        self.access_log = []

    def can_access(self, data_classification: DataClassification) -> bool:
        """
        Check if user role can access data with given classification.

        Args:
            data_classification: Sensitivity level of data

        Returns:
            True if user can access, False otherwise
        """
        access_matrix = {
            UserRole.PUBLIC: [DataClassification.PUBLIC],
            UserRole.POLICYMAKER: [
                DataClassification.PUBLIC,
                DataClassification.INTERNAL,
            ],
            UserRole.ANALYST: [
                DataClassification.PUBLIC,
                DataClassification.INTERNAL,
                DataClassification.SENSITIVE,
            ],
            UserRole.AUDITOR: [
                DataClassification.PUBLIC,
                DataClassification.INTERNAL,
                DataClassification.SENSITIVE,
            ],
            UserRole.ADMIN: [
                DataClassification.PUBLIC,
                DataClassification.INTERNAL,
                DataClassification.SENSITIVE,
                DataClassification.RESTRICTED,
            ],
        }

        allowed_levels = access_matrix.get(self.role, [])
        return data_classification in allowed_levels

    def log_access(
        self, resource: str, classification: DataClassification, allowed: bool
    ):
        """
        Log access attempt for audit trail.

        Args:
            resource: Name of accessed resource
            classification: Data classification level
            allowed: Whether access was granted
        """
        self.access_log.append(
            {
                "user_id": self.user_id,
                "resource": resource,
                "classification": classification.value,
                "allowed": allowed,
                "timestamp": datetime.now().isoformat(),
            }
        )

    def get_access_log(self) -> List[Dict]:
        """Get user's access audit log."""
        return self.access_log


class AnonymizedDashboard:
    """Dashboard showing only aggregated, anonymized metrics."""

    def __init__(self, dashboard_id: str, dashboard_name: str):
        """
        Initialize anonymized dashboard.

        Args:
            dashboard_id: Unique dashboard identifier
            dashboard_name: Human-readable dashboard name
        """
        self.dashboard_id = dashboard_id
        self.dashboard_name = dashboard_name
        self.metrics = {}

    def add_metric(
        self,
        metric_name: str,
        value: Any,
        classification: DataClassification = DataClassification.INTERNAL,
    ):
        """
        Add metric to dashboard.

        Args:
            metric_name: Name of metric
            value: Aggregated value (no individual data)
            classification: Data sensitivity level
        """
        self.metrics[metric_name] = {
            "value": value,
            "classification": classification.value,
            "added_at": datetime.now().isoformat(),
        }

    def get_view_for_role(self, role: UserRole) -> Dict:
        """
        Get dashboard view filtered by user role.

        Args:
            role: User role determining what metrics to show

        Returns:
            Dictionary with only metrics user can access
        """
        access_control = AccessControl("system", role)

        filtered_metrics = {}
        for metric_name, metric_data in self.metrics.items():
            classification = DataClassification(metric_data["classification"])

            if access_control.can_access(classification):
                filtered_metrics[metric_name] = metric_data["value"]

        return {
            "dashboard_id": self.dashboard_id,
            "dashboard_name": self.dashboard_name,
            "user_role": role.value,
            "metrics": filtered_metrics,
            "generated_at": datetime.now().isoformat(),
            "privacy_note": (
                "All data is aggregated and anonymized. "
                "Individual records are not visible."
            ),
        }


class PolicyDashboardView:
    """High-level policy dashboard with minimal details."""

    def __init__(self):
        """Initialize policy dashboard for policymakers."""
        self.metrics = {}

    def add_policy_metric(self, metric_name: str, value: Any, interpretation: str = ""):
        """
        Add policy-relevant metric.

        Args:
            metric_name: Name of metric (e.g., 'migration_pressure_by_district')
            value: Aggregated value
            interpretation: What the metric means for policy
        """
        self.metrics[metric_name] = {
            "value": value,
            "interpretation": interpretation,
            "added_at": datetime.now().isoformat(),
        }

    def get_policy_summary(self) -> Dict:
        """
        Get summary view for policymakers (no individual data, interpretation only).

        Returns:
            Dictionary with aggregated insights and policy implications
        """
        summary = {
            "summary_type": "policy_dashboard",
            "generated_at": datetime.now().isoformat(),
            "metrics": self.metrics,
            "access_note": (
                "This dashboard contains only aggregated, anonymized data "
                "suitable for policy decisions."
            ),
            "privacy_guarantee": (
                "No individual Aadhaar numbers or personally identifiable "
                "information is included."
            ),
        }

        return summary
