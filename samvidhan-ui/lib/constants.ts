export const ROUTES = {
  HOME: '/',
  OVERVIEW: '/overview',
  DASHBOARD: '/dashboard',
  DATA_EXPLORER: '/data-explorer',
  ANALYTICS: '/analytics',
  POLICY: '/policy',
  MOBILITY: '/mobility',
  INFOGRAPHIC: '/infographic',
  NATIONAL_OVERVIEW: '/national-overview',
  NEX10: '/nex10',
  DOCS: '/docs',
  BLOG: '/blog',
  FAQS: '/faqs',
  EVENTS: '/events',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
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

export const FRAMEWORKS = {
  ADIF: {
    name: 'Data Integrity',
    code: 'ADIF',
    description: 'Automatic data normalization & duplicate detection',
  },
  IRF: {
    name: 'Identity Resilience',
    code: 'IRF',
    description: 'Biometric aging assessment & escalation',
  },
  AFIF: {
    name: 'Forensic Intelligence',
    code: 'AFIF',
    description: 'Fraud pattern & hub detection',
  },
  PROF: {
    name: 'Resource Optimization',
    code: 'PROF',
    description: 'Demand forecasting & migration analysis',
  },
  AMF: {
    name: 'Mobility Framework',
    code: 'AMF',
    description: 'Cross-state tracking & verification',
  },
  PPAF: {
    name: 'Privacy Analytics',
    code: 'PPAF',
    description: 'Differential privacy & federated queries',
  },
} as const

export const STATS = [
  {
    label: 'Total Records',
    value: '6M+',
    description: 'Analyzed enrollment records',
  },
  {
    label: 'States Covered',
    value: '28',
    description: 'National coverage',
  },
  {
    label: 'Accuracy Rate',
    value: '98%',
    description: 'Detection accuracy',
  },
  {
    label: 'API Endpoints',
    value: '40+',
    description: 'RESTful services',
  },
] as const
