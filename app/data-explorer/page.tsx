"use client"

import dynamic from "next/dynamic"

const EnhancedDataExplorer = dynamic(
  () => import("@/components/dashboard/enhanced-data-explorer"),
  { ssr: false }
)

export default function Page() {
  return <EnhancedDataExplorer />
}
