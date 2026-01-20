"""
Core Frameworks for Aadhaar Intelligence Platform

Modules:
- ADIF: Aadhaar Data Integrity Framework
- IRF: Identity Resilience Framework
- AFIF: Aadhaar Forensic Intelligence Framework
- PROF: Public Resource Optimization Framework
- AMF: Aadhaar Mobility Framework
- PPAF: Privacy-Preserving Analytics Framework
"""

from backend.adif_normalizer import *
from backend.multi_factor import *
from backend.biometric_aging import *
from backend.hub_detector import *
from backend.network_graph import *
from backend.migration_pressure_index import *
from backend.demand_forecasting import *
from backend.feedback_loop import *
from backend.mobility_flags import *
from backend.g2b_verification import *
from backend.address_leasing import *
from backend.mobility_event_log import *
from backend.mobility_risk_score import *
from backend.expiry_alerts import *
from backend.mobility_token import *
from backend.differential_privacy import *
from backend.federated_analytics import *
from backend.hashed_identity_signals import *
from backend.policy_access_views import *

__all__ = [
    "ADIF",
    "IRF",
    "AFIF",
    "PROF",
    "AMF",
    "PPAF",
]
