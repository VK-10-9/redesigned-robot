import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { StatsSection } from "@/components/sections/StatsSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </div>
  )
}
