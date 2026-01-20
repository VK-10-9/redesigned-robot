"""
Aadhaar Intelligence Platform Backend

Complete framework with 6 core components:

1. ADIF (Aadhaar Data Integrity Framework)
   - Data normalization and duplicate detection
   - Multi-factor verification
   - Biometric aging assessment

2. IRF (Identity Resilience Framework)
   - Identity verification and escalation
   - Fail-safe mechanisms
   - Audit trail management

3. AFIF (Aadhaar Forensic Intelligence Framework)
   - Hub detection and anomaly analysis
   - Network graph analysis for fraud detection
   - Risk alerting system

4. PROF (Public Resource Optimization Framework)
   - Migration pressure indexing
   - Demand forecasting
   - Outcome feedback and recommendations

5. AMF (Aadhaar Mobility Framework)
   - Mobility tier classification
   - Employer verification
   - Address leasing
   - Mobility event logging
   - Mobility risk scoring
   - Token management
   - Seasonal migration tracking

6. PPAF (Privacy-Preserving Analytics Framework)
   - Differential privacy mechanisms
   - Federated analytics
   - Identity hashing and deduplication
   - Role-based access control

Package structure:
- frameworks/: Core framework implementations
- utils/: Utility functions and data access
- analytics/: Analytics and alerting
- security/: Security and audit mechanisms
"""

__version__ = "2.0.0"
__author__ = "Aadhaar Intelligence Team"

from backend.main import app

__all__ = ["app"]
