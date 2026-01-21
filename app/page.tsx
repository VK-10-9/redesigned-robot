'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Database, Shield, TrendingUp, Users, Lock } from "lucide-react"
import { STATS, ROUTES } from "@/lib/constants"

const features = [
  {
    icon: Database,
    title: "Data Integrity",
    description: "Automatic normalization & duplicate detection",
    framework: "ADIF",
  },
  {
    icon: Shield,
    title: "Identity Resilience",
    description: "Biometric aging assessment & escalation",
    framework: "IRF",
  },
  {
    icon: TrendingUp,
    title: "Forensic Intelligence",
    description: "Fraud pattern & hub detection",
    framework: "AFIF",
  },
  {
    icon: Users,
    title: "Resource Optimization",
    description: "Demand forecasting & migration analysis",
    framework: "PROF",
  },
  {
    icon: BarChart3,
    title: "Mobility Framework",
    description: "Cross-state tracking & verification",
    framework: "AMF",
  },
  {
    icon: Lock,
    title: "Privacy Analytics",
    description: "Differential privacy & federated queries",
    framework: "PPAF",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
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
                className="px-6 sm:px-8 py-3 text-base font-semibold" 
                asChild
              >
                <Link href={ROUTES.OVERVIEW}>
                  Explore Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 sm:px-8 py-3 text-base" 
                asChild
              >
                <Link href={ROUTES.DATA_EXPLORER}>
                  View Data
                </Link>
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow hover:border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Six Intelligence Frameworks
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive analytics powered by intelligent algorithms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.framework} className="hover:shadow-lg transition-shadow hover:border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <Badge variant="default" className="text-xs">
                        {feature.framework}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore the Data?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Access comprehensive Aadhaar analytics with our intuitive dashboard and powerful data explorer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href={ROUTES.OVERVIEW}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base" asChild>
              <Link href={ROUTES.INFOGRAPHIC}>
                View Infographics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SAMVIDHAN - Aadhaar Intelligence Platform</p>
        </div>
      </footer>
    </main>
  )
}
