// Enhanced project types with better developer mapping and metadata

export type ProjectStatus = "active" | "completed" | "in-progress" | "archived"
export type ProjectDifficulty = "beginner" | "intermediate" | "advanced"
export type ProjectCategory = "Web Development" | "Mobile" | "AI/ML" | "IoT" | "Data Science" | "Blockchain" | "DevOps" | "UI/UX" | "Game Development" | "Other"

export interface ProjectContributor {
  developerId: number
  name: string
  role: "Lead Developer" | "Contributor" | "Maintainer" | "Designer" | "Tester"
  contributions?: string[]
}

export interface ProjectLink {
  label: string
  url: string
  type: "github" | "live" | "demo" | "docs" | "figma" | "other"
}

export interface ProjectMetrics {
  stars?: number
  forks?: number
  downloads?: number
  views?: number
  likes?: number
}

export interface Project {
  id: number | string
  title: string
  tagline?: string
  summary?: string
  description: string
  category: ProjectCategory
  
  // Technical details
  stack: string[]
  difficulty: ProjectDifficulty
  status: ProjectStatus
  
  // Team and collaboration
  contributors: ProjectContributor[]
  teamSize: number
  
  // Links and resources
  links: ProjectLink[]
  githubUrl: string
  liveUrl?: string
  
  // Media
  image: string
  screenshots?: string[]
  videoUrl?: string
  
  // Metadata
  createdDate: string
  lastUpdated: string
  duration?: string // e.g., "2 months", "6 weeks"
  
  // Engagement metrics
  metrics?: ProjectMetrics
  
  // Features and highlights
  features?: string[]
  technologies?: string[]
  challenges?: string[]
  learnings?: string[]
  
  // SEO and discovery
  tags: string[]
  featured: boolean
  trending?: boolean
}

export interface ProjectFilter {
  category?: ProjectCategory[]
  difficulty?: ProjectDifficulty[]
  status?: ProjectStatus[]
  stack?: string[]
  contributors?: number[]
  featured?: boolean
  trending?: boolean
}

export interface ProjectSort {
  field: "title" | "createdDate" | "lastUpdated" | "stars" | "views" | "teamSize"
  direction: "asc" | "desc"
}

// Legacy interfaces for backward compatibility
export interface GalleryProject {
  id: string
  title: string
  summary: string
  url: string
  image: string
}