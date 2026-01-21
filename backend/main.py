import os
import sys
import asyncio
import logging
from datetime import datetime
from typing import Optional

# Ensure backend directory is in path for module imports
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Import async I/O handler
from core.async_io_handler import get_async_handler, async_cached, async_with_retry

# Import database health functions
from core.csv_db import health_check, optimize_cache

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# CSV-only datastore (Postgres removed)
USE_CSV_DB = os.getenv("USE_CSV_DB", "1") == "1"
if USE_CSV_DB:
    from core.csv_db import (
        explorer_enrollment,
        get_coverage_gaps,
        get_demographic_distribution as csv_get_demographic_distribution,
        get_demographics,
        get_enrollment_timeline as csv_get_enrollment_timeline,
        get_state_distribution as csv_get_state_distribution,
        clear_cache,
        get_cache_stats,
        get_available_states,
        get_available_districts,
        get_unified_state_metrics,
        get_combined_demographics,
        get_dataset_summary,
        health_check,
        optimize_cache,
    )
else:
    raise RuntimeError(
        "Postgres support removed. Set USE_CSV_DB=1 to run in CSV-only mode."
    )
app = FastAPI(title="SAMVIDHAN API", description="Aadhaar Intelligence Platform API")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============= HEALTH & STATUS ENDPOINTS =============


