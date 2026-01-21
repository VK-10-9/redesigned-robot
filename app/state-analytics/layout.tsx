import { Metadata } from "next"

export const metadata: Metadata = {
  title: "State Analytics - State-wise Aadhaar Enrollment Analysis",
  description: "Deep-dive analytics for each Indian state. Compare enrollment rates, demographic distributions, coverage metrics, and identify regional patterns in Aadhaar adoption.",
  openGraph: {
    title: "SAMVIDHAN State-wise Analytics",
    description: "Comprehensive state-by-state analysis of Aadhaar enrollment patterns and demographics.",
  },
}

export default function StateAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
