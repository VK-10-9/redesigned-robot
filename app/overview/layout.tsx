import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Overview - Frameworks, Project & National Statistics",
  description: "Comprehensive overview of SAMVIDHAN platform including AMF, ADF, ADQF frameworks, project documentation, and real-time national enrollment statistics across all Indian states.",
  openGraph: {
    title: "SAMVIDHAN Dashboard Overview",
    description: "Access frameworks, project documentation, and live national Aadhaar enrollment statistics.",
  },
}

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
