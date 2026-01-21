"""
Privacy-Preserving Analytics Framework (PPAF) - Component 2: Federated Analytics
Enables local analysis at state/district levels with only aggregated result sharing.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List


class AnalysisLevel(str, Enum):
    """Federated analytics execution levels."""

    DISTRICT = "district"
    STATE = "state"
    NATIONAL = "national"


class FederatedQuery:
    """Represents a privacy-preserving federated query."""

    def __init__(
        self,
        query_id: str,
        query_name: str,
        computation_type: str,
        target_level: AnalysisLevel,
        filters: Dict[str, Any] = None,
    ):
        """
        Initialize federated query.

        Args:
            query_id: Unique query identifier
            query_name: Human-readable query name
            computation_type: Type of computation (count, sum, average, distribution)
            target_level: Analysis level (district, state, national)
            filters: Optional filters for local computation
        """
        self.query_id = query_id
        self.query_name = query_name
        self.computation_type = computation_type
        self.target_level = target_level
        self.filters = filters or {}
        self.created_at = datetime.now().isoformat()
        self.results = {}

    def to_dict(self) -> Dict:
        """Convert query to dictionary."""
        return {
            "query_id": self.query_id,
            "query_name": self.query_name,
            "computation_type": self.computation_type,
            "target_level": self.target_level.value,
            "created_at": self.created_at,
            "filters": self.filters,
        }


class LocalAnalyticsEngine:
    """Runs analytics locally at source (state/district level)."""

    def __init__(self, location_id: str, location_type: str):
        """
        Initialize local analytics engine.

        Args:
            location_id: State/district code
            location_type: Type of location (state or district)
        """
        self.location_id = location_id
        self.location_type = location_type
        self.computed_results = {}

    def execute_local_query(self, query: FederatedQuery, records: List[Dict]) -> Dict:
        """
        Execute query locally on records, returning only aggregates.

        Args:
            query: FederatedQuery object
            records: Local records to analyze

        Returns:
            Dictionary with aggregated results only (no individual data)
        """
        if query.computation_type == "count":
            count = len(records)
            return {
                "result_type": "count",
                "value": count,
                "location": self.location_id,
            }

        elif query.computation_type == "average":
            if not records:
                return {
                    "result_type": "average",
                    "value": 0,
                    "location": self.location_id,
                }
            values = [r.get("value", 0) for r in records if "value" in r]
            avg = sum(values) / len(values) if values else 0
            return {
                "result_type": "average",
                "value": avg,
                "location": self.location_id,
            }

        elif query.computation_type == "distribution":
            # Return only aggregate distribution, not individual data
            distribution = {}
            for record in records:
                category = record.get("category", "unknown")
                distribution[category] = distribution.get(category, 0) + 1
            return {
                "result_type": "distribution",
                "value": distribution,
                "location": self.location_id,
            }

        return {"result_type": "unknown", "location": self.location_id}

    def aggregate_peer_results(self, peer_results: List[Dict]) -> Dict:
        """
        Aggregate results from multiple local engines (e.g., multiple districts).

        Args:
            peer_results: List of aggregated results from peer locations

        Returns:
            National-level aggregated result
        """
        if not peer_results:
            return {"aggregated_result": None}

        # Aggregate counts
        if peer_results[0].get("result_type") == "count":
            total_count = sum(r.get("value", 0) for r in peer_results)
            return {
                "aggregated_result": "national_count",
                "total": total_count,
                "by_location": {r["location"]: r["value"] for r in peer_results},
            }

        # Aggregate averages
        elif peer_results[0].get("result_type") == "average":
            values = [r.get("value", 0) for r in peer_results]
            national_avg = sum(values) / len(values) if values else 0
            return {
                "aggregated_result": "national_average",
                "value": national_avg,
                "by_location": {r["location"]: r["value"] for r in peer_results},
            }

        # Aggregate distributions
        elif peer_results[0].get("result_type") == "distribution":
            combined_dist = {}
            for result in peer_results:
                dist = result.get("value", {})
                for key, count in dist.items():
                    combined_dist[key] = combined_dist.get(key, 0) + count
            return {
                "aggregated_result": "national_distribution",
                "value": combined_dist,
            }

        return {"aggregated_result": "unknown"}
