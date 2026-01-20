import NationalOverview from "@/components/dashboard/national-overview"
import ProjectOverview from "@/components/dashboard/project-overview"
import FrameworksOverview from "@/components/dashboard/frameworks-overview"
import DashboardNav from "@/components/dashboard/nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
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