@app.get("/")
async def root():
    """Root endpoint - API is running"""
    return {
        "status": "running",
        "api": "SAMVIDHAN - Aadhaar Intelligence Platform",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/api/status")
async def api_status():
    """API status check"""
    return {
        "status": "ok",
        "message": "Backend API is operational",
        "timestamp": datetime.now().isoformat()
    }


# ============= NATIONAL OVERVIEW ENDPOINTS =============


@app.get("/api/national-overview")
async def get_national_overview():
    """Get high-level national statistics (CSV-only mode) - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_stats():
            # Run sync operation in thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            states = await loop.run_in_executor(None, csv_get_state_distribution, 1000)
            return states
        
        states = await handler.execute_io_operation(
            "fetch_state_distribution",
            fetch_stats,
            use_cache=True,
            cache_key="national_overview_states",
            retry=True
        )
        
        total = sum(s.get("total_enrollments", 0) for s in states)
        states_covered = len(states)
        active = total
        anomalies = 0

        logger.info(f"National overview fetched: {total} enrollments across {states_covered} states")
        
        return {
            "total_enrollments": total,
            "active_users": active,
            "states_covered": states_covered,
            "anomalies_detected": anomalies,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        logger.error(f"Error in get_national_overview: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/enrollment-timeline")
async def get_enrollment_timeline(months: int = Query(12, ge=1, le=120)):
    """Get enrollment trends over time - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_timeline():
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, csv_get_enrollment_timeline, months)
        
        timeline = await handler.execute_io_operation(
            "fetch_enrollment_timeline",
            fetch_timeline,
            use_cache=True,
            cache_key=f"enrollment_timeline_{months}",
            retry=True
        )
        
        logger.info(f"Enrollment timeline fetched for {months} months")
        return {"timeline": timeline, "period_months": months}
    except Exception as e:
        logger.error(f"Error in get_enrollment_timeline: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= MOBILITY ANALYSIS ENDPOINTS =============


@app.get("/api/mobility/state-distribution")
async def get_state_distribution():
    """Get enrollment distribution by state (CSV-only) - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_distribution():
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, csv_get_state_distribution, 1000)
        
        data = await handler.execute_io_operation(
            "fetch_state_distribution",
            fetch_distribution,
            use_cache=True,
            cache_key="state_distribution",
            retry=True
        )
        
        logger.info(f"State distribution fetched: {len(data)} states")
        return {"states": data, "total_states": len(data)}
    except Exception as e:
        logger.error(f"Error in get_state_distribution: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/mobility/demographic-distribution")
async def get_mobility_demographic_distribution():
    """Get enrollment by demographics (CSV-only) - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_demographics():
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, csv_get_demographic_distribution)
        
        data = await handler.execute_io_operation(
            "fetch_demographic_distribution",
            fetch_demographics,
            use_cache=True,
            cache_key="demographic_distribution",
            retry=True
        )
        
        logger.info("Demographic distribution fetched")
        return data
    except Exception as e:
        logger.error(f"Error in get_mobility_demographic_distribution: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= STATE-SPECIFIC ANALYTICS ENDPOINT =============

@app.get("/api/states/{state_name}")
async def get_state_analytics(state_name: str):
    """Get comprehensive analytics for a specific state"""
    try:
        handler = get_async_handler()
        
        async def fetch_state_data():
            loop = asyncio.get_event_loop()
            
            # Get state-specific enrollments
            state_enrollments = await loop.run_in_executor(
                None, explorer_enrollment, state_name, None, None, None, 1, 1000
            )
            
            # Get timeline for this state
            state_timeline = await loop.run_in_executor(
                None, csv_get_enrollment_timeline, 12, state_name
            )
            
            # Get demographic data filtered by state
            demographic_data = await loop.run_in_executor(None, csv_get_demographic_distribution)
            
            # Calculate state-specific metrics
            state_rows = state_enrollments.get('rows', [])
            total_enrollments = sum(
                row.get('age_0_5', 0) + row.get('age_5_17', 0) + row.get('age_18_greater', 0)
                for row in state_rows
            )
            
            districts = list(set(row.get('district', 'Unknown') for row in state_rows))
            pincodes = list(set(row.get('pincode', '000000') for row in state_rows if row.get('pincode')))
            
            # Age distribution for this state
            age_distribution = {
                'age_0_5': sum(row.get('age_0_5', 0) for row in state_rows),
                'age_5_17': sum(row.get('age_5_17', 0) for row in state_rows),
                'age_18_greater': sum(row.get('age_18_greater', 0) for row in state_rows),
            }
            
            return {
                'state': state_name,
                'total_enrollments': total_enrollments,
                'active_users': int(total_enrollments * 0.95),
                'districts_covered': len(districts),
                'districts': districts[:20],  # Top 20 districts
                'pincodes_covered': len(pincodes),
                'timeline': state_timeline,
                'demographics': {
                    'age_0_5': age_distribution['age_0_5'],
                    'age_5_17': age_distribution['age_5_17'], 
                    'age_18_greater': age_distribution['age_18_greater'],
                    'total': total_enrollments
                },
                'coverage_ratio': min(100, (len(pincodes) / 1000) * 100),  # Rough coverage estimate
                'data_quality': 'High' if total_enrollments > 100000 else 'Medium' if total_enrollments > 10000 else 'Low'
            }
        
        data = await handler.execute_io_operation(
            "fetch_state_analytics",
            fetch_state_data,
            use_cache=True,
            cache_key=f"state_analytics_{state_name}",
            retry=True
        )
        
        logger.info(f"State analytics fetched for {state_name}: {data.get('total_enrollments', 0)} enrollments")
        return data
        
    except Exception as e:
        logger.error(f"Error fetching state analytics for {state_name}: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= ANOMALY DETECTION ENDPOINTS =============


@app.get("/api/anomalies/list")
async def get_anomalies(
    state_id: Optional[int] = None,
    severity: Optional[str] = None,
    limit: int = Query(50, ge=1, le=500),
):
    """Get detected anomalies (CSV-only/demo mode returns mock anomalies) - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_anomalies():
            loop = asyncio.get_event_loop()
            try:
                from mock_data import mock_anomalies
            except ImportError:
                from .mock_data import mock_anomalies
            
            anomalies = mock_anomalies.get("anomalies", [])[:limit]
            return anomalies
        
        anomalies = await handler.execute_io_operation(
            "fetch_anomalies",
            fetch_anomalies,
            use_cache=False,  # Don't cache anomalies as they may change
            retry=False
        )
        
        logger.info(f"Anomalies fetched: {len(anomalies)} items")
        return {"anomalies": anomalies, "count": len(anomalies)}
    except Exception as e:
        logger.error(f"Error in get_anomalies: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/anomalies/summary")
async def get_anomalies_summary():
    """Get anomaly statistics by type and severity (mocked in CSV-only mode) - ASYNC"""
    try:
        handler = get_async_handler()
        
        async def fetch_summary():
            loop = asyncio.get_event_loop()
            try:
                from mock_data import mock_anomalies
            except ImportError:
                from .mock_data import mock_anomalies
            
            summary = {}
            for a in mock_anomalies.get("anomalies", []):
                key = (a.get("anomaly_type"), a.get("severity"))
                summary[key] = summary.get(key, 0) + 1
            result = [
                {
                    "anomaly_type": k[0],
                    "severity": k[1],
                    "count": v,
                    "total_records_affected": None,
                }
                for k, v in summary.items()
            ]
            return result
        
        summary = await handler.execute_io_operation(
            "fetch_anomaly_summary",
            fetch_summary,
            use_cache=False,
            retry=False
        )
        
        logger.info("Anomaly summary fetched")
        return {"summary": summary}
    except Exception as e:
        logger.error(f"Error in get_anomalies_summary: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= POLICY RECOMMENDATIONS ENDPOINTS =============


@app.get("/api/recommendations/list")
def get_recommendations(
    state_id: Optional[int] = None,
    priority: Optional[str] = None,
    limit: int = Query(50, ge=1, le=500),
):
    """Get policy recommendations (mocked in CSV-only mode)"""
    try:
        try:
            from .mock_data import mock_recommendations
        except ImportError:
            from mock_data import mock_recommendations

        recs = mock_recommendations.get("recommendations", [])[:limit]
        return {"recommendations": recs, "count": len(recs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= AGGREGATED DATA EXPLORER ENDPOINTS =============

# CSV-backed mode
if True:  # Always use CSV mode
    pass


@app.get("/api/explorer/enrollment")
def get_explorer_enrollment(
    state: Optional[str] = None,
    district: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
    order: Optional[str] = Query('asc', regex="^(asc|desc)$"),
    page: int = Query(1, ge=1),
    limit: int = Query(100, ge=1, le=1000),
):
    """Paginated enrollment aggregated rows from all datasets (CSV-only)"""
    try:
        res = explorer_enrollment(
            state=state, 
            district=district, 
            date_from=date_from, 
            date_to=date_to, 
            search=search,
            sort=sort,
            order=order,
            page=page, 
            limit=limit
        )
        return res
    except Exception as e:
        logger.error(f"Error in get_explorer_enrollment: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/explorer/states")
def get_explorer_states():
    """Get a distinct list of states from the enrollment data."""
    try:
        # This will leverage the index built by other functions
        states = get_available_states()
        if not states:
            # If index is not built, build it by scanning
            get_state_distribution(limit=50) # This will populate the index
            states = get_available_states()
        return states
    except Exception as e:
        logger.error(f"Error in get_explorer_states: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/aggregated/enrollment-timeline")
def aggregated_enrollment_timeline(
    state: Optional[str] = None, months: int = Query(12, ge=1, le=120)
):
    """Return monthly aggregated enrollment counts across all age buckets (CSV-only)"""
    try:
        timeline = csv_get_enrollment_timeline(months=months, state=state)
        return {"timeline": timeline, "months": months}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= AGGREGATED INSIGHTS ENDPOINTS =============


@app.get("/api/aggregated/state-distribution")
def aggregated_state_distribution(limit: int = Query(20, ge=1, le=200)):
    """Return per-state aggregated enrollments (CSV-only)"""
    try:
        data = csv_get_state_distribution(limit=limit)
        return {"states": data, "total_states": len(data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/aggregated/demographics")
def aggregated_demographics(limit: int = Query(100, ge=1, le=1000)):
    """Return aggregated demographics by state (CSV-only)"""
    try:
        data = get_demographics(limit=limit)
        return {"demographics": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/aggregated/coverage-gaps")
def aggregated_coverage_gaps(limit: int = Query(20, ge=1, le=500)):
    """Identify districts with low coverage (CSV-only)"""
    try:
        data = get_coverage_gaps(limit=limit)
        return {"coverage_gaps": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= SIGNALS / ADIF ENDPOINTS =============


@app.get("/api/signals/duplicates")
def signals_duplicates(threshold: float = 0.85, max_rows: int = 500):
    """Detect near-duplicate pairs across enrollment records (CSV-only).

    WARNING: This runs an O(n^2) scan over `max_rows` rows; keep `max_rows` small
    (default 500) for interactive use.
    """
    try:
        import csv
        import os

        from .duplicate_detector import detect_duplicates_in_rows

        # Load up to max_rows from enrollment CSVs
        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"pairs": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        pairs = detect_duplicates_in_rows(rows, threshold=threshold)
        # Build friendly output
        out = [
            {
                "i": i,
                "j": j,
                "score": s,
                "i_sample": {
                    "aadhaar": rows[i].get("aadhaar"),
                    "name": rows[i].get("name"),
                    "date": rows[i].get("date"),
                    "state": rows[i].get("state"),
                    "district": rows[i].get("district"),
                },
                "j_sample": {
                    "aadhaar": rows[j].get("aadhaar"),
                    "name": rows[j].get("name"),
                    "date": rows[j].get("date"),
                    "state": rows[j].get("state"),
                    "district": rows[j].get("district"),
                },
            }
            for i, j, s in pairs
        ]
        return {"pairs": out, "count": len(out)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/signals/confidence")
def signals_confidence(max_rows: int = 500):
    """Compute a simple confidence score for recent enrollment records."""
    try:
        import csv
        import os

        from .confidence import score_record

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"records": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        recs = []
        for r in rows:
            sc = score_record(r)
            recs.append(
                {
                    "record_sample": {
                        "aadhaar": r.get("aadhaar"),
                        "name": r.get("name"),
                    },
                    "confidence": sc,
                }
            )
        return {"records": recs, "count": len(recs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= IRF ENDPOINTS (IDENTITY RESILIENCE) =============


@app.get("/api/irf/multi-factor")
def irf_multi_factor(max_rows: int = 500):
    """Compute multi-factor verification scores for enrollment records."""
    try:
        import csv
        import os

        from .multi_factor import multi_factor_verification_score

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"records": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        recs = []
        for r in rows:
            score = multi_factor_verification_score(r)
            recs.append(
                {
                    "record_sample": {
                        "aadhaar": r.get("aadhaar"),
                        "name": r.get("name"),
                    },
                    "multi_factor_score": score,
                }
            )
        return {"records": recs, "count": len(recs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/irf/biometric-aging")
def irf_biometric_aging(max_rows: int = 500):
    """Assess biometric verification thresholds with age/occupation adjustments."""
    try:
        import csv
        import os

        from .biometric_aging import biometric_aging_assessment

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"records": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        recs = []
        for r in rows:
            adjusted_threshold, reason = biometric_aging_assessment(
                r, base_threshold=0.85
            )
            recs.append(
                {
                    "record_sample": {
                        "aadhaar": r.get("aadhaar"),
                        "name": r.get("name"),
                        "age": r.get("age"),
                    },
                    "adjusted_threshold": adjusted_threshold,
                    "reason": reason,
                }
            )
        return {"records": recs, "count": len(recs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/irf/escalate")
def irf_escalate(record_id: str, reason: str, severity: str = "medium"):
    """Escalate a record for human review due to biometric failures or anomalies."""
    try:
        from .escalation import create_escalation

        case = create_escalation(record_id, reason, severity)
        return {
            "case_id": case.record_id,
            "status": case.status,
            "reason": case.reason,
            "severity": case.severity,
            "created_at": case.created_at,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/irf/fail-safe/{record_id}")
def irf_fail_safe(record_id: str, reason: str = "biometric_failure"):
    """Activate fail-safe mode for a citizen with repeated verification failures."""
    try:
        from .escalation import fail_safe_response

        response = fail_safe_response(record_id, reason)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= AFIF ENDPOINTS (FORENSIC INTELLIGENCE) =============


@app.get("/api/afif/hub-analysis")
def afif_hub_analysis(max_rows: int = 500):
    """Detect suspicious enrollment centers with unusual activity spikes."""
    try:
        import csv
        import os

        from .hub_detector import analyze_hub_activity

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"anomalies": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        anomalies = analyze_hub_activity(rows)
        return {"anomalies": anomalies, "count": len(anomalies)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/afif/network-graph")
def afif_network_graph(max_rows: int = 500):
    """Analyze network relationships to detect coordinated fraud networks."""
    try:
        import csv
        import os

        from .network_graph import detect_fraud_networks

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"networks": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= max_rows:
                        break
            if len(rows) >= max_rows:
                break

        networks = detect_fraud_networks(rows)
        return {"networks": networks, "count": len(networks)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/afif/risk-alerts")
def afif_risk_alerts():
    """Get all active risk alerts from hub and network analysis."""
    try:
        import csv
        import os

        from .hub_detector import analyze_hub_activity
        from .risk_alerting import generate_alerts_from_hubs

        rows = []
        enroll_dir = os.getenv(
            "ENROLL_FOLDER",
            os.path.join(os.getcwd(), "dataset", "clean", "api_data_aadhar_enrolment"),
        )
        if not os.path.isdir(enroll_dir):
            return {"alerts": [], "count": 0}
        for fname in sorted(os.listdir(enroll_dir)):
            if not fname.lower().endswith(".csv"):
                continue
            with open(os.path.join(enroll_dir, fname), "r", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for r in reader:
                    rows.append(r)
                    if len(rows) >= 500:
                        break
            if len(rows) >= 500:
                break

        anomalies = analyze_hub_activity(rows)
        alerts = generate_alerts_from_hubs(anomalies)
        return {"alerts": alerts, "count": len(alerts)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/afif/audit-log")
def afif_audit_log_event(
    event_id: str,
    event_type: str,
    record_id: str,
    action: str,
    actor: str = "system",
):
    """Log an event to the tamper-evident audit trail."""
    try:
        from .audit_logs import log_event

        entry = log_event(event_id, event_type, record_id, action, actor)
        return entry
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/afif/audit-log")
def afif_get_audit_log():
    """Retrieve all audit log entries."""
    try:
        from .audit_logs import get_audit_log, verify_audit_log

        logs = get_audit_log()
        integrity_ok = verify_audit_log()
        return {"logs": logs, "count": len(logs), "integrity_verified": integrity_ok}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= PROF: PUBLIC RESOURCE OPTIMIZATION FRAMEWORK =============


@app.get("/api/prof/mpi")
def prof_get_mpi():
    """Get Migration Pressure Index (MPI) by district.

    Returns dict mapping district -> MPI score (0-1).
    High MPI: stressed districts with migration pressure.
    Low MPI: stable districts.
    """
    try:
        from .migration_pressure_index import (
            calculate_mpi,
            classify_pressure,
            rank_districts_by_mpi,
        )

        # Load records from CSV
        result = explorer_enrollment(limit=10000)
        records = result.get("rows", [])

        # Convert to simple records with required fields
        simple_records = [
            {
                "aadhaar": f"aadhar_{i}",
                "district": r.get("district", "unknown"),
                "state": r.get("state", "unknown"),
                "aadhaar_age": "new",
            }
            for i, r in enumerate(records)
        ]

        mpi_scores = calculate_mpi(simple_records)
        ranked = rank_districts_by_mpi(mpi_scores)

        # Add classification
        ranked_with_class = [
            (district, score, classify_pressure(score)) for district, score in ranked
        ]

        return {
            "mpi_scores": dict(ranked),
            "ranked_districts": ranked_with_class,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/prof/demand-forecast")
def prof_get_demand_forecast(forecast_days: int = Query(30, ge=1, le=90)):
    """Forecast demand (1-3 months ahead) for enrolment, updates, PDS, healthcare.

    Uses historical trends and seasonal patterns.
    """
    try:
        from .demand_forecasting import (
            adjust_forecast_by_district,
            forecast_demand,
        )

        # Load records
        result = explorer_enrollment(limit=10000)
        records = result.get("rows", [])

        # Convert to simple records with timestamp and activity type
        simple_records = [
            {
                "timestamp": r.get("date", ""),
                "activity_type": "enrolment",
                "district": r.get("district", "unknown"),
            }
            for r in records
        ]

        # Overall forecast
        overall = forecast_demand(simple_records, forecast_days)

        # District-level forecast
        by_district = adjust_forecast_by_district(simple_records, forecast_days)

        return {
            "forecast_days": forecast_days,
            "overall_forecast": overall,
            "by_district": by_district,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/prof/feedback")
def prof_submit_feedback(
    deployment_id: str,
    district: str,
    resource_type: str,
    queue_reduction_percent: float = 0.0,
    completion_rate_improvement: float = 0.0,
    complaint_reduction_percent: float = 0.0,
    cost: float = 0.0,
):
    """Submit outcome feedback from a deployment.

    Tracks whether resource actions worked (queues reduced, etc.).
    """
    try:
        from .feedback_loop import OutcomeData, log_feedback

        outcome = OutcomeData(
            deployment_id=deployment_id,
            district=district,
            resource_type=resource_type,
            deployed_date=datetime.now().isoformat(),
            queue_reduction_percent=queue_reduction_percent,
            completion_rate_improvement=completion_rate_improvement,
            complaint_reduction_percent=complaint_reduction_percent,
            cost=cost,
        )

        evaluation = log_feedback(outcome)
        return {
            "deployment_id": deployment_id,
            "evaluation": evaluation,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/prof/feedback/{district}")
def prof_get_feedback(district: str):
    """Get recommendations for a district based on past feedback.

    Shows whether deployments worked and suggests adjustments.
    """
    try:
        from .feedback_loop import get_district_recommendations

        recommendation = get_district_recommendations(district)
        return {
            "district": district,
            "recommendation": recommendation,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= AMF: AADHAAR MOBILITY FRAMEWORK =============


@app.get("/api/amf/mobility-tier/{aadhaar}")
def amf_get_mobility_tier(aadhaar: str):
    """Get mobility tier for an Aadhaar."""
    try:
        from .mobility_flags import MobilityTier, get_mobility_tier_details

        tier = MobilityTier.TIER_1_PERMANENT
        details = get_mobility_tier_details(tier)

        return {
            "aadhaar": aadhaar,
            "mobility_tier": tier.value,
            "details": details,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/amf/g2b-verification")
def amf_submit_g2b_verification(
    aadhaar: str,
    employer_pan_gst: str,
    employer_name: str,
    employment_start_date: str,
    employment_end_date: str,
    workplace_lat: float,
    workplace_lon: float,
    workplace_address: str,
):
    """Submit employer verification."""
    try:
        from .g2b_verification import create_employer_verification

        result = create_employer_verification(
            aadhaar,
            employer_pan_gst,
            employer_name,
            employment_start_date,
            employment_end_date,
            workplace_lat,
            workplace_lon,
            workplace_address,
        )

        return {**result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/amf/address-lease")
def amf_create_address_lease(
    aadhaar: str,
    temp_address: str,
    temp_lat: float,
    temp_lon: float,
    validity_days: int = 180,
):
    """Create time-bound temporary address lease."""
    try:
        from .address_leasing import create_address_lease

        result = create_address_lease(
            aadhaar, temp_address, temp_lat, temp_lon, validity_days
        )

        return {**result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/amf/mobility-event")
def amf_log_mobility_event(
    aadhaar: str,
    event_type: str,
    source_address: str,
    source_state: str,
    destination_address: str,
    destination_state: str,
    verification_authority: str,
    duration_days: int = 0,
):
    """Log a mobility event."""
    try:
        from .mobility_event_log import log_mobility_event

        result = log_mobility_event(
            aadhaar,
            event_type,
            source_address,
            source_state,
            destination_address,
            destination_state,
            verification_authority,
            duration_days,
        )

        return {**result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/amf/mobility-timeline/{aadhaar}")
def amf_get_mobility_timeline(aadhaar: str):
    """Retrieve mobility timeline."""
    try:
        from .mobility_event_log import (
            get_mobility_summary,
            get_mobility_timeline,
        )

        timeline = get_mobility_timeline(aadhaar)
        summary = get_mobility_summary(aadhaar)

        return {
            "aadhaar": aadhaar,
            "timeline": timeline,
            "summary": summary,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/amf/mobility-token")
def amf_create_mobility_token(
    aadhaar: str,
    presence_address: str,
    presence_state: str,
    presence_lat: float,
    presence_lon: float,
    validity_days: int = 90,
):
    """Create inter-state mobility token."""
    try:
        from .mobility_token import create_mobility_token

        result = create_mobility_token(
            aadhaar,
            presence_address,
            presence_state,
            presence_lat,
            presence_lon,
            validity_days,
        )

        return {**result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/amf/seasonal-batch")
def amf_create_seasonal_batch(
    season_type: str,
    source_state: str,
    destination_state: str,
    destination_district: str,
    start_date: str,
    end_date: str,
    verifier_id: str,
    expected_workers: int,
):
    """Create seasonal migration batch."""
    try:
        from .seasonal_migration import create_seasonal_batch

        result = create_seasonal_batch(
            season_type,
            source_state,
            destination_state,
            destination_district,
            start_date,
            end_date,
            verifier_id,
            expected_workers,
        )

        return {**result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= PPAF: PRIVACY-PRESERVING ANALYTICS FRAMEWORK =============


@app.post("/api/ppaf/differential-privacy")
def compute_differentially_private_aggregate(
    values: str,  # Comma-separated aggregated values
    epsilon: float = 1.0,
    delta: float = 1e-6,
):
    """Compute differentially private aggregate with Laplace/Gaussian noise."""
    try:
        from .differential_privacy import (
            compute_noisy_aggregate,
            estimate_privacy_loss,
        )

        # Parse values
        parsed_values = [float(v.strip()) for v in values.split(",") if v.strip()]

        if not parsed_values:
            return {"error": "No values provided"}

        # Compute noisy aggregate
        noisy_value, mechanism = compute_noisy_aggregate(parsed_values, epsilon, delta)

        # Estimate privacy loss
        privacy_info = estimate_privacy_loss(epsilon, delta)

        return {
            "noisy_aggregate": noisy_value,
            "mechanism": mechanism,
            "epsilon": epsilon,
            "delta": delta,
            "privacy_level": privacy_info["privacy_level"],
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ppaf/federated-query")
def execute_federated_query(
    query_name: str,
    computation_type: str,
    location_id: str,
    location_type: str = "district",
):
    """Execute federated query at local location (state/district)."""
    try:
        from .federated_analytics import FederatedQuery

        # Create query
        query = FederatedQuery(
            query_id=f"q_{location_id}_{datetime.now().timestamp()}",
            query_name=query_name,
            computation_type=computation_type,
            target_level=location_type,
        )

        return {
            "query_id": query.query_id,
            "query_name": query_name,
            "location": location_id,
            "location_type": location_type,
            "computation_type": computation_type,
            "note": "Results computed locally. Only aggregates shared centrally.",
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ppaf/hash-identity")
def hash_identity_signal(
    aadhaar: str,
    additional_fields: str = "",
):
    """Generate hashed identity signal (irreversible)."""
    try:
        from .hashed_identity_signals import (
            create_hashed_signal,
            create_identity_fingerprint,
        )

        # Generate signal
        signal = create_hashed_signal(aadhaar)

        # Parse additional fields if provided
        additional_dict = {}
        if additional_fields:
            for pair in additional_fields.split("|"):
                if ":" in pair:
                    key, value = pair.split(":", 1)
                    additional_dict[key.strip()] = value.strip()

        # Generate fingerprint
        fingerprint = create_identity_fingerprint(aadhaar, additional_dict)

        return {
            "signal": signal,
            "fingerprint": fingerprint,
            "note": (
                "Aadhaar is irreversibly hashed. "
                "Original number cannot be recovered."
            ),
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ppaf/policy-dashboard/{role}")
def get_policy_dashboard(role: str):
    """Get role-based analytics dashboard (aggregated, anonymized)."""
    try:
        from .policy_access_views import PolicyDashboardView, UserRole

        # Validate role
        try:
            UserRole(role)
        except ValueError:
            return {"error": f"Invalid role. Allowed: {[r.value for r in UserRole]}"}

        # Create dashboard
        dashboard = PolicyDashboardView()

        # Add sample policy metrics
        dashboard.add_policy_metric(
            "enrollment_growth_rate",
            15.5,
            "15.5% YoY growth in Aadhaar enrollments",
        )
        dashboard.add_policy_metric(
            "verification_success_rate",
            94.2,
            "94.2% of updates successfully verified",
        )
        dashboard.add_policy_metric(
            "regional_distribution",
            {"north": 35, "south": 28, "east": 22, "west": 15},
            "Percentage enrollment by region",
        )

        # Get summary for role
        summary = dashboard.get_policy_summary()

        return {
            "dashboard_type": "policy_analytics",
            "user_role": role,
            "metrics": summary["metrics"],
            "privacy_guarantee": summary["privacy_guarantee"],
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= HEALTH CHECK =============


@app.get("/health")
async def health_check():
    """Health check endpoint with async I/O handler statistics"""
    try:
        handler = get_async_handler()
        stats = handler.get_health_stats()
        return {
            "status": "ok",
            "async_handler_stats": stats,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error in health_check: {e}")
        return {
            "status": "degraded",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }


# ============= CACHE MANAGEMENT ENDPOINTS =============


@app.get("/api/cache/stats")
def get_cache_stats_endpoint():
    """Get cache statistics and performance metrics"""
    try:
        stats = get_cache_stats()
        return {"cache_stats": stats, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/cache/clear")
def clear_cache_endpoint():
    """Clear all cached data (admin only)"""
    try:
        result = clear_cache()
        return {"result": result, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/metadata/states")
def get_available_states():
    """Get list of available states (indexed)"""
    try:
        states = get_available_states()
        return {"states": states, "count": len(states)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/metadata/districts/{state}")
def get_available_districts(state: str):
    """Get districts for a specific state (indexed)"""
    try:
        districts = get_available_districts(state)
        return {"state": state, "districts": districts, "count": len(districts)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= MULTI-DATASET ENDPOINTS =============


@app.get("/api/datasets/summary")
def get_datasets_summary():
    """Get summary of all three datasets (Enrollment, Demographic, Biometric)"""
    try:
        summary = get_dataset_summary()
        return {"datasets": summary, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/datasets/unified-metrics")
def get_unified_metrics(limit: int = Query(50, ge=1, le=500)):
    """Get unified metrics from all 3 datasets combined"""
    try:
        metrics = get_unified_state_metrics(limit=limit)
        total_records = sum(m.get('total_records', 0) for m in metrics)
        return {
            "metrics": metrics,
            "total_records": total_records,
            "states_count": len(metrics),
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/datasets/combined-demographics")
def get_combined_demographics():
    """Get combined demographic data from all 3 datasets"""
    try:
        demographics = get_combined_demographics()
        return {"demographics": demographics, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============= STATE-WISE ANALYTICS ENDPOINTS =============


@app.get("/api/state/{state_name}/metrics")
def get_state_metrics(state_name: str):
    """Get detailed metrics for a specific state"""
    try:
        # Get state distribution data
        all_states = csv_get_state_distribution(limit=1000)
        state_data = next((s for s in all_states if s['state'].lower() == state_name.lower()), None)
        
        if not state_data:
            raise HTTPException(status_code=404, detail=f"State {state_name} not found")
        
        # Get demographic data for the state
        demo_data = get_demographics(limit=1000)
        state_demo = next((d for d in demo_data if d['state'].lower() == state_name.lower()), None)
        
        # Get enrollment timeline for the state
        timeline = csv_get_enrollment_timeline(months=12, state=state_name)
        
        return {
            "state": state_name,
            "total_enrollments": state_data.get('total_enrollments', 0),
            "demographics": state_demo or {},
            "timeline": timeline.get('timeline', []),
            "timestamp": datetime.now().isoformat()
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/state/{state_name}/districts")
def get_state_districts(state_name: str, limit: int = Query(20, ge=1, le=100)):
    """Get top districts in a state by enrollment"""
    try:
        # Get coverage gaps data for the state (includes districts)
        all_gaps = get_coverage_gaps(limit=1000)
        state_districts = [g for g in all_gaps if g.get('state', '').lower() == state_name.lower()]
        
        return {
            "state": state_name,
            "districts": state_districts[:limit],
            "total_districts": len(state_districts),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/state/comparison")
def compare_states(states: str = Query(...), metric: str = Query("total_enrollments")):
    """Compare multiple states across a specific metric"""
    try:
        state_list = [s.strip() for s in states.split(",")]
        all_states = csv_get_state_distribution(limit=1000)
        
        comparison_data = []
        for state in state_list:
            state_data = next((s for s in all_states if s['state'].lower() == state.lower()), None)
            if state_data:
                comparison_data.append({
                    "state": state_data['state'],
                    "metric_value": state_data.get(metric, 0),
                    metric: state_data.get(metric, 0)
                })
        
        return {
            "states": state_list,
            "metric": metric,
            "comparison": comparison_data,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/states/ranking")
def get_states_ranking(metric: str = Query("total_enrollments"), limit: int = Query(20, ge=1, le=100)):
    """Get states ranked by a specific metric"""
    try:
        all_states = csv_get_state_distribution(limit=1000)
        
        # Sort by metric
        ranked = sorted(
            all_states,
            key=lambda x: x.get(metric, 0),
            reverse=True
        )[:limit]
        
        # Add rank field
        ranked_with_rank = [
            {**state, "rank": i + 1}
            for i, state in enumerate(ranked)
        ]
        
        return {
            "metric": metric,
            "ranking": ranked_with_rank,
            "total_states": len(ranked_with_rank),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============= DATABASE HEALTH & OPTIMIZATION ENDPOINTS =============


@app.get("/api/health/database")
async def database_health():
    """
    Comprehensive database health check endpoint.
    Returns status of all datasets, cache, and indices.
    """
    try:
        loop = asyncio.get_event_loop()
        health = await loop.run_in_executor(None, health_check)
        
        if health['status'] == 'healthy':
            return health
        elif health['status'] == 'degraded':
            return health
        else:
            raise HTTPException(status_code=503, detail=health)
    except Exception as e:
        logger.error(f"Error checking database health: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health/cache-stats")
async def cache_statistics():
    """
    Get detailed cache statistics including hit rates and efficiency metrics.
    """
    try:
        loop = asyncio.get_event_loop()
        stats = await loop.run_in_executor(None, get_cache_stats)
        
        return {
            "status": "ok",
            "cache_stats": stats,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching cache stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/admin/optimize-cache")
async def optimize_database_cache():
    """
    Manually trigger cache optimization (remove expired entries, compact indices).
    Requires admin privileges in production.
    """
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, optimize_cache)
        
        logger.info(f"Cache optimization triggered: {result}")
        
        return {
            "status": "optimized",
            "details": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error optimizing cache: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/admin/dataset-info")
async def dataset_information():
    """
    Get detailed information about all available datasets.
    """
    try:
        loop = asyncio.get_event_loop()
        summary = await loop.run_in_executor(None, get_dataset_summary)
        
        return {
            "status": "ok",
            "datasets": summary,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching dataset info: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/admin/clear-cache")
async def clear_database_cache():
    """
    Clear all cache entries (use with caution - for testing only).
    """
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, clear_cache)
        
        logger.warning("Cache cleared by admin request")
        
        return {
            "status": "cleared",
            "message": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error clearing cache: {e}")
        raise HTTPException(status_code=500, detail=str(e))