import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import Header1 from "@/components/ui/header"
import DevelopmentBanner from "@/components/ui/development-banner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VishwaDev - Where Student Innovation Meets the World",
  description:
    "The premier platform for student developers to showcase groundbreaking projects, build meaningful connections, and launch their tech careers with personalized branding.",
  generator: 'vishwadev.tech',
  authors: [{ name: "Disha Raikar", url: "https://disha.vishwadev.tech" },
            { name: "Vishwanath K.", url: "https://vk.vishwadev.tech" } ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light" style={{ colorScheme: 'light' }}>
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header1 />
          <main>
            {children}
          </main>
          <DevelopmentBanner 
            message="VishwaDev.tech is currently under development. Some features may not work as expected. Thank you for your patience!"
            variant="construction"
            isDismissible={true}
            autoShow={true}
            showDelay={2000}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
