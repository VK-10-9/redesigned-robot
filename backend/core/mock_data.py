from datetime import datetime, timedelta

mock_anomalies = {
    "anomalies": [
        {
            "id": 1,
            "anomaly_type": "Duplicate Aadhaar",
            "severity": "high",
            "description": "Multiple enrollments detected with same Aadhaar.",
            "state_name": "Maharashtra",
            "records_affected": 1247,
            "detected_at": (datetime.now() - timedelta(days=2)).isoformat(),
        },
        {
            "id": 2,
            "anomaly_type": "Unusual Concentration",
            "severity": "high",
            "description": "High enrollment concentration in a district.",
            "state_name": "Karnataka",
            "records_affected": 892,
            "detected_at": (datetime.now() - timedelta(days=5)).isoformat(),
        },
    ],
    "count": 2,
}

mock_recommendations = {
    "recommendations": [
        {
            "id": 1,
            "recommendation_type": "Enhance verification in high-anomaly zones",
            "description": "Implement stricter verification in high anomaly zones.",
            "state_name": "Maharashtra",
            "priority": "High",
            "estimated_impact": "Reduce duplicates",
            "status": "Draft",
            "created_at": (datetime.now() - timedelta(days=7)).isoformat(),
        }
    ],
    "count": 1,
}
