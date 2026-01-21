"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

export default function DashboardNav() {
  const pathname = usePathname() || "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const items = [
    { href: ROUTES.OVERVIEW, label: "Overview" },
    { href: ROUTES.MOBILITY, label: "Mobility" },
    { href: ROUTES.STATE_ANALYTICS, label: "States" },
    { href: ROUTES.ANOMALIES, label: "Anomalies" },
    { href: ROUTES.POLICY, label: "Policy" },
    { href: ROUTES.DATA_EXPLORER, label: "Explorer" },
    { href: ROUTES.INFOGRAPHIC, label: "Infographic" },
  ]

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-muted">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
          SAMVIDHAN
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href) 
                  ? "bg-primary text-white shadow-3d-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Button asChild className="hidden sm:flex">
          <Link href={ROUTES.OVERVIEW}>Get Started</Link>
        </Button>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-muted border-t border-muted">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href) 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-2">
              <Link href={ROUTES.OVERVIEW}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
