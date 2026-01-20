import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Featured Projects | VishwaDev",
  description: "Showcase of the most innovative and impactful student projects on VishwaDev.",
}

export default function FeaturedProjectsPage() {
  const featuredProjects = [
    {
      title: "EcoTracker AI",
      description: "AI-powered carbon footprint tracking application with real-time analytics and personalized recommendations.",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
      author: "Sarah Chen",
      github: "#",
      demo: "#",
      image: "/placeholder.jpg"
    },
    {
      title: "HealthBot Assistant",
      description: "Intelligent chatbot for preliminary health assessment using natural language processing.",
      technologies: ["Python", "FastAPI", "NLTK", "PostgreSQL"],
      author: "Michael Rodriguez",
      github: "#",
      demo: "#",
      image: "/placeholder.jpg"
    },
    {
      title: "SmartGrid Optimizer",
      description: "IoT-based energy grid optimization system for smart cities with predictive analytics.",
      technologies: ["Arduino", "Python", "React", "InfluxDB"],
      author: "Alex Kumar",
      github: "#",
      demo: "#",
      image: "/placeholder.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase of the most innovative and impactful student projects. These projects demonstrate
            excellence in design, implementation, and real-world application.
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Project Preview</span>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {project.title}
                <Badge variant="secondary">Featured</Badge>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                By {project.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm">
                  <Link href={project.demo}>View Demo</Link>
                </Button>
                <Button asChild variant="neutral" size="sm">
                  <Link href={project.github}>GitHub</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild variant="neutral">
          <Link href="/projects">← Back to All Projects</Link>
        </Button>
      </div>
      </div>
    </div>
  )
}
