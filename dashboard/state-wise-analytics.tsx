"use client"

import { useState } from "react"
import { StateSelector } from "@/components/dashboard/state-selector"
import { useStateMetrics, useStateComparison } from "@/hooks/use-state-metrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"]

interface StateAnalytics {
  mode: 'single' | 'comparison'
  selectedStates: string[]
}

export function StateWiseAnalytics() {
  const [state, setState] = useState<string>('')
  const [comparisonStates, setComparisonStates] = useState<string[]>([])
  const [mode, setMode] = useState<'single' | 'comparison'>('single')

  const { metrics, loading } = useStateMetrics(mode === 'single' ? state : '')
  const { comparison, loading: compLoading } = useStateComparison(mode === 'comparison' ? comparisonStates : [])

  const handleStateSelect = (states: string[]) => {
    setState(states[0] || '')
  }

  const handleComparisonSelect = (states: string[]) => {
    setComparisonStates(states)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">🗺️ State-wise Analytics</h2>
        <p className="text-muted-foreground mb-6">Detailed enrollment metrics and comparisons by state</p>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('single')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'single'
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            📊 Single State
          </button>
          <button
            onClick={() => setMode('comparison')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'comparison'
                ? 'bg-purple-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🔄 Compare States
          </button>
        </div>
      </div>

      {/* Single State View */}
      {mode === 'single' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select State</CardTitle>
            </CardHeader>
            <CardContent>
              <StateSelector selectedStates={state ? [state] : []} onStateChange={handleStateSelect} mode="single" />
            </CardContent>
          </Card>

          {state && metrics && (
            <>
              {/* State Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {(metrics.total_enrollments / 1_000_000).toFixed(2)}M
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">State level enrollment</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {(metrics.active_users / 1_000_000).toFixed(2)}M
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Active in last 30 days</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-pink-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Coverage %</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{metrics.coverage_percentage}%</div>
                    <p className="text-xs text-muted-foreground mt-2">Of eligible population</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Anomalies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{metrics.anomalies.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-2">Detected this period</p>
                  </CardContent>
                </Card>
              </div>

              {/* State Enrollment Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>📈 Monthly Enrollment Trend</CardTitle>
                  <CardDescription>12-month enrollment progression for {state}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ enrollments: { label: "Enrollments", color: "#3b82f6" } }} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          formatter={(value: any) => [(value / 1000).toFixed(0) + "K", "Enrollments"]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="enrollments" stroke="#3b82f6" strokeWidth={2} name="Monthly Enrollments" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Age Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>👨‍👩‍👧‍👦 Age Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "0-5", value: metrics.age_0_5 },
                              { name: "5-17", value: metrics.age_5_17 },
                              { name: "18+", value: metrics.age_18_plus },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${(value / 1000).toFixed(0)}K`}
                            outerRadius={80}
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#ec4899" />
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>🏙️ Urban vs Rural</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Urban", value: metrics.urban_percentage },
                              { name: "Rural", value: metrics.rural_percentage },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name} ${value}%`}
                            outerRadius={80}
                            dataKey="value"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#f59e0b" />
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>🏘️ Top Districts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{ enrollments: { label: "Enrollments", color: "#10b981" } }} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metrics.top_districts} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="district" type="category" width={100} fontSize={11} />
                          <ChartTooltip />
                          <Bar dataKey="enrollments" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {state && loading && (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          )}

          {!state && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">Select a state to view detailed analytics</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Comparison View */}
      {mode === 'comparison' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compare States</CardTitle>
              <CardDescription>Select up to 5 states for comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <StateSelector
                selectedStates={comparisonStates}
                onStateChange={handleComparisonSelect}
                maxSelect={5}
                mode="multiple"
              />
            </CardContent>
          </Card>

          {comparison && (
            <>
              {/* Comparison Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Highest Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-foreground">{comparison.comparison.highest_enrollment}</p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Lowest Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-foreground">{comparison.comparison.lowest_enrollment}</p>
                  </CardContent>
                </Card>

                <Card className="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-l-pink-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Fastest Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-foreground">{comparison.comparison.fastest_growth}</p>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Best Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-foreground">{comparison.comparison.best_coverage}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>📊 Enrollment Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ total_enrollments: { label: "Enrollments", color: "#3b82f6" } }} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparison.metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <ChartTooltip
                          formatter={(value: any) => [(value / 1_000_000).toFixed(2) + "M", "Enrollments"]
                          }
                        />
                        <Bar dataKey="total_enrollments" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Coverage Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Coverage % Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ coverage_percentage: { label: "Coverage %", color: "#10b981" } }} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparison.metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip />
                        <Bar dataKey="coverage_percentage" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          )}

          {comparisonStates.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">Select states to compare them side-by-side</p>
              </CardContent>
            </Card>
          )}

          {comparisonStates.length > 0 && compLoading && (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
