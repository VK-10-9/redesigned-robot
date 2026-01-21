'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ROUTES } from "@/lib/constants"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const navItems = [
    { label: 'Overview', href: ROUTES.OVERVIEW },
    { label: 'Dashboard', href: ROUTES.DASHBOARD },
    { label: 'Data Explorer', href: ROUTES.DATA_EXPLORER },
    { label: 'Documentation', href: ROUTES.DOCS },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-muted">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={ROUTES.HOME} className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
          SAMVIDHAN
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
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
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-muted border-t border-muted">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
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
