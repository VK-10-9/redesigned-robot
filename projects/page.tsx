"use client"

import { useState, useMemo } from 'react'
import { projects } from './projects-data'
import { developers } from '../devs/developers-data'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters } from '@/components/projects/ProjectFilters'
import { ProjectDeveloperNetwork } from '@/components/projects/DeveloperProjectMap'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectFilter, ProjectSort } from '@/src/types/project'
import { Folder, TrendingUp, Users, Code2, BarChart3 } from 'lucide-react'

// Note: In a real app, this would be handled in _app.tsx or layout.tsx
// export const metadata: Metadata = {
//   title: "Projects | VishwaDev",
//   description: "Explore innovative student projects across AI/ML, Web, Mobile, and IoT at VishwaDev.",
// }

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ProjectFilter>({})
  const [sort, setSort] = useState<ProjectSort>({ field: 'lastUpdated', direction: 'desc' })

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !project.title.toLowerCase().includes(query) &&
          !project.description.toLowerCase().includes(query) &&
          !project.stack.some(tech => tech.toLowerCase().includes(query)) &&
          !project.tags.some(tag => tag.toLowerCase().includes(query))
        ) {
          return false
        }
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(project.category)) return false
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(project.difficulty)) return false
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(project.status)) return false
      }

      // Tech stack filter
      if (filters.stack && filters.stack.length > 0) {
        if (!filters.stack.some(tech => project.stack.includes(tech))) return false
      }

      // Featured filter
      if (filters.featured && !project.featured) return false

      // Trending filter
      if (filters.trending && !project.trending) return false

      return true
    })

    // Sort projects
    return filtered.sort((a, b) => {
      const { field, direction } = sort
      const multiplier = direction === 'asc' ? 1 : -1

      switch (field) {
        case 'title':
          return multiplier * a.title.localeCompare(b.title)
        case 'createdDate':
          return multiplier * (new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
        case 'lastUpdated':
          return multiplier * (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime())
        case 'stars':
          return multiplier * ((a.metrics?.stars || 0) - (b.metrics?.stars || 0))
        case 'views':
          return multiplier * ((a.metrics?.views || 0) - (b.metrics?.views || 0))
        case 'teamSize':
          return multiplier * (a.teamSize - b.teamSize)
        default:
          return 0
      }
    })
  }, [searchQuery, filters, sort])

  // Get statistics
  const stats = useMemo(() => {
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === 'active').length
    const featuredProjects = projects.filter(p => p.featured).length
    const totalDevelopers = new Set(projects.flatMap(p => p.contributors.map(c => c.developerId))).size
    const categories = [...new Set(projects.map(p => p.category))].length

    return {
      totalProjects,
      activeProjects,
      featuredProjects,
      totalDevelopers,
      categories
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Student Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover innovative projects built by talented students. Filter by technology, difficulty, and more.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <Folder className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">{stats.totalDevelopers}</div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <Code2 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold">{stats.categories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-2xl font-bold">{stats.featuredProjects}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">All Projects</TabsTrigger>
            <TabsTrigger value="network">Developer Network</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            {/* Filters */}
            <ProjectFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFiltersChange={setFilters}
              sort={sort}
              onSortChange={setSort}
              totalProjects={projects.length}
              filteredCount={filteredProjects.length}
            />

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({})
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="network">
            <ProjectDeveloperNetwork 
              projects={projects} 
              developers={developers} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
