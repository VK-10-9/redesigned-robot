import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/common/theme-provider"

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samvidhan.gov.in"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SAMVIDHAN - Aadhaar Intelligence Platform | Government of India",
    template: "%s | SAMVIDHAN - Aadhaar Intelligence"
  },
  description: "Official Aadhaar Intelligence Platform by Government of India. Analyze 6M+ enrollment records, track mobility patterns, detect anomalies, and generate data-driven policy recommendations for digital identity governance.",
  keywords: [
    "Aadhaar",
    "UIDAI",
    "Digital Identity",
    "Government Analytics",
    "India Demographics",
    "Enrollment Data",
    "Biometric ID",
    "Population Analytics",
    "Policy Intelligence",
    "State-wise Analysis",
    "SAMVIDHAN",
    "e-Governance"
  ],
  authors: [
    { name: "UIDAI", url: "https://uidai.gov.in" },
    { name: "Government of India" }
  ],
  creator: "SAMVIDHAN Development Team",
  publisher: "Government of India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)", sizes: "32x32" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" }
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "SAMVIDHAN - Aadhaar Intelligence Platform",
    title: "SAMVIDHAN - Transform Aadhaar Data Into Actionable Insights",
    description: "Advanced analytics platform for Aadhaar enrollment patterns, mobility analysis, and AI-powered policy recommendations. Trusted by Government of India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAMVIDHAN - Aadhaar Intelligence Platform Dashboard",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMVIDHAN - Aadhaar Intelligence Platform",
    description: "Transform Aadhaar data into actionable insights. 6M+ records analyzed for policy recommendations.",
    images: ["/og-image.png"],
    creator: "@ABOREL_YT",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
      "hi-IN": `${siteUrl}/hi`,
    },
  },
  category: "Government Technology",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "SAMVIDHAN - Aadhaar Intelligence Platform",
    description: "Official Aadhaar Intelligence Platform for enrollment analytics and policy recommendations",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [
      "https://uidai.gov.in",
      "https://twitter.com/ABOREL_YT"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      availableLanguage: ["English", "Hindi"]
    }
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
