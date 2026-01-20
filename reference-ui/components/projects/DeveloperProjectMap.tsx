"use client"

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Project } from '@/src/types/project'
import { Developer } from '@/src/types/developer'
import { Github, ExternalLink, User } from 'lucide-react'

interface DeveloperProjectMapProps {
  project: Project
  developers: Developer[]
}

export function DeveloperProjectMap({ project, developers }: DeveloperProjectMapProps) {
  // Get full developer information for each contributor
  const contributorDetails = project.contributors.map(contributor => {
    const developer = developers.find(dev => dev.id === contributor.developerId)
    return {
      ...contributor,
      developer
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Project Team ({project.teamSize} {project.teamSize === 1 ? 'member' : 'members'})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contributorDetails.map(({ developerId, name, role, developer }) => (
          <div key={developerId} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage 
                  src={developer?.avatar || "/placeholder-user.jpg"} 
                  alt={name} 
                />
                <AvatarFallback>
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{name}</h4>
                  <Badge variant={role === "Lead Developer" ? "default" : "secondary"} className="text-xs">
                    {role}
                  </Badge>
                </div>
                {developer && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{developer.role}</span>
                    <span>•</span>
                    <span>{developer.yearsExperience} years exp</span>
                    <span>•</span>
                    <span>{developer.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {developer?.social.github && (
                <Button asChild variant="neutral" size="sm">
                  <Link 
                    href={developer.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="neutral" size="sm">
                <Link href={`/devs/${developer?.username || developerId}`}>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
        
        {/* Skills overlap section */}
        {contributorDetails.length > 1 && (
          <div className="mt-6 pt-4 border-t">
            <h5 className="font-medium mb-3">Team Skills</h5>
            <div className="flex flex-wrap gap-1">
              {getTeamSkills(contributorDetails).map(skill => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to get unique skills from all team members
function getTeamSkills(contributors: Array<{ developer?: Developer }>) {
  const allSkills = contributors
    .flatMap(c => c.developer?.skills || [])
    .filter((skill, index, array) => array.indexOf(skill) === index) // Remove duplicates
    .slice(0, 10) // Limit to 10 skills
  
  return allSkills
}

// Component to show project-developer relationships across multiple projects
interface ProjectDeveloperNetworkProps {
  projects: Project[]
  developers: Developer[]
  developerId?: number
}

export function ProjectDeveloperNetwork({ 
  projects, 
  developers, 
  developerId 
}: ProjectDeveloperNetworkProps) {
  // Filter projects by developer if developerId is provided
  const filteredProjects = developerId 
    ? projects.filter(project => 
        project.contributors.some(c => c.developerId === developerId)
      )
    : projects

  // Get collaboration data (who worked together)
  const collaborations = new Map<string, { count: number; projects: string[] }>()
  
  projects.forEach(project => {
    if (project.contributors.length > 1) {
      project.contributors.forEach((contributor, index) => {
        project.contributors.slice(index + 1).forEach(otherContributor => {
          const key = [contributor.developerId, otherContributor.developerId]
            .sort()
            .join('-')
          
          const existing = collaborations.get(key) || { count: 0, projects: [] }
          collaborations.set(key, {
            count: existing.count + 1,
            projects: [...existing.projects, project.title]
          })
        })
      })
    }
  })

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Developer Network</h3>
      
      {/* Top collaborations */}
      <Card>
        <CardHeader>
          <CardTitle>Top Collaborations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from(collaborations.entries())
              .sort(([, a], [, b]) => b.count - a.count)
              .slice(0, 5)
              .map(([key, { count, projects: collaboratedProjects }]) => {
                const [dev1Id, dev2Id] = key.split('-').map(Number)
                const dev1 = developers.find(d => d.id === dev1Id)
                const dev2 = developers.find(d => d.id === dev2Id)
                
                if (!dev1 || !dev2) return null
                
                return (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <Avatar className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={dev1.avatar} />
                          <AvatarFallback className="text-xs">
                            {dev1.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={dev2.avatar} />
                          <AvatarFallback className="text-xs">
                            {dev2.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {dev1.name} & {dev2.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {count} project{count > 1 ? 's' : ''}: {collaboratedProjects.slice(0, 2).join(', ')}
                          {collaboratedProjects.length > 2 && ` +${collaboratedProjects.length - 2} more`}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}