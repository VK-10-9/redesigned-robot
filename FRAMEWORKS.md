# Framework Documentation

## 6 Integrated Intelligence Frameworks

This document provides detailed information about each framework in the Vidyut platform.

---

## 1. ADIF: Aadhaar Data Integrity Framework

### Purpose
Ensure data quality, detect duplicates, and verify multi-factor consistency across enrollment records.

### Modules
- **adif_normalizer.py** - Data standardization
- **multi_factor.py** - Verification scoring
- **biometric_aging.py** - Biometric consistency

### Key Functions

#### `normalize_record(record: dict) -> dict`
Standardizes enrollment data format and content.

**Inputs**:
- First/last name
- Date of birth
- Address information
- Biometric data

**Processing**:
- Name normalization (case, spacing, special chars)
- Date format standardization
- Address parsing and geocoding
- Null/missing value handling

**Output**:
```json
{
  "normalized_first_name": "string",
  "normalized_last_name": "string",
  "normalized_dob": "YYYY-MM-DD",
  "normalized_address": "string",
  "quality_score": 0.0-1.0
}
```

#### `multi_factor_verification_score(record: dict) -> float`
Computes multi-factor verification score.

**Factors**:
- Age consistency (enrollment age vs biometric age)
- Biometric quality (clarity, completeness)
- Address validity (format, geocoding match)
- Name consistency (variation detection)

**Scoring**:
- 0.0-0.25: Low confidence (requires escalation)
- 0.25-0.50: Medium confidence (manual review)
- 0.50-0.75: High confidence (proceed)
- 0.75-1.0: Very high confidence (auto-approve)

#### `biometric_aging_assessment(current_age: int, biometric_age: int) -> dict`
Assesses if biometric data matches reported age.

**Returns**:
```json
{
  "age_differential": 0,
  "is_consistent": true,
  "confidence": 0.95,
  "risk_level": "low",
  "recommendation": "approve"
}
```

### Use Cases
- New enrollment validation
- Duplicate detection
- Record quality assurance
- Risk scoring

### API Endpoints
```
GET /api/signals/duplicates?limit=50
POST /api/signals/confidence/{record_id}
GET /api/signals/statistics
```

---

## 2. IRF: Identity Resilience Framework

### Purpose
Manage verification failures, escalation workflows, and fail-safe mechanisms for resilient identity verification.

### Modules
- **escalation.py** - Escalation management
- **audit_logs.py** - Event tracking

### Key Functions

#### `create_escalation(record_id: str, reason: str, severity: str) -> dict`
Creates an escalation ticket for manual review.

**Parameters**:
- `record_id`: Unique record identifier
- `reason`: Escalation reason (e.g., "biometric_mismatch")
- `severity`: "low", "medium", "high", "critical"

**Process**:
1. Create escalation ticket
2. Assign to appropriate reviewer
3. Set SLA based on severity
4. Log event to audit trail

**Output**:
```json
{
  "escalation_id": "ESC-2025-001234",
  "status": "open",
  "severity": "high",
  "assigned_to": "reviewer_id",
  "created_at": "2025-01-16T10:30:45Z",
  "sla_hours": 4
}
```

#### `fail_safe_response(record_id: str, escalation_id: str) -> dict`
Determines fail-safe action when verification cannot proceed.

**Options**:
- `hold`: Temporarily hold the record
- `request_additional_docs`: Ask for documents
- `escalate_human`: Manual review
- `reject`: Reject enrollment

**Output**:
```json
{
  "action": "escalate_human",
  "message": "Requires manual biometric review",
  "next_steps": [
    "Contact applicant",
    "Schedule biometric collection",
    "Reassess data"
  ]
}
```

#### `log_event(escalation_id: str, event: str, details: dict) -> None`
Logs all events for audit trail and compliance.

**Event Types**:
- `created`: Escalation created
- `assigned`: Assigned to reviewer
- `reviewed`: Manual review completed
- `resolved`: Escalation closed
- `escalated`: Further escalated

### Use Cases
- Verification failures
- Biometric mismatches
- Address verification issues
- Manual review workflows
- Compliance auditing

