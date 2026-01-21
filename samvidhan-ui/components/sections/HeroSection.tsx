'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-muted border rounded-full px-4 py-2 mb-6 hover:bg-muted/80 transition-colors">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-xs sm:text-sm">
              Trusted Aadhaar Intelligence
            </span>
          </div>
          
          {/* Brand Name with Effects */}
          <div className="mb-6 overflow-hidden">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 text-primary tracking-wider"
              style={{
                textShadow: '2px 2px 4px rgba(148, 171, 232, 0.3), 0 0 10px rgba(148, 171, 232, 0.2)'
              }}
            >
              SAMVIDHAN
            </h1>
            <div className="h-1 w-24 sm:w-32 mx-auto bg-primary rounded-full shadow-lg"></div>
          </div>
          
          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Transform Aadhaar Data Into
            <br />
            <span className="text-primary">Actionable Insights</span>
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Advanced analytics platform for enrollment patterns, mobility analysis, 
            and policy recommendations powered by 6 million+ records.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="px-6 sm:px-8 py-3 text-base font-semibold shadow-3d hover:shadow-3d-hover" 
              asChild
            >
              <Link href="/overview">
                Explore Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-6 sm:px-8 py-3 text-base shadow-3d hover:shadow-3d-hover" 
              asChild
            >
              <Link href="/data-explorer">
                View Data
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  )
}
