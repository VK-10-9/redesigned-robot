import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Check, Globe, Shield, Zap, Users } from "lucide-react"

export default function SubdomainPage() {
  const features = [
    {
      title: "Free Custom Subdomain",
      description: "Get your personalized subdomain at no cost",
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: "SSL Certificate Included",
      description: "Secure HTTPS connection out of the box",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Fast Performance",
      description: "Optimized hosting with global CDN",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Community Support",
      description: "Get help from our developer community",
      icon: <Users className="h-6 w-6" />
    }
  ]

  const examples = [
    { name: "john", url: "john.vishwadev.tech" },
    { name: "sarah-portfolio", url: "sarah-portfolio.vishwadev.tech" },
    { name: "myproject", url: "myproject.vishwadev.tech" },
    { name: "dev-blog", url: "dev-blog.vishwadev.tech" }
  ]

  const useCases = [
    {
      title: "Personal Portfolio",
      description: "Showcase your projects, skills, and achievements",
      example: "yourname.vishwadev.tech"
    },
    {
      title: "Project Demos",
      description: "Host and demo your web applications",
      example: "myapp.vishwadev.tech"
    },
    {
      title: "Developer Blog",
      description: "Share your thoughts and technical articles",
      example: "blog.vishwadev.tech"
    },
    {
      title: "API Documentation",
      description: "Host documentation for your APIs and libraries",
      example: "docs.vishwadev.tech"
    }
  ]

  const guidelines = [
    "Subdomain name must be 3-30 characters long",
    "Only letters, numbers, and hyphens allowed",
    "Cannot start or end with a hyphen",
    "Must be unique and not already taken",
    "No offensive or inappropriate content",
    "Must be used for legitimate development purposes"
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get Your Free Subdomain</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Get your personalized subdomain on vishwadev.tech completely free. 
          Perfect for portfolios, project demos, blogs, and more.
        </p>
        <div className="text-2xl font-mono bg-muted px-6 py-3 rounded-lg inline-block mb-8">
          <span className="text-primary">yourname</span>.vishwadev.tech
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Globe className="h-4 w-4 mr-2" />
            500+ Subdomains
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Free SSL
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request Your Subdomain</CardTitle>
            <CardDescription>
              Fill out the form below to request your free subdomain. All requests are reviewed manually.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input id="github" placeholder="https://github.com/johndoe" />
              </div>
            </div>

            {/* Subdomain Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Subdomain Details</h3>
              <div>
                <Label htmlFor="subdomain">Desired Subdomain *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="subdomain" 
                    placeholder="yourname" 
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">.vishwadev.tech</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  3-30 characters, letters, numbers, and hyphens only
                </p>
              </div>
              <div>
                <Label htmlFor="purpose">Purpose/Use Case *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portfolio">Personal Portfolio</SelectItem>
                    <SelectItem value="project">Project Demo</SelectItem>
                    <SelectItem value="blog">Developer Blog</SelectItem>
                    <SelectItem value="documentation">API/Project Documentation</SelectItem>
                    <SelectItem value="landing">Product Landing Page</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Briefly describe what you&apos;ll use this subdomain for..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Technical Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Details</h3>
              <div>
                <Label htmlFor="hosting">Hosting Platform *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Where will you host your site?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vercel">Vercel</SelectItem>
                    <SelectItem value="netlify">Netlify</SelectItem>
                    <SelectItem value="github-pages">GitHub Pages</SelectItem>
                    <SelectItem value="heroku">Heroku</SelectItem>
                    <SelectItem value="railway">Railway</SelectItem>
                    <SelectItem value="render">Render</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetUrl">Target URL/CNAME *</Label>
                <Input 
                  id="targetUrl" 
                  placeholder="your-app.vercel.app or IP address"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The URL or IP where your subdomain should point to
                </p>
              </div>
            </div>

            <Button size="lg" className="w-full">
              Submit Request
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Requests are typically reviewed within 24-48 hours. You&apos;ll receive an email confirmation once approved.
            </p>
          </CardContent>
        </Card>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>What You Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Example Subdomains</CardTitle>
              <CardDescription>
                See how others are using their subdomains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {examples.map((example, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-mono text-sm">{example.url}</span>
                    <Badge variant="outline">Live</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>
                Please review these requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {guideline}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Perfect For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-mono bg-muted px-3 py-2 rounded">
                  {useCase.example}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is it really free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes! We provide free subdomains to support the developer community. 
                There are no hidden costs or time limits.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How long does approval take?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most requests are reviewed and approved within 24-48 hours. 
                You&apos;ll receive an email confirmation once your subdomain is active.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change my subdomain later?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Yes, you can request changes to your subdomain or target URL by contacting our support team.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What if my desired name is taken?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We&apos;ll suggest alternative names or you can modify your request with a different subdomain name.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Ready to Get Started?</CardTitle>
            <CardDescription>
              Join hundreds of developers who already have their personalized subdomain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full">
              Request Your Subdomain
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
