"""
Demand Forecasting for PROF.
Predicts future demand (1-3 months ahead) for:
- Aadhaar enrolment & update load
- PDS (public distribution system) demand
- Healthcare & service pressure
Uses historical trends and seasonal migration patterns.
"""

from collections import defaultdict
from typing import Dict, List


def forecast_demand(records: List[Dict[str, str]], forecast_days: int = 30) -> Dict:
    """Forecast demand for enrolment, PDS, and healthcare (1-3 months ahead).

    Uses historical trends extrapolated with seasonal adjustment.

    Returns dict with:
    - enrolment_forecast: predicted daily enrolment load
    - update_forecast: predicted daily update load
    - pds_demand_forecast: predicted PDS demand
    - healthcare_pressure: predicted service pressure
    - confidence: confidence score (0-1)
    """
    # Count historical daily activity
    daily_counts = defaultdict(int)
    daily_updates = defaultdict(int)
    daily_pds_demand = defaultdict(int)
    daily_healthcare = defaultdict(int)

    for record in records:
        timestamp = record.get("timestamp", "").strip()
        if not timestamp:
            continue

        # Extract date (assume YYYY-MM-DD format or similar)
        date_part = timestamp.split()[0] if " " in timestamp else timestamp[:10]

        # Categorize activity type
        activity_type = record.get("activity_type", "enrolment").strip()
        if activity_type == "update":
            daily_updates[date_part] += 1
        else:
            daily_counts[date_part] += 1

        # PDS demand is proxy: if person updating address,
        # they may need PDS reregistration
        # Healthcare: assume proportional to population activity
        if activity_type == "update":
            daily_pds_demand[date_part] += 1
            daily_healthcare[date_part] += 0.5

    # Calculate average daily load (baseline)
    enrolment_baseline = (
        sum(daily_counts.values()) / len(daily_counts) if daily_counts else 0
    )
    update_baseline = (
        sum(daily_updates.values()) / len(daily_updates) if daily_updates else 0
    )
    pds_baseline = (
        sum(daily_pds_demand.values()) / len(daily_pds_demand)
        if daily_pds_demand
        else 0
    )
    healthcare_baseline = (
        sum(daily_healthcare.values()) / len(daily_healthcare)
        if daily_healthcare
        else 0
    )

    # Trend: simple linear extrapolation
    # (In production, use ARIMA, Prophet, or similar; this is MVP)
    enrolment_trend = 1.05 if enrolment_baseline > 0 else 0  # Assume 5% growth
    update_trend = 1.08 if update_baseline > 0 else 0  # 8% growth (migration season)
    pds_trend = 1.04 if pds_baseline > 0 else 0  # 4% growth
    healthcare_trend = 1.06 if healthcare_baseline > 0 else 0  # 6% growth

    # Seasonal adjustment (rough heuristic)
    # Assume migration peaks in certain months; scale accordingly
    seasonal_factor = 1.2  # Default to 20% increase (migration season)

    # Forecast for next N days
    enrolment_forecast = (
        enrolment_baseline * enrolment_trend * seasonal_factor * forecast_days
    )
    update_forecast = update_baseline * update_trend * seasonal_factor * forecast_days
    pds_forecast = pds_baseline * pds_trend * seasonal_factor * forecast_days
    healthcare_forecast = (
        healthcare_baseline * healthcare_trend * seasonal_factor * forecast_days
    )

    # Confidence: based on data freshness and historical variance
    # (Simple heuristic: more data = higher confidence)
    data_points = len(daily_counts) + len(daily_updates)
    confidence = min(0.95, 0.5 + (data_points / 100) * 0.45)

    return {
        "forecast_days": forecast_days,
        "enrolment_forecast": round(enrolment_forecast, 2),
        "update_forecast": round(update_forecast, 2),
        "pds_demand_forecast": round(pds_forecast, 2),
        "healthcare_pressure_forecast": round(healthcare_forecast, 2),
        "confidence": round(confidence, 2),
        "trend_enrolment": enrolment_trend,
        "trend_update": update_trend,
        "seasonal_factor": seasonal_factor,
    }


def adjust_forecast_by_district(
    records: List[Dict[str, str]], forecast_days: int = 30
) -> Dict[str, Dict]:
    """Forecast demand by district (more granular).

    Returns dict mapping district -> demand forecast.
    """
    district_records = defaultdict(list)

    for record in records:
        district = record.get("district", "unknown").strip()
        district_records[district].append(record)

    district_forecasts = {}
    for district, recs in district_records.items():
        district_forecasts[district] = forecast_demand(recs, forecast_days)

    return district_forecasts
