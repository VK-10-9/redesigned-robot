"""
Utility modules for Aadhaar Intelligence Platform

Modules:
- duplicate_detector: Identify near-duplicate records
- confidence: Confidence scoring for records
- csv_db: CSV-based data access layer
- mock_data: Mock data for testing/demo
"""

from backend.duplicate_detector import detect_duplicates_in_rows
from backend.confidence import score_record
from backend.csv_db import (
    explorer_enrollment,
    get_coverage_gaps,
    get_demographics,
)
from backend.mock_data import mock_anomalies, mock_recommendations

__all__ = [
    "detect_duplicates_in_rows",
    "score_record",
    "explorer_enrollment",
    "get_coverage_gaps",
    "get_demographics",
    "mock_anomalies",
    "mock_recommendations",
]