### API Endpoints
```
POST /api/irf/multi-factor
POST /api/irf/biometric-aging
POST /api/irf/escalate
GET /api/irf/escalations?status=open
GET /api/irf/audit-log/{record_id}
```

---

## 3. AFIF: Aadhaar Forensic Intelligence Framework

### Purpose
Detect fraud patterns, identify enrollment hubs, and analyze networks for suspicious activity.

### Modules
- **hub_detector.py** - Cluster analysis
- **network_graph.py** - Network relationships
- **risk_alerting.py** - Alert generation
- **anomaly_detector.py** - Outlier detection

### Key Functions

#### `analyze_hub_activity(state: str, limit: int = 100) -> list[dict]`
Detects high-activity enrollment locations (potential hubs).

**Analysis**:
- Enrollment volume by location/address
- Temporal patterns (peaks/valleys)
- Demographic abnormalities
- Velocity checks (enrollments per time)

**Output**:
```json
[
  {
    "hub_id": "HUB-001",
    "location": "Bangalore, KA",
    "enrollments": 5000,
    "anomaly_score": 0.92,
    "risk_level": "high",
    "patterns": [
      "Unusual time clustering",
      "Address overlap",
      "Demographic abnormality"
    ]
  }
]
```

**Risk Levels**:
- **low** (0.0-0.3): Normal variation
- **medium** (0.3-0.6): Requires monitoring
- **high** (0.6-0.85): Investigation recommended
- **critical** (0.85-1.0): Immediate action needed

#### `detect_fraud_networks(state: str) -> dict`
Analyzes networks of related identities for fraud.

**Relationships**:
- Shared address
- Shared biometric features
- Shared contact information
- Temporal proximity

**Output**:
```json
{
  "networks": [
    {
      "network_id": "NET-001",
      "members": ["id1", "id2", "id3"],
      "connection_strength": 0.95,
      "fraud_probability": 0.88,
      "recommendation": "flag_all"
    }
  ]
}
```

#### `generate_alerts_from_hubs(hub_analysis: list) -> list[dict]`
Creates actionable alerts from hub analysis.

**Alert Types**:
- Enrollment spike
- Duplicate address
- Biometric anomaly
- Network cluster
- Velocity violation

**Output**:
```json
[
  {
    "alert_id": "ALERT-001",
    "type": "enrollment_spike",
    "severity": "high",
    "affected_records": 50,
    "recommended_action": "review",
    "created_at": "2025-01-16T10:30:45Z"
  }
]
```

### Use Cases
- Fraud detection
- Ring identification
- Anomaly detection
- Risk alerting
- Investigation support

### API Endpoints
```
GET /api/afif/hub-analysis?state={state}&limit=100
GET /api/afif/network-graph?state={state}
GET /api/afif/risk-alerts?severity=high
GET /api/afif/anomalies
```

---

## 4. PROF: Public Resource Optimization Framework

### Purpose
Optimize resource allocation through migration analysis, demand forecasting, and outcome feedback.

### Modules
- **migration_pressure_index.py** - Migration metrics
- **demand_forecasting.py** - Predictions
- **feedback_loop.py** - Outcome tracking

### Key Functions

#### `calculate_mpi(state: str, district: str = None) -> dict`
Computes Migration Pressure Index.

**Factors**:
- Enrollment velocity (month-over-month change)
- Geographic concentration
- Age demographic shifts
- Seasonal patterns

**Output**:
```json
{
  "mpi_score": 0.75,
  "interpretation": "High migration pressure",
  "primary_drivers": [
    "Age 18-35 concentration",
    "Seasonal spike pattern",
    "Urban enrollment growth"
  ],
  "forecast": "Expected 30% increase next quarter"
}
```

**MPI Scale**:
- 0.0-0.25: Low pressure
- 0.25-0.50: Moderate pressure
- 0.50-0.75: High pressure
- 0.75-1.0: Very high pressure

#### `forecast_demand(state: str, months: int = 12) -> dict`
Forecasts enrollment demand.

**Methods**:
- Time series analysis
- Seasonal decomposition
- Trend extrapolation
- External factors (holidays, campaigns)

**Output**:
```json
{
  "forecasts": [
    {
      "month": "2025-02",
      "predicted_enrollments": 15000,
      "confidence_interval": [14000, 16500],
      "confidence": 0.92
    }
  ],
  "seasonal_pattern": "high_before_holidays",
  "growth_trend": 0.05
}
```

