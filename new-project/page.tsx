"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  Upload, 
  Plus, 
  X, 
  Github, 
  ExternalLink, 
  ArrowLeft,
  Save,
  Eye,
  Globe
} from "lucide-react"
import Link from "next/link"

interface ProjectFormData {
  title: string
  description: string
  longDescription: string
  category: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  demoUrl: string
  status: string
}

const categories = [
  "Web Development",
  "Mobile App",
  "AI & Machine Learning", 
  "IoT & Hardware",
  "Game Development",
  "Desktop Application",
  "API & Backend",
  "Data Science",
  "Blockchain",
  "DevOps"
]

const popularTechnologies = [
  "React", "Vue.js", "Angular", "Next.js", "Nuxt.js",
  "Node.js", "Express", "Django", "Flask", "Spring Boot",
  "Python", "JavaScript", "TypeScript", "Java", "C++",
  "PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase",
  "AWS", "Azure", "Docker", "Kubernetes", "Git"
]

export default function NewProjectPage() {
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      category: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      demoUrl: "",
      status: "draft"
    },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const projectData = { ...data, technologies }
    
    try {
      // TODO: Replace with actual API call and use projectData
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to dashboard or show success message
      // TODO: Add success notification
    } catch (error) {
      console.error("Failed to submit project:", error)
      // TODO: Show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  const addTechnology = (tech: string) => {
    if (tech && !technologies.includes(tech)) {
      setTechnologies([...technologies, tech])
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech))
  }

  const handleQuickAdd = (tech: string) => {
    addTechnology(tech)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard?tab=projects">
            <Button variant="neutral" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground">
              Share your project with the VishwaDev community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Essential details about your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{
                        required: "Project title is required",
                        minLength: {
                          value: 3,
                          message: "Title must be at least 3 characters"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="My Awesome Project"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      rules={{
                        required: "Short description is required",
                        maxLength: {
                          value: 200,
                          message: "Description must be less than 200 characters"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A brief overview of what your project does..."
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            {field.value.length}/200 characters
                          </p>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      rules={{ required: "Please select a category" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Technologies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies Used</CardTitle>
                    <CardDescription>
                      Add the technologies, frameworks, and tools used in your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology..."
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(newTech))}
                      />
                      <Button 
                        type="button" 
                        onClick={() => addTechnology(newTech)}
                        variant="neutral"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Quick Add Buttons */}
                    <div>
                      <p className="text-sm font-medium mb-2">Popular Technologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularTechnologies.slice(0, 10).map((tech) => (
                          <Button
                            key={tech}
                            type="button"
                            variant="neutral"
                            size="sm"
                            onClick={() => handleQuickAdd(tech)}
                            disabled={technologies.includes(tech)}
                            className="text-xs"
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Technologies */}
                    {technologies.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Selected Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="pr-1">
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeTechnology(tech)}
                                className="ml-2 text-xs hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Detailed Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Description</CardTitle>
                    <CardDescription>
                      Provide a comprehensive overview of your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="longDescription"
                      rules={{
                        required: "Detailed description is required",
                        minLength: {
                          value: 100,
                          message: "Description must be at least 100 characters"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project in detail. What problem does it solve? How does it work? What makes it unique?"
                              className="resize-none min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            {field.value.length} characters (minimum 100)
                          </p>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Links</CardTitle>
                    <CardDescription>
                      Add links to your project repository, live demo, and documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      rules={{
                        pattern: {
                          value: /^https:\/\/(github\.com|gitlab\.com)/,
                          message: "Please enter a valid GitHub or GitLab URL"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub/GitLab Repository</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                                <Github className="w-4 h-4" />
                              </div>
                              <Input
                                placeholder="https://github.com/username/project"
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="liveUrl"
                      rules={{
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Live Demo URL</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                                <ExternalLink className="w-4 h-4" />
                              </div>
                              <Input
                                placeholder="https://your-project.com"
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="demoUrl"
                      rules={{
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Demo Video URL (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                                <Globe className="w-4 h-4" />
                              </div>
                              <Input
                                placeholder="https://youtube.com/watch?v=..."
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                    onClick={() => form.setValue("status", "published")}
                  >
                    {isLoading ? "Publishing..." : "Publish Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="neutral"
                    disabled={isLoading}
                    className="flex-1"
                    onClick={() => {
                      form.setValue("status", "draft")
                      form.handleSubmit(onSubmit)()
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </CardTitle>
                <CardDescription>
                  See how your project will appear to others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="neutral" 
                  className="w-full"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </Button>
              </CardContent>
            </Card>

            {/* Upload Images */}
            <Card>
              <CardHeader>
                <CardTitle>Project Images</CardTitle>
                <CardDescription>
                  Upload screenshots or demo images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop images here, or click to select
                  </p>
                  <Button variant="neutral" size="sm">
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG up to 5MB each
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Publishing Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Use a clear, descriptive title
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Add relevant technologies
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Include live demo links
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Upload quality screenshots
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    Write detailed descriptions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

