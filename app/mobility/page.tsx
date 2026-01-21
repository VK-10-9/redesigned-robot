"use client"

import dynamic from "next/dynamic"
import DashboardNav from "@/components/common/nav"

const EnhancedMobilityFramework = dynamic(
  () => import("@/components/dashboard/enhanced-mobility-framework"),
  { ssr: false }
)

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <EnhancedMobilityFramework />
      </main>
    </div>
  )
}
