import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anomaly Detection - AI-Powered Fraud & Irregularity Detection",
  description: "Machine learning powered anomaly detection for identifying enrollment irregularities, potential fraud patterns, and data quality issues in Aadhaar records.",
  openGraph: {
    title: "SAMVIDHAN Anomaly Detection",
    description: "AI-powered system for detecting enrollment anomalies and potential fraud in Aadhaar data.",
  },
}

export default function AnomaliesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
