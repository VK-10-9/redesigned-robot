"use client"

import { useEffect, useState } from "react"

interface StateMetrics {
  state: string
  total_enrollments: number
  active_users: number
  coverage_percentage: number
  anomalies: number
  age_0_5: number
  age_5_17: number
  age_18_plus: number
  urban_percentage: number
  rural_percentage: number
  top_districts: Array<{ district: string; enrollments: number }>
  trend: Array<{ month: string; enrollments: number }>
}

interface StateComparison {
  states: string[]
  metrics: StateMetrics[]
  comparison: {
    highest_enrollment: string
    lowest_enrollment: string
    fastest_growth: string
    best_coverage: string
  }
}

export function useStateMetrics(state: string) {
  const [metrics, setMetrics] = useState<StateMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!state) {
      setMetrics(null)
      setLoading(false)
      setError(null)
      return
    }

    async function fetchStateMetrics() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:8000/api/state/${encodeURIComponent(state)}/metrics`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch state metrics: ${response.statusText}`)
        }

        const data = await response.json()
        
        setMetrics({
          state,
          total_enrollments: data.total_enrollments || 0,
          active_users: Math.floor((data.total_enrollments || 0) * 0.8),
          coverage_percentage: data.coverage_percentage || 0,
          anomalies: data.anomalies || 0,
          age_0_5: data.age_0_5 || 0,
          age_5_17: data.age_5_17 || 0,
          age_18_plus: data.age_18_plus || 0,
          urban_percentage: data.urban_percentage || 0,
          rural_percentage: data.rural_percentage || 0,
          top_districts: data.top_districts || [],
          trend: data.trend || data.timeline || [],
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch state metrics')
        console.error('State metrics error:', err)
        setMetrics(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStateMetrics()
  }, [state])

  return { metrics, loading, error }
}

export function useStateComparison(states: string[]) {
  const [comparison, setComparison] = useState<StateComparison | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (states.length === 0) {
      setComparison(null)
      setLoading(false)
      setError(null)
      return
    }

    async function fetchComparison() {
      try {
        setLoading(true)
        setError(null)

        const statesParam = states.join(',')
        const response = await fetch(`http://localhost:8000/api/state/comparison?states=${encodeURIComponent(statesParam)}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch comparison data: ${response.statusText}`)
        }

        const data = await response.json()

        const metrics = (data.metrics || states.map(s => ({
          state: s,
          total_enrollments: 0,
          active_users: 0,
          coverage_percentage: 0,
          anomalies: 0,
          age_0_5: 0,
          age_5_17: 0,
          age_18_plus: 0,
          urban_percentage: 0,
          rural_percentage: 0,
          top_districts: [],
          trend: [],
        }))) as StateMetrics[]

        setComparison({
          states,
          metrics,
          comparison: data.comparison || {
            highest_enrollment: metrics.reduce((prev, current) => 
              prev.total_enrollments > current.total_enrollments ? prev : current
            ).state,
            lowest_enrollment: metrics.reduce((prev, current) => 
              prev.total_enrollments < current.total_enrollments ? prev : current
            ).state,
            fastest_growth: metrics[0]?.state || '',
            best_coverage: metrics.reduce((prev, current) => 
              prev.coverage_percentage > current.coverage_percentage ? prev : current
            ).state,
          },
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comparison data')
        console.error('Comparison error:', err)
        setComparison(null)
      } finally {
        setLoading(false)
      }
    }

    fetchComparison()
  }, [states])

  return { comparison, loading, error }
}
