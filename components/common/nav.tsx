"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function DashboardNav() {
  const pathname = usePathname() || "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const items = [
    { href: "/overview", label: "Overview" },
    { href: "/mobility", label: "Mobility" },
    { href: "/state-analytics", label: "States" },
    { href: "/anomalies", label: "Anomalies" },
    { href: "/policy", label: "Policy" },
    { href: "/data-explorer", label: "Explorer" },
    { href: "/infographic", label: "Infographic" },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 border-b border-border bg-background sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <span className="text-2xl font-bold text-gradient">SAMVIDHAN</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive(item.href) 
                ? "bg-primary-lavender text-white shadow-3d-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 border-2 border-border rounded-lg bg-transparent cursor-pointer hover:bg-muted transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 py-4 px-6 border-b border-border bg-background">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href) 
                    ? "bg-primary-lavender text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
