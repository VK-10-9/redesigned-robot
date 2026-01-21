"use client"

import dynamic from "next/dynamic"

const EnhancedStateAnalytics = dynamic(
  () => import("@/components/dashboard/enhanced-state-analytics"),
  { ssr: false }
)

export default function StateWiseAnalyticsPage() {
  return <EnhancedStateAnalytics />
}
