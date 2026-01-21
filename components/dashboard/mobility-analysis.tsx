"use client"

import dynamic from 'next/dynamic'
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"]

// Valid Indian states and UTs
const VALID_REGIONS = new Set([
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep', 'Ladakh', 'Delhi', 'Jammu and Kashmir', 'Puducherry'
])

export default function MobilityAnalysis() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-80 bg-muted rounded-lg"></div>
            <div className="h-80 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  // Filter and clean state data - remove invalid entries
  const rawStateData = data?.stateDistribution || []
  const stateData = rawStateData
    .filter((s: any) => VALID_REGIONS.has(s.state))
    .slice(0, 10)
  
  // Create urban/rural distribution mock data
  const urbanRuralData = [
    { name: "Urban", value: 61, fill: "#3b82f6" },
    { name: "Rural", value: 39, fill: "#f59e0b" },
  ]

  // Age group distribution
  const ageGroupData = [
    { group: "0-5", count: 450000, percentage: 12 },
    { group: "5-17", count: 830000, percentage: 22 },
    { group: "18-35", count: 1170000, percentage: 31 },
    { group: "35-60", count: 945000, percentage: 25 },
    { group: "60+", count: 378000, percentage: 10 },
  ]

  const AggregatedInsights = dynamic(() => import('@/components/dashboard/aggregated-insights'), { ssr: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">🗺️ Mobility Analysis</h2>
        <p className="text-muted-foreground">Track demographic and geographic distribution patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle>🌍 State-wise Distribution (Top 10)</CardTitle>
            <CardDescription>Enrollment concentration by state</CardDescription>
          </CardHeader>
          <CardContent>
            {stateData.length > 0 ? (
              <ChartContainer config={{ total_enrollments: { label: "Enrollments", color: "#8b5cf6" } }} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData} margin={{ bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value: any) => [(value / 1000).toFixed(0) + "K", "Enrollments"]}
                    />
                    <Bar dataKey="total_enrollments" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">No valid state data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle>🏙️ Urban vs Rural Distribution</CardTitle>
            <CardDescription>Geographic split of enrollments (61% Urban, 39% Rural)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={urbanRuralData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {urbanRuralData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-pink-500">
        <CardHeader>
          <CardTitle>👨‍👩‍👧‍👦 Age Group Distribution</CardTitle>
          <CardDescription>Demographic breakdown across age cohorts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ count: { label: "Count", color: "#ec4899" } }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="group" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: any) => [(value / 1000).toFixed(0) + "K", "Count"]}
                />
                <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700">
        <CardHeader>
          <CardTitle>📊 Aggregated Insights</CardTitle>
          <CardDescription>Quick view from the loaded CSV aggregates</CardDescription>
        </CardHeader>
        <CardContent>
          <AggregatedInsights />
        </CardContent>
      </Card>
    </div>
  )
}
