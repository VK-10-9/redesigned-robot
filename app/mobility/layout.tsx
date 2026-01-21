import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobility Analysis - Population Movement & Migration Patterns",
  description: "Track inter-state and intra-state mobility patterns through Aadhaar enrollment data. Analyze migration trends, seasonal movements, and demographic flows across India.",
  openGraph: {
    title: "SAMVIDHAN Mobility Analysis",
    description: "Advanced mobility tracking and migration pattern analysis using Aadhaar enrollment data.",
  },
}

export default function MobilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
