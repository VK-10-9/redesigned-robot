"""
ADIF - Aadhaar Data Intelligence Framework
Anomaly Detection Engine
"""

from typing import Any, Dict, List

# AnomalyDetector required Postgres previously and is now deprecated.
# Use CSV-based analytics and offline scripts for anomaly detection.


class AnomalyDetector:
    def __init__(self):
        raise RuntimeError("AnomalyDetector removed; use CSV-based analytics.")

    # Backward-compatible method stubs could be added here if needed

    def detect_unusual_concentration(
        self, threshold_percentile: float = 95
    ) -> List[Dict[str, Any]]:
        """Detect unusual enrollment concentrations in districts (DEPRECATED)."""
        raise RuntimeError("AnomalyDetector is deprecated in CSV-only mode.")

    def detect_rapid_enrollment_spike(
        self, window_days: int = 7
    ) -> List[Dict[str, Any]]:
        """Detect rapid enrollment spikes in recent periods (DEPRECATED)."""
        raise RuntimeError("AnomalyDetector is deprecated in CSV-only mode.")

    def run_all_detections(self) -> Dict[str, List]:
        """Run all anomaly detection algorithms"""
        return {
            "duplicate_aadhaar": self.detect_duplicate_aadhaar(),
            "unusual_concentration": self.detect_unusual_concentration(),
            "rapid_enrollment_spikes": self.detect_rapid_enrollment_spike(),
        }

    def close(self):
        self.conn.close()
