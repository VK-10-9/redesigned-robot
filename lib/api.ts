const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"

export interface EnrollmentData {
  date: string
  enrollments: number
  state?: string
  district?: string
}

export interface StateMetrics {
  state: string
  total_enrollments: number
  coverage?: number
}

export interface AnomalyData {
  id: string
  type: string
  severity: string
  description: string
  timestamp: string
  state?: string
}

// National Overview
export async function getNationalOverview() {
  const res = await fetch(`${API_BASE}/api/national-overview`)
  if (!res.ok) throw new Error("Failed to fetch national overview")
  return res.json()
}

// Enrollment Data
export async function getEnrollmentTimeline(months: number = 12) {
  const res = await fetch(`${API_BASE}/api/enrollment-timeline?months=${months}`)
  if (!res.ok) throw new Error("Failed to fetch enrollment timeline")
  return res.json()
}

export async function getEnrollmentData(limit: number = 100) {
  const res = await fetch(`${API_BASE}/api/explorer/enrollment?limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch enrollment data")
  return res.json()
}

export async function getExplorerEnrollment(params: { 
  page: number; 
  limit: number;
  search?: string;
  state?: string;
  sort?: string;
  order?: string;
}) {
  const { page, limit, search, state, sort, order } = params
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    if (search) query.append('search', search)
    if (state) query.append('state', state)
    if (sort) query.append('sort', sort)
    if (order) query.append('order', order)

    const url = `/api/explorer?${query.toString()}`
    console.log(`Making API call to: ${url}`)
    const res = await fetch(url)
    console.log('API response status:', res.status, res.statusText)
    if (!res.ok) {
      const errorText = await res.text()
      console.error('API error response:', errorText)
      throw new Error(`Failed to fetch enrollment data: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    console.log('API data received:', data)
    return data
  } catch (error) {
    console.error('Fetch error in getExplorerEnrollment:', error)
    throw error
  }
}

export async function getExplorerStates() {
  try {
    const url = `/api/explorer/states`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch states: ${res.status} ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.error('Fetch error in getExplorerStates:', error)
    throw error
  }
}

// State Data
export async function getStateDistribution() {
  const res = await fetch(`${API_BASE}/api/mobility/state-distribution`)
  if (!res.ok) throw new Error("Failed to fetch state distribution")
  return res.json()
}

export async function getStateMetrics(state: string) {
  const res = await fetch(`${API_BASE}/api/mobility/state-metrics?state=${encodeURIComponent(state)}`)
  if (!res.ok) throw new Error("Failed to fetch state metrics")
  return res.json()
}

export async function getAvailableStates() {
  const res = await fetch(`${API_BASE}/api/metadata/states`)
  if (!res.ok) throw new Error("Failed to fetch states")
  return res.json()
}

export async function getAvailableDistricts(state: string) {
  const res = await fetch(`${API_BASE}/api/metadata/districts/${encodeURIComponent(state)}`)
  if (!res.ok) throw new Error("Failed to fetch districts")
  return res.json()
}

// Demographics
export async function getDemographicDistribution() {
  const res = await fetch(`${API_BASE}/api/mobility/demographic-distribution`)
  if (!res.ok) throw new Error("Failed to fetch demographic distribution")
  return res.json()
}

export async function getDemographics(limit: number = 100) {
  const res = await fetch(`${API_BASE}/api/explorer/demographics?limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch demographics")
  return res.json()
}

// Anomalies
export async function getAnomalies(params?: {
  state_id?: number
  severity?: string
  limit?: number
}) {
  const query = new URLSearchParams()
  if (params?.state_id) query.append("state_id", params.state_id.toString())
  if (params?.severity) query.append("severity", params.severity)
  if (params?.limit) query.append("limit", params.limit.toString())
  
  const res = await fetch(`${API_BASE}/api/anomalies/list?${query}`)
  if (!res.ok) throw new Error("Failed to fetch anomalies")
  return res.json()
}

// ADIF - Data Integrity
export async function getDuplicates(limit: number = 50) {
  const res = await fetch(`${API_BASE}/api/signals/duplicates?limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch duplicates")
  return res.json()
}

export async function getConfidenceScore(recordId: string) {
  const res = await fetch(`${API_BASE}/api/signals/confidence/${recordId}`)
  if (!res.ok) throw new Error("Failed to fetch confidence score")
  return res.json()
}

// AFIF - Forensic Intelligence
export async function getHubAnalysis(state?: string) {
  const query = state ? `?state=${encodeURIComponent(state)}` : ""
  const res = await fetch(`${API_BASE}/api/afif/hub-analysis${query}`)
  if (!res.ok) throw new Error("Failed to fetch hub analysis")
  return res.json()
}

export async function getNetworkGraph() {
  const res = await fetch(`${API_BASE}/api/afif/network-graph`)
  if (!res.ok) throw new Error("Failed to fetch network graph")
  return res.json()
}

export async function getRiskAlerts() {
  const res = await fetch(`${API_BASE}/api/afif/risk-alerts`)
  if (!res.ok) throw new Error("Failed to fetch risk alerts")
  return res.json()
}

// PROF - Resource Optimization
export async function getMigrationPressureIndex(state: string) {
  const res = await fetch(`${API_BASE}/api/prof/mpi?state=${encodeURIComponent(state)}`)
  if (!res.ok) throw new Error("Failed to fetch MPI")
  return res.json()
}

export async function getDemandForecast(state: string, months: number = 12) {
  const res = await fetch(`${API_BASE}/api/prof/demand-forecast?state=${encodeURIComponent(state)}&months=${months}`)
  if (!res.ok) throw new Error("Failed to fetch demand forecast")
  return res.json()
}

// AMF - Mobility Framework
export async function getMobilityTier(aadhaar: string) {
  const res = await fetch(`${API_BASE}/api/amf/mobility-tier?aadhaar=${aadhaar}`)
  if (!res.ok) throw new Error("Failed to fetch mobility tier")
  return res.json()
}

export async function getMobilityTimeline(aadhaar: string) {
  const res = await fetch(`${API_BASE}/api/amf/mobility-timeline?aadhaar=${aadhaar}`)
  if (!res.ok) throw new Error("Failed to fetch mobility timeline")
  return res.json()
}

// PPAF - Privacy-Preserving Analytics
export async function applyDifferentialPrivacy(data: any, epsilon: number = 1.0) {
  const res = await fetch(`${API_BASE}/api/ppaf/differential-privacy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, epsilon }),
  })
  if (!res.ok) throw new Error("Failed to apply differential privacy")
  return res.json()
}

export async function executeFederatedQuery(query: any) {
  const res = await fetch(`${API_BASE}/api/ppaf/federated-query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  })
  if (!res.ok) throw new Error("Failed to execute federated query")
  return res.json()
}

export async function getPolicyDashboard() {
  const res = await fetch(`${API_BASE}/api/ppaf/policy-dashboard`)
  if (!res.ok) throw new Error("Failed to fetch policy dashboard")
  return res.json()
}

// Cache Management
export async function getCacheStats() {
  const res = await fetch(`${API_BASE}/api/cache/stats`)
  if (!res.ok) throw new Error("Failed to fetch cache stats")
  return res.json()
}

export async function clearCache() {
  const res = await fetch(`${API_BASE}/api/cache/clear`, { method: "POST" })
  if (!res.ok) throw new Error("Failed to clear cache")
  return res.json()
}

// Health Check
export async function healthCheck() {
  const res = await fetch(`${API_BASE}/api/status`)
  if (!res.ok) throw new Error("API health check failed")
  return res.json()
}
