'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Shield, 
  Database, 
  TrendingUp, 
  Users, 
  Lock 
} from "lucide-react"

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

export function FeaturesSection() {
  return (
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
  )
}
