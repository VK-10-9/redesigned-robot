"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FolderOpen, 
  Bell, 
  Globe, 
  ExternalLink,
  Plus,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Users
} from "lucide-react"
import Link from "next/link"

// Mock data for the dashboard
const mockUser = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  username: "johndoe",
  userId: "UID_2024_001", 
  bio: "Full-stack developer passionate about building innovative solutions",
  avatar: "/placeholder-user.jpg",
  joinDate: "January 2024",
  subdomain: "johndoe.vishwadev.tech",
  location: "San Francisco, CA",
  skills: ["React", "Node.js", "TypeScript", "Python", "Docker"],
  followers: 128,
  following: 45,
  projects: 12
}

const mockProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    status: "published",
    views: 1234,
    likes: 45,
    stars: 12,
    technologies: ["React", "Node.js", "MongoDB"],
    lastUpdated: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application with location services",
    status: "draft",
    views: 89,
    likes: 8,
    stars: 3,
    technologies: ["Vue.js", "Express", "API"],
    lastUpdated: "1 week ago",
    featured: false
  },
  {
    id: 3,
    title: "Task Management Tool",
    description: "Collaborative task management with real-time updates",
    status: "published",
    views: 567,
    likes: 23,
    stars: 7,
    technologies: ["React", "Socket.io", "PostgreSQL"],
    lastUpdated: "3 days ago",
    featured: false
  }
]

const mockStats = {
  totalViews: 2890,
  totalLikes: 76,
  totalStars: 22,
  profileViews: 345,
  weeklyGrowth: 12.5,
  monthlyGrowth: 23.8
}

const mockActivity = [
  {
    type: "project_published",
    message: "Published 'E-Commerce Platform'",
    time: "2 hours ago",
    icon: <FolderOpen className="w-4 h-4" />
  },
  {
    type: "like_received",
    message: "sarah.wilson@outlook.com liked your project",
    time: "1 day ago",
    icon: <Heart className="w-4 h-4" />
  },
  {
    type: "follower_gained",
    message: "3 new followers including alex.chen@yahoo.com",
    time: "2 days ago",
    icon: <Users className="w-4 h-4" />
  },
  {
    type: "project_starred",
    message: "mike.rodriguez@hotmail.com starred your 'Weather App'",
    time: "3 days ago",
    icon: <Star className="w-4 h-4" />
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {mockUser.name}! Here&apos;s what&apos;s happening with your projects.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="neutral" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Link href="/dashboard/new-project">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{mockStats.weeklyGrowth}% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalLikes}</div>
              <p className="text-xs text-muted-foreground">
                +{mockStats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.projects}</div>
              <p className="text-xs text-muted-foreground">
                3 published, 1 draft
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.followers}</div>
              <p className="text-xs text-muted-foreground">
                Following {mockUser.following}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{mockUser.name}</h3>
                      <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
                      <Badge variant="secondary" className="mt-1">
                        <Globe className="w-3 h-3 mr-1" />
                        {mockUser.subdomain}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm">{mockUser.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mockUser.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mockUser.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button asChild variant="neutral" className="w-full">
                    <Link href="/profile">View Full Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="neutral" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Featured Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Projects</CardTitle>
                <CardDescription>Your most popular and recent projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockProjects.filter(p => p.featured || p.status === 'published').slice(0, 3).map((project) => (
                    <Card key={project.id} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{project.title}</CardTitle>
                          {project.featured && <Badge variant="default">Featured</Badge>}
                        </div>
                        <CardDescription className="text-sm">{project.description}</CardDescription>
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
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 2).map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="neutral" size="sm" className="w-full">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Project
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Link href="/dashboard/new-project">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-muted-foreground">
                          <Eye className="w-4 h-4 mr-1" />
                          {project.views}
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Heart className="w-4 h-4 mr-1" />
                          {project.likes}
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Star className="w-4 h-4 mr-1" />
                          {project.stars}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated {project.lastUpdated}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="neutral" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="neutral" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your profile and project metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Views</span>
                      <span>{mockStats.profileViews}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Project Engagement</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Community Interaction</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>Your growth over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Growth</span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-500 font-medium">+{mockStats.weeklyGrowth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly Growth</span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-500 font-medium">+{mockStats.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Follower Growth</span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-500 font-medium">+8.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Projects</CardTitle>
                <CardDescription>Projects with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.sort((a, b) => b.views - a.views).map((project, index) => (
                    <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {project.likes}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {project.stars}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your public profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="neutral" size="sm">Change Photo</Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <p className="text-sm bg-muted p-2 rounded">{mockUser.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <p className="text-sm bg-muted p-2 rounded">{mockUser.bio}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-sm bg-muted p-2 rounded">{mockUser.location}</p>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Technologies</CardTitle>
                  <CardDescription>Showcase your technical expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                        <button className="ml-2 text-xs hover:text-destructive">×</button>
                      </Badge>
                    ))}
                  </div>
                  <Button variant="neutral" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subdomain Settings</CardTitle>
                <CardDescription>Manage your personalized domain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="font-mono">{mockUser.subdomain}</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your personalized subdomain is active and accessible to the public.
                </p>
                <div className="flex gap-2">
                  <Button variant="neutral">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </Button>
                  <Button variant="neutral">Edit Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm bg-muted p-2 rounded">{mockUser.email}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <p className="text-sm bg-muted p-2 rounded">@{mockUser.username}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm bg-muted p-2 rounded">{mockUser.joinDate}</p>
                  </div>
                  <Button variant="neutral" className="w-full">
                    Update Account
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                    </div>
                    <Button variant="neutral" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Email</p>
                      <p className="text-sm text-muted-foreground">Display email on your profile</p>
                    </div>
                    <Button variant="neutral" size="sm">Disabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Feed</p>
                      <p className="text-sm text-muted-foreground">Show your activity to followers</p>
                    </div>
                    <Button variant="neutral" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { label: "Email Notifications", desc: "Receive email updates about your account" },
                    { label: "Project Comments", desc: "Get notified when someone comments on your projects" },
                    { label: "New Followers", desc: "Get notified when someone follows you" },
                    { label: "Project Likes", desc: "Get notified when someone likes your projects" },
                    { label: "Weekly Summary", desc: "Receive a weekly summary of your activity" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Button variant="neutral" size="sm">
                        {index % 2 === 0 ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="reverse" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