#### `get_district_recommendations(state: str) -> list[dict]`
Provides resource allocation recommendations.

**Output**:
```json
[
  {
    "district": "Bangalore",
    "recommended_centers": 5,
    "expected_volume": 20000,
    "staffing_level": "high",
    "priority": 1
  }
]
```

### Use Cases
- Resource planning
- Capacity forecasting
- Staff allocation
- Budget optimization
- Performance tracking

### API Endpoints
```
GET /api/prof/mpi?state={state}&district={district}
GET /api/prof/demand-forecast?state={state}&months=12
GET /api/prof/recommendations?state={state}
POST /api/prof/feedback
```

---

## 5. AMF: Aadhaar Mobility Framework

### Purpose
Track user mobility, manage multi-address scenarios, and handle cross-state verification.

### Modules (12)
1. **mobility_flags.py** - Tier classification
2. **g2b_verification.py** - Government verification
3. **address_leasing.py** - Temporary address handling
4. **mobility_event_log.py** - Event tracking
5. **mobility_risk_score.py** - Risk assessment
6. **expiry_alerts.py** - Expiration tracking
7. **mobility_token.py** - Token generation
8. **seasonal_migration.py** - Migration patterns
9. **cross_state_lock.py** - State boundaries
10. **geo_fencing.py** - Geographic constraints
11. **ngo_verification.py** - NGO partnership
12. **dual_address.py** - Multiple addresses

### Key Concepts

#### MobilityTier (Enum)
```python
class MobilityTier:
    STATIONARY = 0      # No movement
    LOCAL = 1          # Within district
    REGIONAL = 2       # Within state
    NATIONAL = 3       # Cross-state
    INTERNATIONAL = 4  # Cross-border
```

#### Mobility Score
Combines multiple factors:
```json
{
  "mobility_tier": "national",
  "mobility_score": 0.85,
  "address_stability": 0.60,
  "employment_stability": 0.90,
  "risk_level": "medium",
  "recommendation": "enhanced_verification"
}
```

### Key Functions

#### `get_mobility_tier(aadhaar: str) -> dict`
Determines user mobility classification.

**Output**:
```json
{
  "tier": "national",
  "justification": [
    "5 address changes in 12 months",
    "3 different states"
  ],
  "addresses": ["home", "work", "seasonal"],
  "verification_level": "enhanced"
}
```

#### `log_mobility_event(aadhaar: str, event_type: str, details: dict) -> None`
Tracks all mobility-related events.

**Event Types**:
- `address_change`: Address updated
- `state_change`: Crossed state boundary
- `verification_attempt`: Verification performed
- `address_expired`: Address no longer valid

#### `score_mobility_risk(aadhaar: str) -> dict`
Assesses risk based on mobility patterns.

**Risk Factors**:
- Frequency of changes
- Distance between addresses
- Employment stability
- Document consistency

**Output**:
```json
{
  "risk_score": 0.65,
  "risk_level": "medium",
  "factors": [
    "Frequent address changes",
    "High geographic spread"
  ],
  "recommendations": [
    "Periodic re-verification",
    "Enhanced authentication"
  ]
}
```

### Use Cases
- User mobility tracking
- Address verification
- Cross-state operations
- Temporary address handling
- Risk assessment

### API Endpoints
```
GET /api/amf/mobility-tier?aadhaar={id}
GET /api/amf/mobility-timeline?aadhaar={id}
POST /api/amf/address-lease
GET /api/amf/mobility-events?aadhaar={id}
GET /api/amf/mobility-risk?aadhaar={id}
POST /api/amf/cross-state-lock
```

---

## 6. PPAF: Privacy-Preserving Analytics Framework

### Purpose
Execute analytics while preserving user privacy through differential privacy, federated execution, and identity hashing.

### Modules
- **differential_privacy.py** - Privacy mechanisms
- **federated_analytics.py** - Decentralized execution
- **hashed_identity_signals.py** - Identity protection
- **policy_access_views.py** - Role-based access

### Key Concepts

#### Differential Privacy
Adds statistical noise to query results to prevent individual identification.

