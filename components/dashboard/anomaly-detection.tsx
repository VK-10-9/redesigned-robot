"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent } from "@/components/ui/card"

export default function AnomalyDetection() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return <div className="flex items-center justify-center h-96 text-muted-foreground">Loading anomalies...</div>
  }

  const anomalies = data?.anomalies?.anomalies || []

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700"
      case "high":
        return "bg-orange-100 text-orange-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Anomaly Detection</h2>
        <p className="text-muted-foreground">Identify suspicious patterns and irregularities in Aadhaar data</p>
      </div>

      {anomalies.length > 0 ? (
        <div className="space-y-4">
          {anomalies.slice(0, 20).map((anomaly: any, i: number) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{anomaly.anomaly_type || "Unknown"}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{anomaly.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      State: {anomaly.state_name || "N/A"} | Records affected: {anomaly.records_affected || 0}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getSeverityColor(anomaly.severity)}`}
                  >
                    {anomaly.severity?.toUpperCase() || "LOW"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-muted-foreground">No anomalies detected</div>
      )}
    </div>
  )
}
