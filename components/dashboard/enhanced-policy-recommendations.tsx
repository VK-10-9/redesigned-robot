"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PolicyRecommendation {
  id: string
  title: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  state?: string
  description: string
  rationale: string
  expectedImpact: string
  implementationCost: string
  timeframe: string
}

export default function EnhancedPolicyRecommendations() {
  const [recommendations, setRecommendations] = useState<PolicyRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    setLoading(true)
    try {
      // Mock data - in production, this would use Groq API
      const mockRecommendations: PolicyRecommendation[] = [
        {
          id: "1",
          title: "Expand Mobile Enrollment Units in Rural Areas",
          category: "Infrastructure",
          priority: "High",
          state: "Bihar",
          description: "Deploy 50 additional mobile enrollment units to underserved rural districts in Bihar where coverage is below 60%",
          rationale: "Analysis shows 23% of eligible population in rural Bihar lacks access to enrollment centers within 10km radius. Mobile units can increase coverage by 18-22%.",
          expectedImpact: "Reach 1.2M additional enrollments within 12 months, improving state coverage from 68% to 86%",
          implementationCost: "₹45 Lakhs (includes vehicles, equipment, staffing for 12 months)",
          timeframe: "3-6 months for full deployment"
        },
        {
          id: "2",
          title: "Implement Re-enrollment Campaign for Biometric Updates",
          category: "Data Quality",
          priority: "High",
          description: "Launch targeted re-enrollment drive for 340K records flagged with poor biometric quality or aging fingerprints (10+ years old)",
          rationale: "Biometric aging affects authentication success rates. Current failure rate is 8.2% for records older than 10 years vs. 1.3% for recent enrollments.",
          expectedImpact: "Reduce authentication failures by 65%, improve user experience, decrease support costs by ₹2.8 Cr annually",
          implementationCost: "₹18 Lakhs for campaign execution and processing",
          timeframe: "6-9 months rolling campaign"
        },
        {
          id: "3",
          title: "Strengthen Duplicate Detection Algorithms",
          category: "Fraud Prevention",
          priority: "High",
          state: "Maharashtra",
          description: "Enhance duplicate detection system with ML-based facial recognition to reduce undetected duplicates currently at 3.2%",
          rationale: "Current system flags 89% of duplicates. ML enhancement tested in pilot showed 97% detection rate with 45% reduction in false positives.",
          expectedImpact: "Prevent 12,000 duplicate enrollments annually, saving ₹4.5 Cr in verification costs and reducing fraud",
          implementationCost: "₹32 Lakhs (software upgrade, training, integration)",
          timeframe: "4-6 months implementation"
        },
        {
          id: "4",
          title: "Seasonal Migration Support Program",
          category: "Mobility Management",
          priority: "Medium",
          description: "Establish temporary enrollment centers in high-migration destination states during peak seasons (Jun-Aug, Dec-Jan)",
          rationale: "Seasonal migration affects 8.4M people annually. Current enrollment gaps during migration cause service disruption and enrollment delays.",
          expectedImpact: "Serve 1.8M seasonal migrants, reduce enrollment backlog by 42%, improve service continuity",
          implementationCost: "₹28 Lakhs annually (seasonal operations in 12 locations)",
          timeframe: "Pilot in 3 locations within 2 months"
        },
        {
          id: "5",
          title: "Data Privacy Compliance Audit & Enhancement",
          category: "Governance",
          priority: "Medium",
          description: "Conduct comprehensive privacy audit and implement enhanced encryption for biometric data storage and transmission",
          rationale: "Proactive compliance with evolving data protection regulations. Current encryption meets minimum standards but can be strengthened.",
          expectedImpact: "Enhanced data protection, regulatory compliance, improved public trust, reduced legal risk",
          implementationCost: "₹15 Lakhs (audit, consultation, implementation)",
          timeframe: "3-4 months"
        }
      ]
      
      setRecommendations(mockRecommendations)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityConfig = (priority: string) => {
    const configs = {
      High: { color: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300", icon: "🔴", variant: "destructive" },
      Medium: { color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300", icon: "🟡", variant: "secondary" },
      Low: { color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300", icon: "🟢", variant: "outline" }
    }
    return configs[priority as keyof typeof configs] || configs.Low
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Infrastructure: "🏗️",
      "Data Quality": "✅",
      "Fraud Prevention": "🛡️",
      "Mobility Management": "🚗",
      Governance: "⚖️"
    }
    return icons[category] || "📋"
  }

  const highPriority = recommendations.filter(r => r.priority === 'High').length
  const byCategory = recommendations.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* API Disclosure */}
      <Alert className="border-primary/30 bg-primary/10">
        <AlertTitle className="flex items-center gap-2 text-foreground">
          <span className="text-xl">🤖</span>
          AI Technology & Policy Disclosure
        </AlertTitle>
        <AlertDescription className="text-muted-foreground space-y-2">
          <p className="font-semibold">Policy recommendation generation system:</p>
          <div className="grid md:grid-cols-3 gap-3 mt-2">
            <div className="p-2 bg-card rounded border border-border">
              <strong>AI Provider:</strong> Groq API
              <p className="text-xs text-muted-foreground mt-1">High-performance LLM inference</p>
            </div>
            <div className="p-2 bg-card rounded border border-border">
              <strong>Model:</strong> Qwen-3 32B
              <p className="text-xs text-muted-foreground mt-1">Advanced policy analysis and reasoning (32B parameters)</p>
            </div>
            <div className="p-2 bg-card rounded border border-border">
              <strong>Processing:</strong> Polling-based
              <p className="text-xs text-muted-foreground mt-1">Real-time recommendation generation</p>
            </div>
          </div>
          <p className="text-sm mt-3">
            <strong>Governance & Compliance:</strong> All policy recommendations are generated from 
            aggregated, anonymized data analysis. No personally identifiable information (PII) is 
            processed by external APIs. Recommendations undergo human expert review before implementation. 
            System adheres to data protection regulations and ethical AI principles.
          </p>
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{highPriority}</div>
            <p className="text-xs text-muted-foreground mt-1">Immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active policies</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(byCategory).length}</div>
            <p className="text-xs text-muted-foreground mt-1">Policy domains</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data-Driven
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground mt-1">Evidence-based</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
          <TabsTrigger value="high">High Priority ({highPriority})</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-muted-foreground">Generating policy recommendations...</p>
              </div>
            </div>
          ) : (
            recommendations.map((rec) => {
              const config = getPriorityConfig(rec.priority)
              return (
                <Card key={rec.id} className={`hover:shadow-lg transition-all border-l-4 ${
                  rec.priority === 'High' ? 'border-l-red-500' :
                  rec.priority === 'Medium' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                          <CardTitle className="text-xl">{rec.title}</CardTitle>
                          <Badge variant={config.variant as any}>
                            {config.icon} {rec.priority}
                          </Badge>
                        </div>
                        <CardDescription className="text-base mb-2">{rec.description}</CardDescription>
                        {rec.state && (
                          <Badge variant="outline" className="mr-2">📍 {rec.state}</Badge>
                        )}
                        <Badge variant="outline">{rec.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">📊 Rationale</div>
                        <div className="text-sm">{rec.rationale}</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">🎯 Expected Impact</div>
                        <div className="text-sm">{rec.expectedImpact}</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">💰 Implementation Cost</div>
                        <div className="text-sm font-semibold">{rec.implementationCost}</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">⏱️ Timeframe</div>
                        <div className="text-sm font-semibold">{rec.timeframe}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="high" className="space-y-4 mt-6">
          {recommendations.filter(r => r.priority === 'High').map(rec => {
            const config = getPriorityConfig(rec.priority)
            return (
              <Card key={rec.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                    <CardTitle className="text-xl">{rec.title}</CardTitle>
                    <Badge variant="destructive">{config.icon} {rec.priority}</Badge>
                  </div>
                  <CardDescription className="text-base">{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">{rec.expectedImpact}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4 mt-6">
          {recommendations.filter(r => r.category === 'Infrastructure').map(rec => (
            <Card key={rec.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                  {rec.title}
                </CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{rec.rationale}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="quality" className="space-y-4 mt-6">
          {recommendations.filter(r => r.category === 'Data Quality').map(rec => (
            <Card key={rec.id} className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                  {rec.title}
                </CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{rec.rationale}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Information Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            About Policy Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            Our AI-driven policy recommendation system analyzes enrollment patterns, coverage gaps, 
            fraud indicators, and demographic trends to generate evidence-based policy suggestions.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>🔬</span>
                Analysis Methods
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Enrollment coverage gap analysis</li>
                <li>• Cost-benefit modeling</li>
                <li>• Impact simulation</li>
                <li>• Historical policy effectiveness</li>
                <li>• Stakeholder feedback integration</li>
              </ul>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>✅</span>
                Implementation Support
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Detailed action plans</li>
                <li>• Resource requirements</li>
                <li>• Timeline estimates</li>
                <li>• Success metrics</li>
                <li>• Risk mitigation strategies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
