import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile App Projects | VishwaDev",
  description: "Native and cross-platform mobile applications built by students.",
}

export default function MobileProjectsPage() {
  const mobileProjects = [
    {
      title: "Fitness Tracker",
      description: "Cross-platform fitness tracking app with workout plans, progress analytics, and social features.",
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      author: "Maya Patel",
      platform: "Cross-platform",
      github: "#",
      playStore: "#",
      appStore: "#"
    },
    {
      title: "Food Delivery App",
      description: "Complete food delivery solution with real-time tracking, payment integration, and reviews.",
      technologies: ["Flutter", "Dart", "Node.js", "MongoDB"],
      author: "Kevin Lee",
      platform: "Cross-platform",
      github: "#",
      playStore: "#",
      appStore: "#"
    },
    {
      title: "Language Learning",
      description: "Interactive language learning app with gamification, speech recognition, and progress tracking.",
      technologies: ["Swift", "Core Data", "Speech Framework"],
      author: "Isabella Garcia",
      platform: "iOS",
      github: "#",
      playStore: null,
      appStore: "#"
    },
    {
      title: "Budget Manager",
      description: "Personal finance management app with expense tracking, budgeting tools, and financial insights.",
      technologies: ["Kotlin", "Room", "Retrofit", "Material Design"],
      author: "Yuki Tanaka",
      platform: "Android",
      github: "#",
      playStore: "#",
      appStore: null
    },
    {
      title: "Study Planner",
      description: "Student study planner with calendar integration, task management, and productivity metrics.",
      technologies: ["React Native", "TypeScript", "SQLite", "Expo"],
      author: "Oliver Schmidt",
      platform: "Cross-platform",
      github: "#",
      playStore: "#",
      appStore: "#"
    },
    {
      title: "Social Media App",
      description: "Privacy-focused social media platform with encrypted messaging and content sharing.",
      technologies: ["Flutter", "Firebase", "GetX", "Cloud Functions"],
      author: "Zara Ahmed",
      platform: "Cross-platform",
      github: "#",
      playStore: "#",
      appStore: "#"
    }
  ]

  const getPlatformColor = (platform: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (platform) {
      case "iOS": return "default"
      case "Android": return "secondary"
      case "Cross-platform": return "destructive"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mobile App Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Native and cross-platform mobile applications built by students. Explore iOS, Android,
            and hybrid mobile solutions across various domains.
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mobileProjects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{project.title}</span>
                <Badge variant={getPlatformColor(project.platform)}>
                  {project.platform}
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
                  <Link href={project.github}>GitHub</Link>
                </Button>
                {project.playStore && (
                  <Button asChild variant="neutral" size="sm">
                    <Link href={project.playStore}>Play Store</Link>
                  </Button>
                )}
                {project.appStore && (
                  <Button asChild variant="neutral" size="sm">
                    <Link href={project.appStore}>App Store</Link>
                  </Button>
                )}
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
