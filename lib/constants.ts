export const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview',
  DASHBOARD: '/dashboard',
  DATA_EXPLORER: '/data-explorer',
  ANALYTICS: '/analytics',
  POLICY: '/policy',
  MOBILITY: '/mobility',
  INFOGRAPHIC: '/infographic',
  STATE_ANALYTICS: '/state-analytics',
  ANOMALIES: '/anomalies',
  DOCS: '/docs',
} as const

export const API_ENDPOINTS = {
  HEALTH: '/api/status',
  NATIONAL_OVERVIEW: '/api/national-overview',
  ENROLLMENT_TIMELINE: '/api/enrollment-timeline',
  STATE_DISTRIBUTION: '/api/state-distribution',
  DEMOGRAPHIC_DISTRIBUTION: '/api/demographic-distribution',
  EXPLORER_ENROLLMENT: '/api/explorer/enrollment',
  ANALYTICS_ANOMALIES: '/api/analytics/anomalies',
  MOBILITY_PATTERNS: '/api/mobility/migration-patterns',
  POLICY_RECOMMENDATIONS: '/api/policy/recommendations',
} as const

export const FRAMEWORKS = [
  {
    code: 'ADIF',
    name: 'Data Integrity',
    description: 'Automatic data normalization & duplicate detection',
  },
  {
    code: 'IRF',
    name: 'Identity Resilience',
    description: 'Biometric aging assessment & escalation',
  },
  {
    code: 'AFIF',
    name: 'Forensic Intelligence',
    description: 'Fraud pattern & hub detection',
  },
  {
    code: 'PROF',
    name: 'Resource Optimization',
    description: 'Demand forecasting & migration analysis',
  },
  {
    code: 'AMF',
    name: 'Mobility Framework',
    description: 'Cross-state tracking & verification',
  },
  {
    code: 'PPAF',
    name: 'Privacy Analytics',
    description: 'Differential privacy & federated queries',
  },
] as const

export const STATS = [
  {
    value: '6M+',
    label: 'Total Records',
    description: 'Analyzed enrollment records',
  },
  {
    value: '28',
    label: 'States Covered',
    description: 'National coverage',
  },
  {
    value: '98%',
    label: 'Accuracy Rate',
    description: 'Detection accuracy',
  },
  {
    value: '40+',
    label: 'API Endpoints',
    description: 'RESTful services',
  },
] as const
