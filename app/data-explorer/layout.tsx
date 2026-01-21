import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Explorer - Browse & Analyze Aadhaar Enrollment Records",
  description: "Explore 6M+ Aadhaar enrollment records with advanced filtering. Search by state, district, gender, age group. Export data for research and policy analysis.",
  openGraph: {
    title: "SAMVIDHAN Data Explorer",
    description: "Interactive data exploration tool for Aadhaar enrollment records with advanced filtering and export capabilities.",
  },
}

export default function DataExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
