"use client"

import dynamic from "next/dynamic"

const EnhancedAnomalyDetection = dynamic(
  () => import("@/components/dashboard/enhanced-anomaly-detection"),
  { ssr: false }
)

export default function Page() {
  return <EnhancedAnomalyDetection />
}
