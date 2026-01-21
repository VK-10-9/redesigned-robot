"use client"

import dynamic from "next/dynamic"
import DashboardNav from "@/components/common/nav"

const EnhancedAnomalyDetection = dynamic(
  () => import("@/components/dashboard/enhanced-anomaly-detection"),
  { ssr: false }
)

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-full text-sm font-medium mb-6">
            <span className="text-primary">⚠️</span>
            <span className="text-primary font-semibold">Anomaly Detection</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2" style={{ textShadow: '2px 2px 4px rgba(148, 171, 232, 0.3)' }}>
            ANOMALIES
          </h1>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Real-time fraud detection and pattern analysis powered by AI
          </p>
        </div>
        <EnhancedAnomalyDetection />
      </main>
    </div>
  )
}
