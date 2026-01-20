import EnhancedMobilityFramework from "@/components/dashboard/enhanced-mobility-framework"
import DashboardNav from "@/components/dashboard/nav"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <EnhancedMobilityFramework />
      </main>
    </div>
  )
}
