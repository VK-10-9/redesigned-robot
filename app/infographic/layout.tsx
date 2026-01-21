import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Infographic Dashboard - Visual Analytics & India Map",
  description: "Interactive visual dashboard with India map showing state-wise Aadhaar enrollment distribution, real-time statistics, and key performance indicators.",
  openGraph: {
    title: "SAMVIDHAN Infographic Dashboard",
    description: "Beautiful visual representation of Aadhaar data with interactive India map and key metrics.",
  },
}

export default function InfographicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
