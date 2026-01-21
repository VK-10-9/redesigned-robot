"use client"

import dynamic from "next/dynamic"
import DashboardNav from "@/components/common/nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NationalOverview = dynamic(
  () => import("@/components/dashboard/national-overview"),
  { ssr: false }
)
const ProjectOverview = dynamic(
  () => import("@/components/dashboard/project-overview"),
  { ssr: false }
)
const FrameworksOverview = dynamic(
  () => import("@/components/dashboard/frameworks-overview"),
  { ssr: false }
)

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-full text-sm font-medium mb-6">
            <span className="text-primary">📊</span>
            <span className="text-primary font-semibold">Analytics Hub</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2" style={{ textShadow: '2px 2px 4px rgba(148, 171, 232, 0.3)' }}>
            OVERVIEW
          </h1>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Explore comprehensive Aadhaar enrollment analytics and framework insights
          </p>
        </div>
        
        <Tabs defaultValue="frameworks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="frameworks">🏗️ Frameworks</TabsTrigger>
            <TabsTrigger value="project">📚 Project Overview</TabsTrigger>
            <TabsTrigger value="national">📊 National Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frameworks">
            <FrameworksOverview />
          </TabsContent>
          
          <TabsContent value="project">
            <ProjectOverview />
          </TabsContent>
          
          <TabsContent value="national">
            <NationalOverview />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
