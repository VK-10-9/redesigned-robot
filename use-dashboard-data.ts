"use client"

import { useEffect, useState } from "react"
import * as api from "@/lib/api"

interface DashboardData {
  overview: any
  timeline: any
  stateDistribution: any
  demographics: any
  anomalies: any
  recommendations: any
  coverageGaps?: any
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [overview, timeline, states, demo, anomalies, recs, coverage] = await Promise.all([
          api.getNationalOverview(),
          api.getEnrollmentTimeline(12),
          api.getStateDistribution(),
          api.getDemographicDistribution(),
          api.getAnomalies(20),
          api.getRecommendations(10),
          api.getCoverageGaps(10),
        ])

        setData({
          overview,
          timeline,
          stateDistribution: states,
          demographics: demo,
          anomalies,
          recommendations: recs,
          coverageGaps: coverage,
        })
        // Additional logic can be added here if needed
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        console.error("[v0] Dashboard data fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
