import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Web Development Projects | VishwaDev",
  description: "Modern web applications and full-stack solutions built by students.",
}

export default function WebDevProjectsPage() {
  const webProjects = [
    {
      title: "E-Learning Platform",
      description: "Full-stack e-learning platform with video streaming, quizzes, and progress tracking.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      author: "Lisa Zhang",
      type: "Full Stack",
      github: "#",
      demo: "#",
      liveUrl: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      author: "Carlos Martinez",
      type: "Full Stack",
      github: "#",
      demo: "#",
      liveUrl: "#"
    },
    {
      title: "Portfolio Website Builder",
      description: "Drag-and-drop portfolio website builder with customizable themes and templates.",
      technologies: ["Vue.js", "Express", "MySQL", "AWS S3"],
      author: "Anna Kowalski",
      type: "Full Stack",
      github: "#",
      demo: "#",
      liveUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts and data visualization.",
      technologies: ["React", "Chart.js", "Weather API", "Tailwind"],
      author: "James Thompson",
      type: "Frontend",
      github: "#",
      demo: "#",
      liveUrl: "#"
    },
    {
      title: "Recipe Sharing API",
      description: "RESTful API for recipe sharing platform with user authentication and ratings.",
      technologies: ["Node.js", "Express", "JWT", "PostgreSQL"],
      author: "Sofia Rossi",
      type: "Backend",
      github: "#",
      demo: "#",
      liveUrl: "#"
    },
    {
      title: "Blog CMS",
      description: "Content management system for blogs with markdown support and SEO optimization.",
      technologies: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      author: "Ahmed Hassan",
      type: "Full Stack",
      github: "#",
      demo: "#",
      liveUrl: "#"
    }
  ]

  const getTypeColor = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "Frontend": return "default"
      case "Backend": return "secondary"
      case "Full Stack": return "destructive"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Web Development Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern web applications and solutions built by students. Explore frontend, backend,
            and full-stack projects using the latest web technologies.
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webProjects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{project.title}</span>
                <Badge variant={getTypeColor(project.type)}>
                  {project.type}
                </Badge>
              </CardTitle>
              <CardDescription>
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
              <div className="flex gap-2 flex-wrap">
                <Button asChild size="sm">
                  <Link href={project.liveUrl}>Live Site</Link>
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
