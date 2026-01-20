import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Hash, Users, Calendar, Zap, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Discord Community | VishwaDev",
  description: "Join our vibrant Discord community of developers, students, and tech enthusiasts.",
}

export default function DiscordPage() {
  const channels = [
    {
      name: "general",
      description: "General discussions and community chat",
      icon: <MessageCircle className="h-5 w-5" />,
      members: "1.2k+"
    },
    {
      name: "help-and-support",
      description: "Get help with coding problems and technical issues",
      icon: <Hash className="h-5 w-5" />,
      members: "800+"
    },
    {
      name: "project-showcase",
      description: "Share your projects and get feedback from the community",
      icon: <Zap className="h-5 w-5" />,
      members: "650+"
    },
    {
      name: "job-opportunities",
      description: "Job postings, internships, and career opportunities",
      icon: <BookOpen className="h-5 w-5" />,
      members: "900+"
    },
    {
      name: "study-groups",
      description: "Form study groups and collaborate on learning",
      icon: <Users className="h-5 w-5" />,
      members: "450+"
    },
    {
      name: "events",
      description: "Stay updated with upcoming events and workshops",
      icon: <Calendar className="h-5 w-5" />,
      members: "700+"
    }
  ]

  const features = [
    {
      title: "24/7 Community Support",
      description: "Get help from experienced developers and mentors anytime, anywhere.",
      icon: "🕐"
    },
    {
      title: "Project Collaboration",
      description: "Find teammates for hackathons, personal projects, and open source contributions.",
      icon: "🤝"
    },
    {
      title: "Tech Discussions",
      description: "Engage in meaningful discussions about the latest technologies and trends.",
      icon: "💬"
    },
    {
      title: "Career Guidance",
      description: "Get advice on resumes, interviews, and career progression from industry professionals.",
      icon: "🚀"
    },
    {
      title: "Resource Sharing",
      description: "Access curated learning resources, tutorials, and development tools.",
      icon: "📚"
    },
    {
      title: "Networking",
      description: "Connect with like-minded developers, students, and tech enthusiasts.",
      icon: "🌐"
    }
  ]

  const rules = [
    "Be respectful and professional in all interactions",
    "No spam, self-promotion without permission, or off-topic content",
    "Use appropriate channels for different types of discussions",
    "Help others when you can and ask questions when you need help",
    "No discrimination, harassment, or toxic behavior",
    "Keep conversations constructive and focused on learning"
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discord Community</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Join our vibrant Discord community of developers, students, and tech enthusiasts.
          Connect, learn, and grow together in a supportive environment.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            2.8K+ Members
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <MessageCircle className="h-4 w-4 mr-2" />
            Active Daily
          </Badge>
        </div>
        <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="https://discord.gg/vishwadev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Join Discord Server
            <span className="text-lg">💬</span>
          </Link>
        </Button>
      </div>

      {/* Community Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Join Our Community?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Channels */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {channel.icon}
                  <span className="font-mono">#{channel.name}</span>
                  <Badge variant="outline">{channel.members}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{channel.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Community Guidelines</h2>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Code of Conduct</CardTitle>
            <CardDescription>
              To maintain a positive and productive environment, please follow these guidelines:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Community Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.8K+</div>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Daily Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-sm text-muted-foreground">Channels</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Community Support</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Ready to Join?</CardTitle>
            <CardDescription>
              Become part of our growing community of developers and tech enthusiasts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Link href="https://discord.gg/vishwadev" target="_blank" rel="noopener noreferrer">
                Join Discord Now
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
