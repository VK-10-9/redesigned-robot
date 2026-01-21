"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function NationalOverview() {
  const { data, loading, error } = useDashboardData()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg"></div>
            ))}
          </div>
          <div className="h-80 bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  const overview = data?.overview || {
    total_enrollments: 0,
    active_users: 0,
    states_covered: 0,
    anomalies_detected: 0
  }
  
  // Transform timeline data for chart - API returns { month: "2025-01-01", total: 123 }
  const rawTimeline = data?.timeline || []
  const trendData = rawTimeline.length > 0 
    ? rawTimeline.map(item => {
        const date = new Date(item.month)
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        return {
          month: monthName,
          enrollments: item.total,
          total: item.total
        }
      })
    : []

  const stats = [
    { 
      label: "Total Enrollments", 
      value: overview.total_enrollments ? (overview.total_enrollments / 1_000_000).toFixed(2) + "M" : "0", 
      rawValue: overview.total_enrollments,
      icon: "📊",
      change: "From CSV Dataset" 
    },
    { 
      label: "Active Users", 
      value: overview.active_users ? (overview.active_users / 1_000_000).toFixed(2) + "M" : "0", 
      rawValue: overview.active_users,
      icon: "👥",
      change: "Enrolled Population"
    },
    { 
      label: "States/UTs Covered", 
      value: overview.states_covered?.toString() || "0", 
      rawValue: overview.states_covered,
      icon: "🗺️",
      change: "All India Coverage"
    },
    { 
      label: "Data Records", 
      value: overview.total_enrollments ? (overview.total_enrollments).toLocaleString() : "0",
      rawValue: overview.total_enrollments,
      icon: "📋",
      change: "Aadhaar Enrollments"
    },
  ]

  // Get top states from the data
  const topStates = data?.stateDistribution?.slice(0, 10) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">National Overview</h2>
        <p className="text-muted-foreground">Comprehensive statistics of Aadhaar enrollment across India from real dataset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enrollment Timeline Chart */}
      {trendData.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
          <CardHeader>
            <CardTitle>📈 Enrollment Timeline</CardTitle>
            <CardDescription>Monthly enrollment data from dataset ({trendData.length} months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                enrollments: { label: "Enrollments", color: "#3b82f6" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                    formatter={(value: number) => [value.toLocaleString(), "Enrollments"]}
                  />
                  <Bar dataKey="enrollments" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Enrollments" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Top States */}
      {topStates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🏆 Top 10 States by Enrollment</CardTitle>
            <CardDescription>States with highest Aadhaar enrollments in the dataset</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total_enrollments: { label: "Enrollments", color: "#10b981" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topStates} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="state" 
                    stroke="hsl(var(--muted-foreground))" 
                    width={120}
                    fontSize={11}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [value.toLocaleString(), "Enrollments"]}
                  />
                  <Bar dataKey="total_enrollments" fill="#10b981" radius={[0, 4, 4, 0]} name="Enrollments" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Error loading data: {error}. Please ensure the backend server is running.
          </p>
        </div>
      )}

      {!error && trendData.length === 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            ℹ️ Timeline data is loading or unavailable. Showing overview statistics only.
          </p>
        </div>
      )}
    </div>
  )
}
