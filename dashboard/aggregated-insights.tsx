"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function AggregatedInsights() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return <div className="flex items-center justify-center h-48 text-muted-foreground">Loading aggregated insights...</div>
  }

  const states = data?.stateDistribution?.states || []
  const demographics = data?.demographics?.demographics || []
  const coverage = data?.coverageGaps?.coverage_gaps || []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Aggregated State Distribution (from CSVs)</CardTitle>
        </CardHeader>
        <CardContent>
          {states.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={states.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Bar dataKey="total_enrollments" fill="hsl(var(--color-chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">No data</div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Aggregated Demographics (Top states)</CardTitle>
          </CardHeader>
          <CardContent>
            {demographics.length > 0 ? (
              <div className="h-48 overflow-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="text-left">State</th>
                      <th className="text-right">0-17</th>
                      <th className="text-right">17+</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demographics.map((d: any, i: number) => (
                      <tr key={i} className="border-t">
                        <td>{d.state}</td>
                        <td className="text-right">{d.demo_age_5_17}</td>
                        <td className="text-right">{d.demo_age_17_plus}</td>
                        <td className="text-right">{d.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground">No data</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coverage Gaps (Lowest coverage districts)</CardTitle>
          </CardHeader>
          <CardContent>
            {coverage.length > 0 ? (
              <div className="h-48 overflow-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="text-left">State</th>
                      <th className="text-left">District</th>
                      <th className="text-right">Enrollments</th>
                      <th className="text-right">Population</th>
                      <th className="text-right">Coverage %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coverage.map((c: any, i: number) => (
                      <tr key={i} className="border-t">
                        <td>{c.state}</td>
                        <td>{c.district}</td>
                        <td className="text-right">{c.enrollments}</td>
                        <td className="text-right">{c.population}</td>
                        <td className="text-right">{c.coverage_percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground">No data</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
