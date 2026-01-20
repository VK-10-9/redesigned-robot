import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, BookOpen, Award, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentorship Program | VishwaDev",
  description: "Accelerate your tech career with personalized 1-on-1 mentorship from industry professionals.",
}

export default function MentorshipPage() {
  const mentorshipTracks: Array<{
    title: string;
    description: string;
    duration: string;
    level: string;
    mentors: number;
    color: "default" | "secondary" | "destructive" | "outline";
  }> = [
    {
      title: "Web Development",
      description: "Frontend, backend, and full-stack development mentorship",
      duration: "3-6 months",
      level: "Beginner to Advanced",
      mentors: 12,
      color: "default"
    },
    {
      title: "Mobile App Development",
      description: "iOS, Android, and cross-platform mobile development",
      duration: "4-6 months", 
      level: "Intermediate",
      mentors: 8,
      color: "secondary"
    },
    {
      title: "AI & Machine Learning",
      description: "Data science, ML algorithms, and AI application development",
      duration: "6-8 months",
      level: "Intermediate to Advanced",
      mentors: 10,
      color: "destructive"
    },
    {
      title: "DevOps & Cloud",
      description: "Infrastructure, CI/CD, containerization, and cloud platforms",
      duration: "4-6 months",
      level: "Intermediate",
      mentors: 6,
      color: "outline"
    }
  ]

  const mentors = [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      expertise: ["React", "Node.js", "System Design"],
      experience: "8+ years",
      mentees: 15,
      rating: 4.9
    },
    {
      name: "Michael Rodriguez",
      role: "ML Engineering Manager",
      company: "Microsoft",
      expertise: ["Python", "TensorFlow", "MLOps"],
      experience: "10+ years",
      mentees: 12,
      rating: 4.8
    },
    {
      name: "Alex Kumar",
      role: "Mobile Tech Lead",
      company: "Uber",
      expertise: ["React Native", "Swift", "Flutter"],
      experience: "7+ years",
      mentees: 18,
      rating: 4.9
    },
    {
      name: "Emma Davis",
      role: "DevOps Architect",
      company: "AWS",
      expertise: ["Kubernetes", "Terraform", "AWS"],
      experience: "9+ years",
      mentees: 10,
      rating: 4.7
    }
  ]

  const benefits = [
    {
      title: "1-on-1 Mentorship",
      description: "Personalized guidance tailored to your goals and learning style",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Goal Setting",
      description: "Create clear, achievable milestones for your development journey",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Learning Resources",
      description: "Access curated resources, tutorials, and industry best practices",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Portfolio Review",
      description: "Get feedback on your projects and build an impressive portfolio",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "Career Guidance",
      description: "Resume reviews, interview prep, and career advancement strategies",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: "Community Access",
      description: "Join exclusive mentorship groups and networking opportunities",
      icon: <MessageCircle className="h-6 w-6" />
    }
  ]

  const process = [
    {
      step: 1,
      title: "Apply",
      description: "Submit your application with your background, goals, and preferred mentorship track."
    },
    {
      step: 2,
      title: "Matching",
      description: "We'll match you with the perfect mentor based on your goals and experience level."
    },
    {
      step: 3,
      title: "Kickoff",
      description: "Meet your mentor, set goals, and create a personalized learning roadmap."
    },
    {
      step: 4,
      title: "Learn & Grow",
      description: "Regular mentoring sessions, project guidance, and continuous support."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mentorship Program</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Accelerate your tech career with personalized 1-on-1 mentorship from industry professionals.
          Get guidance, build skills, and achieve your goals faster.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            200+ Mentees
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            95% Success Rate
          </Badge>
        </div>
        <Button size="lg">
          <Link href="#apply">Apply for Mentorship</Link>
        </Button>
      </div>

      {/* Mentorship Tracks */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Mentorship Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentorshipTracks.map((track, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {track.title}
                  <Badge variant={track.color}>{track.mentors} mentors</Badge>
                </CardTitle>
                <CardDescription>{track.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{track.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Level:</span>
                    <span>{track.level}</span>
                  </div>
                </div>
                <Button variant="neutral" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Mentors */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{mentor.name}</CardTitle>
                <CardDescription>
                  {mentor.role} at {mentor.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span>{mentor.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mentees:</span>
                    <span>{mentor.mentees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating:</span>
                    <span>{mentor.rating}/5 ⭐</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {mentor.expertise.slice(0, 2).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Program Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application CTA */}
      <div id="apply" className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start Your Journey?</CardTitle>
            <CardDescription className="text-lg">
              Join our mentorship program and take your skills to the next level with personalized guidance
              from industry experts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">$0</div>
                <div className="text-sm text-muted-foreground">Program Cost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3-6</div>
                <div className="text-sm text-muted-foreground">Months Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1:1</div>
                <div className="text-sm text-muted-foreground">Personal Attention</div>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Apply for Mentorship Program
            </Button>
            <p className="text-xs text-muted-foreground">
              Applications are reviewed weekly. Limited spots available.
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
