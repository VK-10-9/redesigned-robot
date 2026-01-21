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
    <div className="min-h-screen bg-white">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
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
