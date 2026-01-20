"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Card, CardContent } from "@/components/ui/card"

export default function PolicyRecommendations() {
  const { data, loading } = useDashboardData()

  if (loading) {
    return <div className="flex items-center justify-center h-96 text-muted-foreground">Loading recommendations...</div>
  }

  const recommendations = data?.recommendations?.recommendations || []

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Policy Recommendations</h2>
        <p className="text-muted-foreground">AI-driven insights for strategic policy improvements</p>
      </div>

      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec: any, i: number) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-2">{rec.recommendation_type}</h3>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Location: {rec.state_name || "National"}</p>
                    <p className="text-sm text-muted-foreground">Impact: {rec.estimated_impact}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                    {rec.priority || "Low"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-muted-foreground">No recommendations available</div>
      )}
    </div>
  )
}
