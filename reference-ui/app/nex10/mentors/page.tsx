import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function MentorsPage() {
  const mentors = [
    {
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      expertise: ["Full-Stack Development", "System Design", "Team Leadership", "Product Strategy"],
      experience: "8+ years",
      mentees: 15,
      rating: 4.9,
      bio: "Passionate about helping early-stage startups build scalable technology solutions. Former startup founder with successful exit.",
      achievements: [
        "Led engineering team of 20+ developers",
        "Built systems serving 100M+ users",
        "Successful startup exit to major tech company",
        "Speaker at major tech conferences"
      ],
      availableFor: ["Technical Architecture", "Team Building", "Product Development", "Fundraising"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Michael Rodriguez",
      title: "ML Engineering Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      expertise: ["Machine Learning", "AI Strategy", "Data Science", "Research & Development"],
      experience: "10+ years",
      mentees: 12,
      rating: 4.8,
      bio: "AI researcher turned engineering leader. Specializes in bringing ML research to production at scale.",
      achievements: [
        "Published 25+ research papers",
        "Led AI initiatives serving millions",
        "Founded successful AI consulting firm",
        "PhD in Computer Science from Stanford"
      ],
      availableFor: ["AI/ML Strategy", "Technical Research", "Academic Partnerships", "Product Innovation"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emma Davis",
      title: "DevOps Architect",
      company: "Amazon Web Services",
      location: "Austin, TX",
      expertise: ["Cloud Architecture", "DevOps", "Infrastructure", "Security"],
      experience: "9+ years",
      mentees: 10,
      rating: 4.7,
      bio: "Cloud infrastructure expert helping startups build secure, scalable, and cost-effective systems from day one.",
      achievements: [
        "Architected systems for Fortune 500",
        "AWS certified solutions architect",
        "Reduced infrastructure costs by 60%",
        "Built CI/CD for 100+ applications"
      ],
      availableFor: ["Cloud Strategy", "Infrastructure Design", "Security", "Cost Optimization"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Alex Kumar",
      title: "Mobile Tech Lead",
      company: "Uber",
      location: "New York, NY",
      expertise: ["Mobile Development", "React Native", "iOS", "Android"],
      experience: "7+ years",
      mentees: 18,
      rating: 4.9,
      bio: "Mobile technology expert with experience building apps used by millions of users worldwide.",
      achievements: [
        "Led mobile team for 50M+ user app",
        "Open source contributor",
        "Mobile conference speaker",
        "Cross-platform development expert"
      ],
      availableFor: ["Mobile Strategy", "Cross-platform Development", "App Store Optimization", "User Experience"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Lisa Zhang",
      title: "VP of Product",
      company: "Stripe",
      location: "San Francisco, CA",
      expertise: ["Product Management", "Go-to-Market", "User Research", "Growth"],
      experience: "12+ years",
      mentees: 20,
      rating: 4.8,
      bio: "Product leader with deep experience in fintech and B2B SaaS. Passionate about building products that solve real problems.",
      achievements: [
        "Launched products with $100M+ ARR",
        "Led product teams of 50+ people",
        "Expert in product-market fit",
        "Former startup founder"
      ],
      availableFor: ["Product Strategy", "Go-to-Market", "User Research", "Product-Market Fit"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "James Wilson",
      title: "Partner",
      company: "TechVentures VC",
      location: "Boston, MA",
      expertise: ["Venture Capital", "Fundraising", "Business Strategy", "Market Analysis"],
      experience: "15+ years",
      mentees: 8,
      rating: 4.9,
      bio: "Early-stage investor with 50+ investments and 12 successful exits. Focuses on B2B SaaS and deep tech startups.",
      achievements: [
        "Led investments in 50+ startups",
        "12 successful exits including 3 unicorns",
        "Board member at 15 companies",
        "Former McKinsey consultant"
      ],
      availableFor: ["Fundraising Strategy", "Investor Introductions", "Business Strategy", "Market Validation"],
      image: "/placeholder-user.jpg",
      linkedin: "#",
      twitter: "#"
    }
  ]

  const mentorshipTypes = [
    {
      title: "Technical Mentorship",
      description: "Architecture, development practices, and technical leadership",
      mentors: 15,
      icon: "💻"
    },
    {
      title: "Product Mentorship",
      description: "Product strategy, user research, and go-to-market planning",
      mentors: 8,
      icon: "📊"
    },
    {
      title: "Business Mentorship",
      description: "Strategy, operations, and business model development",
      mentors: 12,
      icon: "📈"
    },
    {
      title: "Fundraising Mentorship",
      description: "Investment strategy, pitch development, and investor relations",
      mentors: 6,
      icon: "💰"
    }
  ]

  const stats = [
    { number: "40+", label: "Expert Mentors" },
    { number: "200+", label: "Mentorship Hours/Month" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "50+", label: "Success Stories" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Mentors</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Learn from industry experts and successful entrepreneurs who are passionate about 
          helping the next generation of tech leaders build amazing companies.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            40+ Expert Mentors
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Industry Leaders
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mentorship Types */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Mentorship Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorshipTypes.map((type, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{type.icon}</div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{type.mentors} mentors available</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Mentors */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mentors.map((mentor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <CardDescription className="text-base mb-2">
                      {mentor.title} at {mentor.company}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{mentor.location}</span>
                      <span>•</span>
                      <span>{mentor.experience} experience</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{mentor.rating}/5</div>
                    <div className="text-xs text-muted-foreground">⭐ Rating</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mentor.bio}</p>

                {/* Expertise */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Key Achievements</h4>
                  <ul className="space-y-1">
                    {mentor.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2 text-xs">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Available For */}
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Available For</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.availableFor.slice(0, 3).map((area, areaIndex) => (
                      <Badge key={areaIndex} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {mentor.availableFor.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mentor.availableFor.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{mentor.mentees} mentees</span>
                    <span>•</span>
                    <span>{mentor.rating}/5 rating</span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="neutral">
                      <Link href={mentor.linkedin}>
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="neutral">
                      <Link href={mentor.twitter}>
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How Mentorship Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Apply & Match", description: "We match you with mentors based on your needs and goals" },
            { step: 2, title: "Initial Meeting", description: "Meet your mentor and establish mentorship objectives" },
            { step: 3, title: "Regular Sessions", description: "Weekly 1-on-1 sessions focused on your specific challenges" },
            { step: 4, title: "Ongoing Support", description: "Continuous guidance and support throughout your journey" }
          ].map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Mentored?</CardTitle>
            <CardDescription className="text-lg">
              Join Nex10 Labs and get matched with industry experts who will help you 
              navigate the challenges of building a successful startup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/nex10/apply">Apply to Nex10 Labs</Link>
            </Button>
            <Button size="lg" variant="neutral" asChild>
              <Link href="/mentorship">General Mentorship</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
