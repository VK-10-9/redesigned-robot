"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  Code, 
  Zap, 
  Users, 
  Settings, 
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  Download,
  Star
} from "lucide-react";

const documentationSections = [
  {
    title: "Getting Started",
    description: "Quick start guide and basic setup instructions",
    icon: <Zap className="w-6 h-6" />,
    articles: [
      { title: "Platform Overview", type: "guide", readTime: "5 min" },
      { title: "Account Setup", type: "tutorial", readTime: "10 min" },
      { title: "First Steps", type: "guide", readTime: "8 min" },
      { title: "Basic Navigation", type: "tutorial", readTime: "6 min" }
    ]
  },
  {
    title: "Developer Guide",
    description: "Technical documentation for developers",
    icon: <Code className="w-6 h-6" />,
    articles: [
      { title: "API Reference", type: "reference", readTime: "15 min" },
      { title: "SDK Documentation", type: "reference", readTime: "20 min" },
      { title: "Integration Guide", type: "tutorial", readTime: "25 min" },
      { title: "Best Practices", type: "guide", readTime: "12 min" }
    ]
  },
  {
    title: "Project Management",
    description: "How to create, manage, and showcase projects",
    icon: <FileText className="w-6 h-6" />,
    articles: [
      { title: "Project Creation", type: "tutorial", readTime: "10 min" },
      { title: "Submission Guidelines", type: "guide", readTime: "8 min" },
      { title: "Portfolio Building", type: "guide", readTime: "15 min" },
      { title: "Collaboration Tools", type: "tutorial", readTime: "12 min" }
    ]
  },
  {
    title: "Community",
    description: "Community guidelines and collaboration features",
    icon: <Users className="w-6 h-6" />,
    articles: [
      { title: "Community Guidelines", type: "guide", readTime: "7 min" },
      { title: "Mentorship Program", type: "tutorial", readTime: "12 min" },
      { title: "Discord Integration", type: "tutorial", readTime: "8 min" },
      { title: "Event Participation", type: "guide", readTime: "10 min" }
    ]
  }
];

const quickLinks = [
  {
    title: "API Documentation",
    description: "Complete API reference and examples",
    icon: <Code className="w-5 h-5" />,
    badge: "Popular",
    link: "#"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: <Video className="w-5 h-5" />,
    badge: "New",
    link: "#"
  },
  {
    title: "Download Resources",
    description: "Templates, assets, and tools",
    icon: <Download className="w-5 h-5" />,
    badge: "Free",
    link: "#"
  },
  {
    title: "Configuration Guide",
    description: "Advanced setup and customization",
    icon: <Settings className="w-5 h-5" />,
    badge: "Advanced",
    link: "#"
  }
];

const popularArticles = [
  { title: "How to Submit Your First Project", views: "2.4k", rating: 4.9 },
  { title: "Setting Up Your Developer Profile", views: "1.8k", rating: 4.8 },
  { title: "Understanding the Nex10 Labs Program", views: "1.5k", rating: 4.7 },
  { title: "Community Contribution Guidelines", views: "1.2k", rating: 4.6 },
  { title: "Building Your Portfolio", views: "980", rating: 4.8 }
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Documentation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know about using VishwaDev platform effectively
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Links */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <div>
                        <p className="font-medium text-sm">{link.title}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {link.badge}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                    <p className="font-medium text-sm mb-1">{article.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.views} views</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span>{article.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Documentation Sections */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {documentationSections.map((section, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedSection(selectedSection === section.title ? null : section.title)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-muted text-foreground">
                        {section.icon}
                      </div>
                      <CardTitle className="group-hover:text-foreground transition-colors">
                        {section.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="flex items-center justify-between p-2 rounded hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{article.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {article.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="neutral" className="w-full mt-4 group-hover:bg-muted">
                      View All Articles
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Content */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-muted border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>
                    Learn with step-by-step video guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-muted-foreground">
                    Watch comprehensive tutorials covering everything from basics to advanced topics.
                  </p>
                  <Button variant="default" className="w-full">
                    Watch Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Code Examples
                  </CardTitle>
                  <CardDescription>
                    Ready-to-use code snippets and examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-muted-foreground">
                    Access a library of code examples and implementation patterns.
                  </p>
                  <Button variant="default" className="w-full">
                    Browse Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Resources
                  </CardTitle>
                  <CardDescription>
                    Templates, assets, and development tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-muted-foreground">
                    Download templates, design assets, and helpful development tools.
                  </p>
                  <Button variant="default" className="w-full">
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Help Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
                <CardDescription>
                  Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="neutral" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Users className="w-6 h-6" />
                    <span>Community Forum</span>
                    <span className="text-xs text-muted-foreground">Ask the community</span>
                  </Button>
                  <Button variant="neutral" className="h-auto p-4 flex flex-col items-center gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Contact Support</span>
                    <span className="text-xs text-muted-foreground">Get personalized help</span>
                  </Button>
                  <Button variant="neutral" className="h-auto p-4 flex flex-col items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span>Submit Feedback</span>
                    <span className="text-xs text-muted-foreground">Help us improve</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
