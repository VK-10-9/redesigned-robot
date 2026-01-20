import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI & Machine Learning Projects | VishwaDev",
  description: "Cutting-edge AI and ML projects by students: NLP, CV, recommendation systems, and more.",
}

export default function AIMLProjectsPage() {
  const aiMlProjects = [
    {
      title: "Sentiment Analysis Tool",
      description: "Real-time sentiment analysis of social media posts using transformer models.",
      technologies: ["Python", "Transformers", "Flask", "React"],
      author: "Priya Sharma",
      difficulty: "Advanced",
      github: "#",
      demo: "#"
    },
    {
      title: "Image Classification API",
      description: "REST API for custom image classification with transfer learning.",
      technologies: ["TensorFlow", "FastAPI", "Docker", "AWS"],
      author: "David Park",
      difficulty: "Intermediate",
      github: "#",
      demo: "#"
    },
    {
      title: "Chatbot Framework",
      description: "Extensible chatbot framework with NLP capabilities and intent recognition.",
      technologies: ["Python", "spaCy", "SQLite", "Streamlit"],
      author: "Emma Wilson",
      difficulty: "Beginner",
      github: "#",
      demo: "#"
    },
    {
      title: "Recommendation Engine",
      description: "Collaborative filtering recommendation system for e-commerce platforms.",
      technologies: ["Python", "Scikit-learn", "PostgreSQL", "Redis"],
      author: "Raj Patel",
      difficulty: "Advanced",
      github: "#",
      demo: "#"
    }
  ]

  const getDifficultyColor = (difficulty: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty) {
      case "Beginner": return "default"
      case "Intermediate": return "secondary"
      case "Advanced": return "destructive"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI & Machine Learning Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore cutting-edge AI and ML projects built by students. From natural language processing
            to computer vision, discover the latest in artificial intelligence.
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiMlProjects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {project.title}
                <Badge variant={getDifficultyColor(project.difficulty)}>
                  {project.difficulty}
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
