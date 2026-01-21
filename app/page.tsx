import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Database, Globe, Shield, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section - SAMVIDHAN Design */}
      <header className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-full text-sm font-medium mb-10">
          <Shield className="w-4 h-4 text-primary-lavender" />
          <span className="text-primary-lavender font-semibold">Trusted Aadhaar Intelligence</span>
        </div>
        
        {/* SAMVIDHAN Title with 3D Shadow */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-2 text-gradient">
          SAMVIDHAN
        </h1>
        
        {/* Underline */}
        <div className="w-32 h-1 bg-primary-lavender rounded-full mb-10"></div>
        
        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Transform Aadhaar Data Into
        </h2>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-lavender mb-6">
          Actionable Insights
        </h2>
        
        {/* Description */}
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 leading-relaxed">
          Advanced analytics platform for enrollment patterns, mobility analysis, and policy recommendations powered by 6 million+ records.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/overview" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-lavender text-white font-semibold rounded-xl shadow-3d hover:shadow-3d-hover transition-all duration-300"
          >
            Explore Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/data-explorer" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-300"
          >
            View Data
          </Link>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-border bg-muted/30">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-1.5">6M+</h2>
            <p className="text-sm text-muted-foreground">Total Enrollments</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-1.5">28</h2>
            <p className="text-sm text-muted-foreground">States Covered</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-1.5">98%</h2>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-1.5">40+</h2>
            <p className="text-sm text-muted-foreground">API Endpoints</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Analytics Platform
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Powered by advanced analytics and machine learning for real-time insights into enrollment patterns and mobility trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  Track enrollment trends, detect anomalies, and monitor state-wise distributions with live dashboards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Mobility Insights</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  Advanced mobility framework tracking interstate migration and seasonal patterns with 98% accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">CSV Database</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  Lightning-fast queries on 6M+ records across 12 CSV files with advanced filtering capabilities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  AI-powered anomaly detection identifying unusual patterns and data quality issues across states.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Demographic Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  Comprehensive demographic breakdowns by age, gender, and urban/rural distribution.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300 bg-card">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary-lavender/15 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-lavender" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">Policy Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-muted-foreground">
                  Data-driven policy insights based on enrollment trends and regional coverage gaps.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-20 px-6 bg-muted/30 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lavender/15 rounded-full text-sm font-semibold text-primary-lavender mb-7">
              6 Intelligence Frameworks
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Multi-Framework Analysis Approach
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform integrates six specialized frameworks for comprehensive data intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "ADIF", desc: "Aadhaar Data Integrity Framework - Data normalization & deduplication" },
              { name: "IRF", desc: "Identity Resilience Framework - Biometric aging & escalation" },
              { name: "AFIF", desc: "Aadhaar Forensic Intelligence Framework - Fraud pattern detection" },
              { name: "PROF", desc: "Program Resource Optimization Framework - Demand forecasting" },
              { name: "AMF", desc: "Aadhaar Mobility Framework - Cross-state tracking & verification" },
              { name: "PPAF", desc: "Privacy-Preserving Analytics Framework - Differential privacy" },
            ].map((fw) => (
              <div key={fw.name} className="p-6 bg-card border border-border rounded-xl hover:shadow-3d-hover transition-all duration-300">
                <h3 className="font-bold text-lg text-primary-lavender mb-2">{fw.name}</h3>
                <p className="text-sm text-muted-foreground">{fw.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1100px] mx-auto py-20 px-6 text-center border-t border-border">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Ready to Explore the Data?
        </h2>
        <p className="max-w-[720px] mx-auto text-lg text-muted-foreground mb-9">
          Access comprehensive Aadhaar analytics with our intuitive dashboard and powerful data explorer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/overview" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-lavender text-white font-semibold rounded-xl shadow-3d hover:shadow-3d-hover transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/infographic" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-300"
          >
            View Infographics
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/30">
        <div className="max-w-[1100px] mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SAMVIDHAN - Aadhaar Intelligence Platform</p>
        </div>
      </footer>
    </main>
  )
}
