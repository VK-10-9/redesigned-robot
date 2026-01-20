"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Github, 
  ExternalLink,
  Users,
  FolderOpen,
  Star,
  Heart,
  Eye,
  Settings,
  Mail,
  Link as LinkIcon,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock user data
const userData = {
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@gmail.com",
  userId: "UID_2024_001",
  bio: "Full-stack developer passionate about building innovative solutions that make a difference. Love working with modern technologies and contributing to open source projects.",
  avatar: "/placeholder-user.jpg",
  coverImage: "/placeholder.jpg",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  subdomain: "johndoe.vishwadev.tech",
  followers: 128,
  following: 45,
  skills: [
    "React", "Node.js", "TypeScript", "Python", "Docker", 
    "AWS", "PostgreSQL", "MongoDB", "GraphQL", "Next.js",
    "Vue.js", "Express", "Redis", "Kubernetes", "Git"
  ],
  achievements: [
    { title: "Early Adopter", description: "One of the first 100 users", icon: "🌟" },
    { title: "Project Master", description: "Published 10+ projects", icon: "🚀" },
    { title: "Community Helper", description: "Helped 50+ developers", icon: "🤝" },
    { title: "Open Source Contributor", description: "Contributed to 5+ repositories", icon: "💻" }
  ],
  stats: {
    totalProjects: 12,
    totalViews: 2890,
    totalLikes: 76,
    totalStars: 22,
    reputation: 1250
  }
}

const userProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js, featuring payment integration and real-time inventory management.",
    image: "/placeholder.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    views: 1234,
    likes: 45,
    stars: 12,
    date: "2 weeks ago",
    featured: true,
    status: "published"
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location-based forecasts and beautiful data visualizations.",
    image: "/placeholder.jpg",
    technologies: ["Vue.js", "Chart.js", "Weather API"],
    views: 567,
    likes: 23,
    stars: 7,
    date: "1 month ago",
    featured: false,
    status: "published"
  },
  {
    id: 3,
    title: "Task Management Tool",
    description: "Collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.jpg",
    technologies: ["React", "Socket.io", "PostgreSQL"],
    views: 789,
    likes: 34,
    stars: 9,
    date: "2 months ago",
    featured: true,
    status: "published"
  },
  {
    id: 4,
    title: "AI Chat Bot",
    description: "Intelligent chatbot powered by machine learning for customer support automation.",
    image: "/placeholder.jpg",
    technologies: ["Python", "TensorFlow", "Flask", "NLP"],
    views: 445,
    likes: 18,
    stars: 5,
    date: "3 months ago",
    featured: false,
    status: "published"
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("projects")
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Cover & Profile Section */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div 
            className="h-48 md:h-64 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-background border"
            style={{
              backgroundImage: `url(${userData.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Profile Info */}
          <div className="relative -mt-20 px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-2xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <div>
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <p className="text-lg text-muted-foreground">@{userData.username}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {userData.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {userData.joinDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span><strong>{userData.followers}</strong> followers</span>
                    <span><strong>{userData.following}</strong> following</span>
                    <span><strong>{userData.stats.totalProjects}</strong> projects</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="neutral" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant={isFollowing ? "neutral" : "default"} 
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Link href="/dashboard?tab=settings">
                  <Button variant="neutral" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Links */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-base mb-4">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {userData.website && (
                  <a 
                    href={userData.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {userData.website.replace('https://', '')}
                  </a>
                )}
                {userData.github && (
                  <a 
                    href={userData.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                <a 
                  href={`https://${userData.subdomain}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  {userData.subdomain}
                </a>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {userData.skills.slice(0, 8).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {userData.skills.length > 8 && (
                  <Badge variant="outline" className="text-xs">
                    +{userData.skills.length - 8} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-primary">{userData.stats.totalProjects}</div>
              <p className="text-sm text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-500">{userData.stats.totalViews.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-red-500">{userData.stats.totalLikes}</div>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-yellow-500">{userData.stats.totalStars}</div>
              <p className="text-sm text-muted-foreground">Total Stars</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-500">{userData.stats.reputation}</div>
              <p className="text-sm text-muted-foreground">Reputation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Projects ({userProjects.length})</h2>
              <div className="flex gap-2">
                <Button variant="neutral" size="sm">Featured</Button>
                <Button variant="neutral" size="sm">Recent</Button>
                <Button variant="neutral" size="sm">Popular</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                      {project.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {project.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {project.likes}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {project.stars}
                        </span>
                      </div>
                      <span>{project.date}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <Button variant="neutral" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-2xl font-bold">Achievements & Badges</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Progress & Milestones</CardTitle>
                <CardDescription>Your journey on VishwaDev</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projects Published</span>
                  <span className="text-sm font-medium">{userData.stats.totalProjects}/50</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(userData.stats.totalProjects / 50) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Community Reputation</span>
                  <span className="text-sm font-medium">{userData.stats.reputation}/2000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(userData.stats.reputation / 2000) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            
            <div className="space-y-4">
              {[
                {
                  action: "Published a new project",
                  target: "E-Commerce Platform",
                  time: "2 hours ago",
                  icon: <FolderOpen className="w-4 h-4" />
                },
                {
                  action: "Received 5 new likes on",
                  target: "Weather Dashboard",
                  time: "1 day ago",
                  icon: <Heart className="w-4 h-4" />
                },
                {
                  action: "Gained 3 new followers",
                  target: "",
                  time: "2 days ago",
                  icon: <Users className="w-4 h-4" />
                },
                {
                  action: "Project was starred",
                  target: "Task Management Tool",
                  time: "3 days ago",
                  icon: <Star className="w-4 h-4" />
                },
                {
                  action: "Updated profile information",
                  target: "",
                  time: "1 week ago",
                  icon: <Settings className="w-4 h-4" />
                },
                {
                  action: "Reached 1000 total views",
                  target: "",
                  time: "2 weeks ago",
                  icon: <TrendingUp className="w-4 h-4" />
                }
              ].map((activity, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          {activity.action} {activity.target && (
                            <span className="font-medium">{activity.target}</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