**Mechanisms**:
- **Laplace Mechanism**: `noise = Laplace(0, sensitivity/epsilon)`
- **Gaussian Mechanism**: `noise = Normal(0, sensitivity²/epsilon)`

**Privacy Budget**:
```json
{
  "epsilon": 0.5,
  "delta": 1e-5,
  "interpretation": "Very strong privacy (ε=0.5)"
}
```

**Epsilon Thresholds**:
- ε ≤ 0.5: Very strong privacy
- 0.5 < ε ≤ 1.0: Strong privacy
- 1.0 < ε ≤ 2.0: Moderate privacy
- ε > 2.0: Weak privacy (use caution)

#### Role-Based Access Control
5 user roles with 4 data classifications:

**Roles**:
1. **public** - Public datasets only
2. **researcher** - Aggregated data
3. **operator** - Operational data
4. **admin** - Full access (with audit)
5. **auditor** - Audit logs only

**Data Classifications**:
1. **open** - Public (no privacy needed)
2. **aggregate** - Group-level only
3. **limited** - Specific use cases
4. **restricted** - High sensitivity

### Key Functions

#### `apply_differential_privacy(query_result: dict, sensitivity: float, epsilon: float) -> dict`
Adds privacy noise to query results.

**Parameters**:
- `query_result`: Original query output
- `sensitivity`: Maximum change from one record
- `epsilon`: Privacy budget

**Output**:
```json
{
  "original_count": 10000,
  "noisy_count": 9998,
  "noise_added": -2,
  "privacy_epsilon": 0.5,
  "differential_privacy_guaranteed": true
}
```

#### `execute_federated_query(query: str, participants: list[str]) -> dict`
Executes query across multiple parties without sharing raw data.

**Process**:
1. Each participant executes locally
2. Results aggregated peer-to-peer
3. No central server sees raw data
4. Cryptographic verification

**Output**:
```json
{
  "query_id": "FQ-001",
  "participants": 3,
  "aggregated_result": 150000,
  "computation_time_ms": 245,
  "privacy_assured": true
}
```

#### `hash_identity(aadhaar: str, salt: str = None) -> str`
Creates irreversible identity hash.

**Features**:
- SHA256 hashing
- Salt-based (prevents rainbow tables)
- Deterministic (same input → same hash)
- One-way (cannot reverse)

**Output**:
```
Hash: a3f9b2c1d4e7f8g9h0i1j2k3l4m5n6o7
(irreversible, but consistent)
```

#### `get_user_access_views(user_role: str) -> dict`
Returns data views user is authorized to see.

**Output**:
```json
{
  "role": "researcher",
  "authorized_datasets": [
    "aggregate_enrollments",
    "aggregate_demographics",
    "published_research_data"
  ],
  "query_limits": {
    "max_rows": 100000,
    "max_queries_per_hour": 100,
    "min_group_size": 100
  }
}
```

### Use Cases
- Privacy-compliant analytics
- Research data sharing
- Multi-party computation
- Data minimization
- GDPR/CCPA compliance

### API Endpoints
```
POST /api/ppaf/differential-privacy
POST /api/ppaf/federated-query
POST /api/ppaf/hash-identity
GET /api/ppaf/policy-dashboard
GET /api/ppaf/access-views?role={role}
```

---

## Framework Integration

### Data Flow
```
CSV Data
    ↓
[ADIF] → Normalize & Deduplicate
    ↓
[IRF] → Verify & Escalate
    ↓
[AFIF] → Detect Anomalies
    ↓
[PROF] → Optimize Resources
    ↓
[AMF] → Track Mobility
    ↓
[PPAF] → Privacy-Preserving Analytics
    ↓
API Response
```

### Cross-Framework Communication
Frameworks exchange data through:
- Shared data structures
- Event logs
- Cache layer
- API contracts

---

## Performance Considerations

### Query Optimization
- Use indices for state/district filters
- Leverage cache for repeated queries
- Batch operations when possible
- Limit result sets with pagination

### Scaling
- CSV layer scales to 10M+ records
- Cache layer handles 1000s of QPS
- Federated execution is network-bound
- Privacy mechanisms add minimal overhead

---

**Last Updated**: January 16, 2026
