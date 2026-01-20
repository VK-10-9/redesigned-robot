import { HeroSection, DeveloperGrid, CallToAction } from "@/components/devs"
import { StatsSection } from "@/components/devs/StatsSection"
import { FeaturedCarousel } from "@/components/devs/FeaturedCarousel"
import { developers } from "./developers-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet the Devs | VishwaDev",
  description: "Explore our developer community and discover talented student innovators.",
}

// Main Page Component
export default function DevsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <HeroSection />
        
        {/* Statistics Section */}
        <StatsSection developers={developers} />
        
        {/* Featured Developers Carousel */}
        <FeaturedCarousel developers={developers} />
        
        {/* Developer Grid with Search, Filter and Sort */}
        <div id="developer-community" className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Developer Community</h2>
          <DeveloperGrid developers={developers} />
        </div>

        <CallToAction />
      </div>
    </div>
  );
}
