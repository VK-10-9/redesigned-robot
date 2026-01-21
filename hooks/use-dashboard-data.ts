"use client"

import { useState, useEffect } from "react"

export interface DashboardOverview {
  total_enrollments: number
  active_users: number
  states_covered: number
  anomalies_detected: number
  timestamp: string
}

export interface TimelineEntry {
  month: string
  total: number
}

export interface StateEntry {
  state: string
  total_enrollments: number
}

export interface AgeGroupEntry {
  age_group: string
  count: number
}

export interface DemographicData {
  by_age_group: AgeGroupEntry[]
  by_location: any[]
}

export interface DashboardData {
  overview: DashboardOverview
  timeline: TimelineEntry[]
  stateDistribution: StateEntry[]
  demographics: DemographicData
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        console.log('Fetching dashboard data from:', API_BASE)
        
        // Fetch all data in parallel
        const endpoints = [
          `${API_BASE}/api/national-overview`,
          `${API_BASE}/api/enrollment-timeline?months=12`,
          `${API_BASE}/api/mobility/state-distribution`,
          `${API_BASE}/api/mobility/demographic-distribution`,
        ]
        
        console.log('Endpoints:', endpoints)
        
        const [overviewRes, timelineRes, statesRes, demographicsRes] = await Promise.all(
          endpoints.map(url => {
            console.log('Fetching:', url)
            return fetch(url).catch(err => {
              console.error('Fetch failed for', url, ':', err)
              throw err
            })
          })
        )

        // Check if responses are ok
        if (!overviewRes.ok) throw new Error(`National overview failed: ${overviewRes.status}`)
        if (!timelineRes.ok) throw new Error(`Timeline failed: ${timelineRes.status}`)
        if (!statesRes.ok) throw new Error(`States failed: ${statesRes.status}`)
        // Demographics can fail gracefully
        
        const overview = await overviewRes.json()
        const timelineData = await timelineRes.json()
        const states = await statesRes.json()
        const demographics = demographicsRes.ok ? await demographicsRes.json() : { by_age_group: [], by_location: [] }

        setData({
          overview: {
            total_enrollments: overview.total_enrollments || 0,
            active_users: overview.active_users || 0,
            states_covered: overview.states_covered || 0,
            anomalies_detected: overview.anomalies_detected || 0,
            timestamp: overview.timestamp || new Date().toISOString(),
          },
          timeline: timelineData.timeline || [],
          stateDistribution: states.states || [],
          demographics: demographics || { by_age_group: [], by_location: [] },
        })
        setError(null)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        console.log('API_BASE was:', API_BASE)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        
        // Set empty data on error
        setData({
          overview: {
            total_enrollments: 0,
            active_users: 0,
            states_covered: 0,
            anomalies_detected: 0,
            timestamp: new Date().toISOString(),
          },
          timeline: [],
          stateDistribution: [],
          demographics: { by_age_group: [], by_location: [] },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
