import type { Metadata } from "next"
import { Navigation } from "@/components/shared/Navigation"
import { Footer } from "@/components/shared/Footer"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "SAMVIDHAN - Aadhaar Intelligence Platform",
  description: "Transform Aadhaar data into actionable insights for enrollment analysis, fraud detection, and policy optimization.",
  keywords: ["Aadhaar", "Analytics", "Intelligence", "Enrollment", "Fraud Detection"],
  openGraph: {
    title: "SAMVIDHAN - Aadhaar Intelligence Platform",
    description: "Advanced analytics platform for enrollment patterns, mobility analysis, and policy recommendations.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
