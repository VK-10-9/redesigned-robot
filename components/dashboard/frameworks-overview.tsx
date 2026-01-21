"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FrameworksOverview() {
  const frameworks = [
    {
      id: "adif",
      number: "1",
      name: "Aadhaar Data Integrity Framework (ADIF)",
      tagline: "Beyond basic data cleaning",
      goal: "Keep Aadhaar data clean, consistent, and trustworthy over time.",
      icon: "🔧",
      color: "blue",
      features: [
        {
          name: "Standardization Engine",
          description: "Auto-fixes spelling, format, schema mismatches"
        },
        {
          name: "Duplicate Signal Detector",
          description: "Flags \"almost same\" records, not hard deletes"
        },
        {
          name: "Confidence Scoring",
          description: "Every record has a quality score"
        },
        {
          name: "Self-Learning Dictionary",
          description: "New errors get auto-corrected in future"
        }
      ],
      insight: "Judges see this as long-term data governance, not a one-time fix."
    },
    {
      id: "irf",
      number: "2",
      name: "Identity Resilience Framework (IRF)",
      tagline: "Solves twins, elderly, biometric failures",
      goal: "Ensure no genuine citizen is denied identity.",
      icon: "🛡️",
      color: "green",
      features: [
        {
          name: "Multi-Factor Identity",
          description: "Biometrics + behavior + history"
        },
        {
          name: "Biometric Aging Model",
          description: "Recognizes natural biometric changes"
        },
        {
          name: "Fail-Safe Mode",
          description: "Temporary access instead of rejection"
        },
        {
          name: "Human-in-the-Loop Escalation",
          description: "Fast-track manual resolution"
        }
      ],
      insight: "Positions your system as human-centric, not rigid."
    },
    {
      id: "afif",
      number: "3",
      name: "Aadhaar Forensic Intelligence Framework (AFIF)",
      tagline: "Fraud & national integrity angle",
      goal: "Detect organized misuse, not punish individuals.",
      icon: "🔍",
      color: "red",
      features: [
        {
          name: "Registration Hub Detection",
          description: "Unusual spikes from one center/IP"
        },
        {
          name: "Network Graph Analysis",
          description: "Find linked suspicious identities"
        },
        {
          name: "Risk-Based Alerts",
          description: "Soft warnings → audits → enforcement"
        },
        {
          name: "Tamper-Evident Logs",
          description: "Immutable audit trail"
        }
      ],
      insight: "This screams security + governance maturity."
    },
    {
      id: "prof",
      number: "4",
      name: "Public Resource Optimization Framework (PROF)",
      tagline: "Policy-maker favorite",
      goal: "Use Aadhaar insights to allocate resources better.",
      icon: "📊",
      color: "purple",
      features: [
        {
          name: "Migration Pressure Index",
          description: "Shows stressed districts"
        },
        {
          name: "Predictive Demand Forecasting",
          description: "Health, ration, enrollment load"
        },
        {
          name: "Automated Recommendations",
          description: "Vans, staff, funding"
        },
        {
          name: "Outcome Feedback Loop",
          description: "Did policy action work?"
        }
      ],
      insight: "Converts data into action, which juries love."
    },
    {
      id: "amf",
      number: "5",
      name: "Aadhaar Mobility Framework (AMF)",
      tagline: "Migration-aware identity framework",
      goal: "Enable Aadhaar to accurately capture temporary migration, prevent duplicate identities, and ensure seamless access to services for mobile populations.",
      icon: "🚶",
      color: "orange",
      features: [
        {
          name: "Mobility Status Tiers",
          description: "Permanent Resident, Active Migrant, Transitioning Migrant"
        },
        {
          name: "G2B API Handshake",
          description: "Verified employers vouch for temporary residence"
        },
        {
          name: "Virtual Geo-Fencing",
          description: "Validates temporary address near workplace"
        },
        {
          name: "Time-Bound Address Leasing",
          description: "Temporary addresses with expiry period"
        },
        {
          name: "Dual-Address Model",
          description: "Home Address + Presence Address"
        },
        {
          name: "Mobility Event Log",
          description: "All migrations stored as events"
        },
        {
          name: "Cross-State Identity Lock",
          description: "One active entitlement location at a time"
        },
        {
          name: "Community/NGO Verification",
          description: "Extended coverage to informal workers"
        },
        {
          name: "Mobility Risk Score",
          description: "Dynamic score based on movement patterns"
        },
        {
          name: "Auto-Expiry Safety Net",
          description: "SMS/App alerts before expiry"
        }
      ],
      insight: "Designed for India-specific migration patterns with seasonal migration mode support."
    },
    {
      id: "ppaf",
      number: "6",
      name: "Privacy-Preserving Analytics Framework (PPAF)",
      tagline: "Advanced, regulation-safe",
      goal: "Extract insights without exposing individuals.",
      icon: "🔒",
      color: "indigo",
      features: [
        {
          name: "Differential Privacy",
          description: "For dashboards and aggregated data"
        },
        {
          name: "Federated Analytics",
          description: "Across states without data sharing"
        },
        {
          name: "Hashed Identity Signals",
          description: "For deduplication without revealing identity"
        },
        {
          name: "Policy-Only Access Views",
          description: "Restricted data access for decision-makers"
        }
      ],
      insight: "Future-ready, regulation-safe analytics approach."
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
      green: "border-green-500 bg-green-50 dark:bg-green-900/20",
      red: "border-red-500 bg-red-50 dark:bg-red-900/20",
      purple: "border-[#94ABE8] bg-[#94ABE8]/10 dark:bg-[#94ABE8]/20",
      orange: "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
      indigo: "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4 text-primary-lavender" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="text-primary-lavender font-semibold">Framework Architecture</span>
        </div>
        <h1 className="text-4xl font-bold text-gradient">
          FRAMEWORKS
        </h1>
        <div className="w-24 h-1 bg-primary-lavender rounded-full mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Six modular, jury-friendly frameworks designed for Aadhaar data integrity, identity resilience, 
          fraud detection, resource optimization, mobility tracking, and privacy-preserving analytics.
        </p>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="border border-border bg-card hover:shadow-3d-hover transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{framework.icon}</span>
                    <Badge variant="outline" className="border-border text-muted-foreground">{framework.number}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight mt-2 text-foreground">{framework.name}</CardTitle>
                  <CardDescription className="text-xs italic text-muted-foreground">{framework.tagline}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-1 text-foreground">🎯 Goal:</p>
                <p className="text-sm text-muted-foreground">{framework.goal}</p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 text-foreground">Core Components:</p>
                <ul className="space-y-2">
                  {framework.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="text-xs">
                      <span className="font-medium text-gray-900">{feature.name}:</span>{" "}
                      <span className="text-gray-500">{feature.description}</span>
                    </li>
                  ))}
                  {framework.features.length > 4 && (
                    <li className="text-xs text-gray-500 italic">
                      +{framework.features.length - 4} more components...
                    </li>
                  )}
                </ul>
              </div>

              <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg border">
                <p className="text-xs font-semibold mb-1">💡 Key Insight:</p>
                <p className="text-xs text-muted-foreground italic">{framework.insight}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Framework Details</CardTitle>
          <CardDescription>Explore each framework in depth</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="amf" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {frameworks.map((fw) => (
                <TabsTrigger key={fw.id} value={fw.id} className="text-xs">
                  {fw.icon} {fw.number}
                </TabsTrigger>
              ))}
            </TabsList>

            {frameworks.map((framework) => (
              <TabsContent key={framework.id} value={framework.id} className="space-y-4 mt-6">
                <div className={`p-6 rounded-lg border-2 ${getColorClasses(framework.color)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{framework.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{framework.name}</h3>
                      <p className="text-sm text-muted-foreground italic">{framework.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-background rounded-lg">
                    <p className="text-sm font-semibold mb-2">🎯 Primary Goal:</p>
                    <p className="text-base">{framework.goal}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {framework.features.map((feature, idx) => (
                      <div key={idx} className="p-4 bg-background rounded-lg border">
                        <p className="font-semibold text-sm mb-1">{feature.name}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-semibold mb-2">💡 Why This Matters:</p>
                    <p className="text-sm">{framework.insight}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
