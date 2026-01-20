"use client"

import { ArrowRight, Github, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/src/types/project"

interface FeaturedProjectsSectionProps {
  projects: Project[];
  title?: string;
  description?: string;
}

export function FeaturedProjectsSection({ 
  projects, 
  title = "Recently Added Projects",
  description = "Discover the latest innovative solutions built by talented student developers from universities worldwide."
}: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {description}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl mb-2 line-clamp-2">{project.title}</CardTitle>
                    {project.tagline && (
                      <CardDescription className="text-primary font-medium text-sm line-clamp-1">{project.tagline}</CardDescription>
                    )}
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.stack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                )}
                {project.contributors.length > 0 && (
                  <div className="text-xs text-muted-foreground truncate">
                    By: {project.contributors.slice(0, 2).join(", ")}{project.contributors.length > 2 && ` +${project.contributors.length - 2}`}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button variant="neutral" className="w-full sm:w-auto">
            View All Projects
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
