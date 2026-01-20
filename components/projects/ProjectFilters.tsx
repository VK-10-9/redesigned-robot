"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProjectFilter, ProjectSort, ProjectCategory, ProjectDifficulty, ProjectStatus } from '@/src/types/project'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: ProjectFilter
  onFiltersChange: (filters: ProjectFilter) => void
  sort: ProjectSort
  onSortChange: (sort: ProjectSort) => void
  totalProjects: number
  filteredCount: number
}

const categories: ProjectCategory[] = [
  "Web Development", "Mobile", "AI/ML", "IoT", "Data Science", 
  "Blockchain", "DevOps", "UI/UX", "Game Development", "Other"
]

const difficulties: ProjectDifficulty[] = ["beginner", "intermediate", "advanced"]
const statuses: ProjectStatus[] = ["active", "completed", "in-progress", "archived"]

const popularTech = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", "Flutter",
  "TensorFlow", "Firebase", "PostgreSQL", "Docker"
]

export function ProjectFilters({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  sort, 
  onSortChange,
  totalProjects,
  filteredCount
}: ProjectFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleCategoryChange = (category: ProjectCategory, checked: boolean) => {
    const newCategories = checked 
      ? [...(filters.category || []), category]
      : (filters.category || []).filter(c => c !== category)
    onFiltersChange({ ...filters, category: newCategories.length > 0 ? newCategories : undefined })
  }

  const handleDifficultyChange = (difficulty: ProjectDifficulty, checked: boolean) => {
    const newDifficulties = checked 
      ? [...(filters.difficulty || []), difficulty]
      : (filters.difficulty || []).filter(d => d !== difficulty)
    onFiltersChange({ ...filters, difficulty: newDifficulties.length > 0 ? newDifficulties : undefined })
  }

  const handleStatusChange = (status: ProjectStatus, checked: boolean) => {
    const newStatuses = checked 
      ? [...(filters.status || []), status]
      : (filters.status || []).filter(s => s !== status)
    onFiltersChange({ ...filters, status: newStatuses.length > 0 ? newStatuses : undefined })
  }

  const handleTechChange = (tech: string, checked: boolean) => {
    const newStack = checked 
      ? [...(filters.stack || []), tech]
      : (filters.stack || []).filter(t => t !== tech)
    onFiltersChange({ ...filters, stack: newStack.length > 0 ? newStack : undefined })
  }

  const clearFilters = () => {
    onFiltersChange({})
    onSearchChange('')
  }

  const hasActiveFilters = Object.values(filters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== undefined
  ) || searchQuery.length > 0

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category?.length) count += filters.category.length
    if (filters.difficulty?.length) count += filters.difficulty.length
    if (filters.status?.length) count += filters.status.length
    if (filters.stack?.length) count += filters.stack.length
    if (filters.featured) count++
    if (filters.trending) count++
    return count
  }

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects by title, description, or technology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={`${sort.field}-${sort.direction}`} onValueChange={(value) => {
            const [field, direction] = value.split('-') as [ProjectSort['field'], ProjectSort['direction']]
            onSortChange({ field, direction })
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastUpdated-desc">Latest</SelectItem>
              <SelectItem value="createdDate-desc">Newest</SelectItem>
              <SelectItem value="title-asc">A to Z</SelectItem>
              <SelectItem value="title-desc">Z to A</SelectItem>
              <SelectItem value="stars-desc">Most Stars</SelectItem>
              <SelectItem value="views-desc">Most Views</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filter Sheet */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="neutral" className="relative">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs min-w-5 h-5">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Projects</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 pt-6">
                <FilterSection 
                  title="Category" 
                  items={categories} 
                  selectedItems={filters.category || []}
                  onItemChange={handleCategoryChange}
                />
                <FilterSection 
                  title="Difficulty" 
                  items={difficulties} 
                  selectedItems={filters.difficulty || []}
                  onItemChange={handleDifficultyChange}
                />
                <FilterSection 
                  title="Status" 
                  items={statuses} 
                  selectedItems={filters.status || []}
                  onItemChange={handleStatusChange}
                />
                <FilterSection 
                  title="Technology" 
                  items={popularTech} 
                  selectedItems={filters.stack || []}
                  onItemChange={handleTechChange}
                />
                
                {/* Special Filters */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Special</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={filters.featured || false}
                        onCheckedChange={(checked) => 
                          onFiltersChange({ ...filters, featured: checked ? true : undefined })
                        }
                      />
                      <Label htmlFor="featured" className="text-sm">Featured Projects</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trending"
                        checked={filters.trending || false}
                        onCheckedChange={(checked) => 
                          onFiltersChange({ ...filters, trending: checked ? true : undefined })
                        }
                      />
                      <Label htmlFor="trending" className="text-sm">Trending Projects</Label>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters and Results */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="neutral"
              size="sm"
              onClick={clearFilters}
              className="h-7"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          )}
          
          {filters.category?.map(category => (
            <Badge key={category} variant="secondary" className="h-7">
              {category}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleCategoryChange(category, false)}
              />
            </Badge>
          ))}
          
          {filters.difficulty?.map(difficulty => (
            <Badge key={difficulty} variant="secondary" className="h-7">
              {difficulty}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleDifficultyChange(difficulty, false)}
              />
            </Badge>
          ))}
          
          {filters.stack?.map(tech => (
            <Badge key={tech} variant="secondary" className="h-7">
              {tech}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => handleTechChange(tech, false)}
              />
            </Badge>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {filteredCount} of {totalProjects} projects
        </div>
      </div>
    </div>
  )
}

interface FilterSectionProps<T extends string> {
  title: string
  items: T[]
  selectedItems: T[]
  onItemChange: (item: T, checked: boolean) => void
}

function FilterSection<T extends string>({ 
  title, 
  items, 
  selectedItems, 
  onItemChange 
}: FilterSectionProps<T>) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map(item => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) => onItemChange(item, !!checked)}
            />
            <Label htmlFor={`${title}-${item}`} className="text-sm capitalize">
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}