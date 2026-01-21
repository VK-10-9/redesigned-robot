"use client"

import dynamic from "next/dynamic"

const InfographicDashboard = dynamic(
  () => import("@/components/dashboard/infographic-dashboard"),
  { ssr: false }
)

export default function Page() {
  return <InfographicDashboard />
}
