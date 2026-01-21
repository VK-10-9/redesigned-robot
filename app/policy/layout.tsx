import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Policy Recommendations - AI-Generated Evidence-Based Policies",
  description: "Data-driven policy recommendations for improving Aadhaar enrollment coverage, infrastructure deployment, and service delivery. Powered by analysis of 6M+ records.",
  openGraph: {
    title: "SAMVIDHAN Policy Recommendations",
    description: "Evidence-based policy recommendations for digital identity governance and enrollment improvement.",
  },
}

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
