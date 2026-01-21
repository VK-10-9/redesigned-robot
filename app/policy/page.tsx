"use client"

import dynamic from "next/dynamic"

const EnhancedPolicyRecommendations = dynamic(
  () => import("@/components/dashboard/enhanced-policy-recommendations"),
  { ssr: false }
)

export default function Page() {
  return <EnhancedPolicyRecommendations />
}
