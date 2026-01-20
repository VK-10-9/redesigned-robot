import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, Code, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Learning Materials",
      description: "Curated educational content for entrepreneurs",
      icon: <BookOpen className="h-6 w-6" />,
      resources: [
        { name: "Startup Fundamentals Guide", type: "PDF", url: "#" },
        { name: "Business Model Canvas Template", type: "Template", url: "#" },
        { name: "Market Research Toolkit", type: "Guide", url: "#" },
        { name: "Financial Planning Spreadsheet", type: "Excel", url: "#" }
      ]
    },
    {
      title: "Video Tutorials",
      description: "Expert-led video content on key topics",
      icon: <Video className="h-6 w-6" />,
      resources: [
        { name: "Pitch Deck Masterclass", type: "Video", url: "#" },
        { name: "Technical Architecture Planning", type: "Video", url: "#" },
        { name: "Fundraising Strategies", type: "Video", url: "#" },
        { name: "Product-Market Fit Workshop", type: "Video", url: "#" }
      ]
    },
    {
      title: "Templates & Tools",
      description: "Ready-to-use templates and productivity tools",
      icon: <FileText className="h-6 w-6" />,
      resources: [
        { name: "Legal Document Templates", type: "Bundle", url: "#" },
        { name: "Project Management Template", type: "Notion", url: "#" },
        { name: "Marketing Plan Template", type: "Document", url: "#" },
        { name: "User Research Kit", type: "Bundle", url: "#" }
      ]
    },
    {
      title: "Technical Resources",
      description: "Development tools and technical guidance",
      icon: <Code className="h-6 w-6" />,
      resources: [
        { name: "Development Best Practices", type: "Guide", url: "#" },
        { name: "API Design Standards", type: "Document", url: "#" },
        { name: "Security Checklist", type: "Checklist", url: "#" },
        { name: "Deployment Guide", type: "Tutorial", url: "#" }
      ]
    }
  ]

  const featuredResources = [
    {
      title: "The Complete Startup Handbook",
      description: "Comprehensive guide covering every aspect of building a tech startup from idea to IPO.",
      author: "Nex10 Labs Team",
      type: "eBook",
      pages: 150,
      downloads: "2.5K+",
      rating: 4.9,
      url: "#",
      featured: true
    },
    {
      title: "Fundraising Field Guide",
      description: "Step-by-step guide to raising capital, from angel investors to Series A and beyond.",
      author: "Sarah Chen, Former VC",
      type: "Guide",
      pages: 80,
      downloads: "1.8K+",
      rating: 4.8,
      url: "#",
      featured: true
    },
    {
      title: "Technical Leadership Playbook",
      description: "Essential guide for technical founders on building and leading engineering teams.",
      author: "Alex Kumar, CTO",
      type: "Guide",
      pages: 120,
      downloads: "1.2K+",
      rating: 4.7,
      url: "#",
      featured: true
    }
  ]

  const webinars = [
    {
      title: "Building Your MVP: From Concept to Launch",
      presenter: "Dr. Michael Rodriguez",
      date: "Feb 20, 2025",
      time: "3:00 PM EST",
      duration: "60 minutes",
      registrations: 250,
      status: "upcoming"
    },
    {
      title: "Scaling Your Startup: Growth Strategies That Work",
      presenter: "Emma Davis, Growth Expert",
      date: "Feb 15, 2025",
      time: "2:00 PM EST", 
      duration: "90 minutes",
      registrations: 180,
      status: "upcoming"
    },
    {
      title: "Investor Pitch Masterclass",
      presenter: "James Wilson, Partner at TechVC",
      date: "Jan 25, 2025",
      time: "4:00 PM EST",
      duration: "75 minutes",
      views: 450,
      status: "recorded"
    }
  ]

  const tools = [
    {
      name: "Startup Toolkit",
      description: "Complete suite of tools for startup management",
      category: "Management",
      pricing: "Free for Nex10 participants",
      features: ["Project tracking", "Team collaboration", "Metrics dashboard", "Document storage"]
    },
    {
      name: "Financial Modeling Tool",
      description: "Advanced financial planning and forecasting",
      category: "Finance",
      pricing: "Free access",
      features: ["Revenue modeling", "Cash flow projection", "Scenario planning", "Investor reports"]
    },
    {
      name: "Customer Research Platform",
      description: "Conduct user interviews and analyze feedback",
      category: "Research",
      pricing: "Discounted rates",
      features: ["Survey builder", "Interview scheduling", "Data analysis", "Insights reports"]
    }
  ]

  const getResourceTypeColor = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    const colors: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      "PDF": "default",
      "Video": "destructive",
      "Template": "secondary",
      "Guide": "outline",
      "eBook": "default",
      "Bundle": "secondary"
    }
    return colors[type] || "default"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Access our comprehensive library of resources, tools, and educational content 
          designed to help you build and scale your startup successfully.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <FileText className="h-4 w-4 mr-2" />
            100+ Resources
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Download className="h-4 w-4 mr-2" />
            10K+ Downloads
          </Badge>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={getResourceTypeColor(resource.type)}>
                    {resource.type}
                  </Badge>
                  <Badge>Featured</Badge>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Author:</span>
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pages:</span>
                    <span>{resource.pages} pages</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Downloads:</span>
                    <span>{resource.downloads}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating:</span>
                    <span>{resource.rating}/5 ⭐</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href={resource.url} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Resource Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge variant={getResourceTypeColor(resource.type)} className="text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <Button asChild size="sm" variant="neutral">
                        <Link href={resource.url}>
                          <Download className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Webinars */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Webinars & Workshops</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {webinars.map((webinar, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={webinar.status === "upcoming" ? "default" : "outline"}>
                    {webinar.status === "upcoming" ? "Upcoming" : "Recorded"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{webinar.duration}</span>
                </div>
                <CardTitle className="text-lg">{webinar.title}</CardTitle>
                <CardDescription>Presented by {webinar.presenter}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{webinar.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {webinar.status === "upcoming" ? "Registered:" : "Views:"}
                    </span>
                    <span>
                      {webinar.status === "upcoming" ? webinar.registrations : webinar.views}
                    </span>
                  </div>
                </div>
                <Button 
                  variant={webinar.status === "upcoming" ? "default" : "neutral"} 
                  className="w-full"
                >
                  {webinar.status === "upcoming" ? "Register Now" : "Watch Recording"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Recommended Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {tool.name}
                  <Badge variant="outline">{tool.category}</Badge>
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <span className="font-medium text-primary">{tool.pricing}</span>
                  </div>
                  <ul className="space-y-1">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="neutral" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Access Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Access CTA */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Get Full Access to All Resources</CardTitle>
            <CardDescription className="text-lg">
              Join Nex10 Labs to unlock our complete resource library, exclusive tools, 
              and premium content designed for serious entrepreneurs.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/nex10/apply">Apply to Nex10 Labs</Link>
            </Button>
            <Button size="lg" variant="neutral" asChild>
              <Link href="/nex10">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
