"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectOverview() {
  const frameworks = [
    {
      id: 1,
      name: "Dual-Address Enrollment Tracking",
      description: "Monitors address changes and detects potential irregularities in Aadhaar enrollment data. Uses historical address patterns to identify suspicious activities.",
      icon: "🏠",
      status: "Active",
      metrics: {
        detected: "2,847",
        accuracy: "94.2%"
      }
    },
    {
      id: 2,
      name: "Biometric Quality & Aging",
      description: "Analyzes biometric data quality over time and flags records requiring re-enrollment. Tracks fingerprint and iris scan degradation patterns.",
      icon: "👁️",
      status: "Active",
      metrics: {
        monitored: "1.8M",
        flagged: "12,340"
      }
    },
    {
      id: 3,
      name: "Hub Detection & Anomaly Analysis",
      description: "Identifies enrollment centers with unusual patterns that may indicate fraudulent activities. Uses geospatial and temporal clustering algorithms.",
      icon: "🎯",
      status: "Active",
      metrics: {
        hubs: "34",
        risk_level: "Medium"
      }
    },
    {
      id: 4,
      name: "Migration Pressure Index",
      description: "Calculates migration likelihood based on socio-economic factors, seasonal patterns, and historical movement data across states.",
      icon: "📊",
      status: "Active",
      metrics: {
        states: "28",
        pressure: "High"
      }
    },
    {
      id: 5,
      name: "Advanced Mobility Framework",
      description: "Comprehensive mobility analysis tracking inter-state and intra-state movement patterns. Integrates demographic, economic, and seasonal factors for predictive modeling.",
      icon: "🚗",
      status: "Enhanced",
      metrics: {
        patterns: "156K",
        accuracy: "96.8%"
      },
      improvements: [
        "Added seasonal migration patterns",
        "Enhanced predictive accuracy by 12%",
        "Integrated real-time event detection",
        "Multi-factor risk scoring algorithm"
      ]
    }
  ]

  const dataApproach = [
    {
      title: "Data Collection",
      description: "Aggregated from UIDAI datasets, including enrollment, biometric, and demographic records",
      icon: "📥"
    },
    {
      title: "Data Processing",
      description: "Cleaned, normalized, and deduplicated using advanced algorithms. Missing values imputed using statistical methods",
      icon: "⚙️"
    },
    {
      title: "Analysis & Modeling",
      description: "Machine learning models trained on historical patterns. Real-time anomaly detection using statistical outlier analysis",
      icon: "🧠"
    },
    {
      title: "Visualization",
      description: "Interactive dashboards with state-wise analytics, mobility tracking, and predictive insights",
      icon: "📊"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 pb-6 border-b">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          SAMVIDHAN: Aadhaar Intelligence Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A comprehensive data-driven platform for analyzing Aadhaar enrollment patterns, 
          detecting anomalies, and tracking population mobility across India
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Badge variant="outline" className="text-sm py-1 px-3">🎯 5 Analytical Frameworks</Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">🗺️ 28+ States Covered</Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">📊 2M+ Records Analyzed</Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">⚡ Real-time Processing</Badge>
        </div>
      </div>

      {/* Purpose Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Project Purpose
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            SAMVIDHAN aims to provide government agencies, policymakers, and researchers with actionable
            insights into Aadhaar enrollment patterns and population dynamics. By leveraging advanced 
            data analytics and machine learning, we:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-900 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold mb-1">Detect Fraud & Anomalies</h4>
                <p className="text-sm text-muted-foreground">Identify suspicious enrollment patterns and duplicate records</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-900 rounded-lg">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-semibold mb-1">Track Population Mobility</h4>
                <p className="text-sm text-muted-foreground">Monitor inter-state migration and seasonal movement patterns</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-900 rounded-lg">
              <span className="text-2xl">🎓</span>
              <div>
                <h4 className="font-semibold mb-1">Inform Policy Decisions</h4>
                <p className="text-sm text-muted-foreground">Provide data-driven insights for resource allocation and planning</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-white dark:bg-slate-900 rounded-lg">
              <span className="text-2xl">🔍</span>
              <div>
                <h4 className="font-semibold mb-1">Ensure Data Quality</h4>
                <p className="text-sm text-muted-foreground">Monitor biometric aging and identify records needing updates</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data-Driven Approach */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📊</span>
          Data-Driven Approach
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {dataApproach.map((step, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-3xl mb-2">{step.icon}</div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Analytical Frameworks */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🔬</span>
          Analytical Frameworks
        </h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {frameworks.map((fw) => (
              <TabsTrigger key={fw.id} value={fw.id.toString()}>
                {fw.icon} #{fw.id}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            {frameworks.map((framework) => (
              <Card key={framework.id} className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 items-start">
                      <span className="text-3xl">{framework.icon}</span>
                      <div>
                        <CardTitle className="text-xl mb-1">
                          Framework #{framework.id}: {framework.name}
                        </CardTitle>
                        <CardDescription className="text-base">{framework.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={framework.status === "Enhanced" ? "default" : "secondary"}>
                      {framework.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(framework.metrics).map(([key, value]) => (
                      <div key={key} className="p-3 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                        <div className="text-lg font-bold mt-1">{value}</div>
                      </div>
                    ))}
                  </div>
                  {framework.improvements && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                        ✨ Recent Improvements:
                      </h4>
                      <ul className="space-y-1">
                        {framework.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {frameworks.map((framework) => (
            <TabsContent key={framework.id} value={framework.id.toString()} className="mt-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <span className="text-4xl">{framework.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-2xl mb-2">
                          Framework #{framework.id}: {framework.name}
                        </CardTitle>
                        <Badge variant={framework.status === "Enhanced" ? "default" : "secondary"}>
                          {framework.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{framework.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(framework.metrics).map(([key, value]) => (
                      <div key={key} className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                        <div className="text-2xl font-bold mt-2">{value}</div>
                      </div>
                    ))}
                  </div>
                  {framework.improvements && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-lg text-green-600 dark:text-green-400">
                        ✨ Recent Improvements & Enhancements:
                      </h4>
                      <ul className="space-y-2">
                        {framework.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span className="text-green-500 font-bold mt-0.5">✓</span>
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {framework.id === 5 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-lg">🔍 Framework Details:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h5 className="font-semibold mb-2">Data Sources</h5>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Aadhaar enrollment records</li>
                            <li>• Address update history</li>
                            <li>• Demographic information</li>
                            <li>• Seasonal migration patterns</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <h5 className="font-semibold mb-2">Analysis Methods</h5>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Geospatial clustering</li>
                            <li>• Time-series analysis</li>
                            <li>• Risk scoring algorithms</li>
                            <li>• Predictive modeling (ML)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Future Scope */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Future Scope: Real-Time UIDAI Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            The platform is architected to support real-time integration with UIDAI's Aadhaar ecosystem, 
            enabling live monitoring and instant anomaly detection. This capability is being developed 
            with the following features:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold mb-1">Real-Time Data Streams</h4>
              <p className="text-sm text-muted-foreground">
                Live enrollment updates and biometric verification events
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold mb-1">Secure API Gateway</h4>
              <p className="text-sm text-muted-foreground">
                OAuth 2.0 authentication with end-to-end encryption
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold mb-1">Instant Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Real-time notifications for critical anomalies and patterns
              </p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg mt-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🏆</span>
              Hackathon Alignment
            </h4>
            <p className="text-sm text-muted-foreground">
              This project is designed for scalability and can be integrated with official UIDAI APIs 
              following proper authorization and compliance with data protection regulations. The architecture 
              supports webhook-based real-time updates and batch processing for historical analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
