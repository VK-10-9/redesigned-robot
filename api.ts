import * as mockData from "./mock-data"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`)
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    return response.json()
  } catch (error) {
    console.log(`[v0] Backend unavailable, using mock data for ${endpoint}`)
    return getMockData(endpoint) as Promise<T>
  }
}

function getMockData(endpoint: string): any {
  if (endpoint === "/api/national-overview") return mockData.mockNationalOverview
  if (endpoint === "/api/enrollment-timeline") return mockData.mockTimeline
  if (endpoint.includes("/api/mobility/state-distribution")) return mockData.mockStateDistribution
  if (endpoint.includes("/api/mobility/demographic-distribution")) return mockData.mockDemographics
  if (endpoint.includes("/api/anomalies/list")) return mockData.mockAnomalies
  if (endpoint.includes("/api/recommendations/list")) return mockData.mockRecommendations
  if (endpoint.includes("/api/explorer/enrollment")) return { rows: mockData.mockAnomalies.anomalies, total: mockData.mockAnomalies.count || mockData.mockAnomalies.anomalies.length }
  if (endpoint.includes("/api/aggregated/state-distribution")) return mockData.mockAggregatedStateDistribution
  if (endpoint.includes("/api/aggregated/demographics")) return mockData.mockAggregatedDemographics
  if (endpoint.includes("/api/aggregated/coverage-gaps")) return mockData.mockCoverageGaps
  return null
}

export async function getNationalOverview() {
  return fetchFromAPI("/api/national-overview")
}

export async function getExplorerEnrollment(params: { page?: number; limit?: number } = { page: 1, limit: 25 }) {
  const { page = 1, limit = 25 } = params
  return fetchFromAPI(`/api/explorer/enrollment?page=${page}&limit=${limit}`)
}

export async function getEnrollmentTimeline(months = 12) {
  return fetchFromAPI(`/api/enrollment-timeline?months=${months}`)
}

export async function getStateDistribution() {
  // prefer aggregated endpoint when backend available
  try {
    return fetchFromAPI("/api/aggregated/state-distribution")
  } catch (err) {
    return fetchFromAPI("/api/mobility/state-distribution")
  }
}

export async function getDemographicDistribution() {
  try {
    return fetchFromAPI("/api/aggregated/demographics")
  } catch (err) {
    return fetchFromAPI("/api/mobility/demographic-distribution")
  }
}

export async function getCoverageGaps(limit = 20) {
  return fetchFromAPI(`/api/aggregated/coverage-gaps?limit=${limit}`)
}

export async function getAnomalies(limit = 50) {
  return fetchFromAPI(`/api/anomalies/list?limit=${limit}`)
}

export async function getAnomaliesSummary() {
  return fetchFromAPI("/api/anomalies/summary")
}

export async function getRecommendations(limit = 50) {
  return fetchFromAPI(`/api/recommendations/list?limit=${limit}`)
}
