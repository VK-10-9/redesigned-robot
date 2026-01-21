"""
AMF - Aadhaar Mobility Framework
Analyzes demographic and geographic distribution patterns
"""

import os
from typing import Any, Dict, List

USE_CSV_DB = os.getenv("USE_CSV_DB", "1") == "1"
if USE_CSV_DB:
    from .csv_db import (
        get_coverage_gaps as csv_get_coverage_gaps,
    )
    from .csv_db import (
        get_demographic_distribution as csv_get_demographic_distribution,
    )
    from .csv_db import (
        get_state_distribution as csv_get_state_distribution,
    )


class MobilityFramework:
    def __init__(self):
        if not USE_CSV_DB:
            raise RuntimeError(
                "MobilityFramework requires Postgres which is removed."
                " Set USE_CSV_DB=1 to run in CSV-only mode."
            )

    def analyze_geographic_distribution(self) -> Dict[str, Any]:
        """Analyze geographic spread of enrollments (CSV-only)"""
        data = csv_get_state_distribution(limit=1000)
        return data

    def analyze_demographic_patterns(self) -> Dict[str, Any]:
        """Analyze demographic distribution patterns (CSV-only)"""
        return csv_get_demographic_distribution()

    def calculate_coverage_gaps(self) -> List[Dict[str, Any]]:
        """Identify districts with low coverage (CSV-only)"""
        return csv_get_coverage_gaps(limit=20)

    def close(self):
        return None
