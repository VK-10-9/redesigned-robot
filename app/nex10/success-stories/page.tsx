import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SuccessStoriesPage() {
  const successStories = [
    {
      companyName: "EcoTracker",
      founderName: "Sarah Chen",
      industry: "Environmental Tech",
      fundingRaised: "$2.5M",
      employees: 15,
      yearFounded: 2023,
      description: "AI-powered carbon footprint tracking platform helping businesses reduce their environmental impact.",
      metrics: {
        users: "10K+",
        revenue: "$500K ARR",
        growth: "300% YoY"
      },
      achievements: [
        "Secured Series A funding",
        "Partnership with major corporations",
        "Featured in TechCrunch",
        "Carbon neutral certified"
      ],
      founderQuote: "Nex10 Labs provided the perfect environment to transform our idea into a thriving business. The mentorship and resources were invaluable.",
      website: "#",
      image: "/placeholder.jpg"
    },
    {
      companyName: "HealthBot AI",
      founderName: "Dr. Michael Rodriguez",
      industry: "HealthTech",
      fundingRaised: "$1.8M",
      employees: 12,
      yearFounded: 2022,
      description: "Intelligent healthcare assistant providing preliminary health assessments and medical guidance.",
      metrics: {
        users: "50K+",
        revenue: "$300K ARR",
        growth: "250% YoY"
      },
      achievements: [
        "FDA preliminary approval",
        "Partnership with 3 hospitals",
        "Published research paper",
        "Won Healthcare Innovation Award"
      ],
      founderQuote: "The structured program and expert guidance at Nex10 Labs accelerated our development by at least 2 years.",
      website: "#",
      image: "/placeholder.jpg"
    },
    {
      companyName: "SmartGrid Solutions",
      founderName: "Alex Kumar & Team",
      industry: "CleanTech",
      fundingRaised: "$3.2M",
      employees: 22,
      yearFounded: 2023,
      description: "IoT-based energy optimization platform for smart cities and industrial applications.",
      metrics: {
        users: "5K+",
        revenue: "$800K ARR",
        growth: "400% YoY"
      },
      achievements: [
        "Deployed in 12 cities",
        "20% energy savings proven",
        "Government contracts secured",
        "International expansion"
      ],
      founderQuote: "Nex10 Labs connected us with the right investors and provided technical expertise that was crucial for our success.",
      website: "#",
      image: "/placeholder.jpg"
    }
  ]

  const programStats = [
    { label: "Success Rate", value: "85%", description: "Startups still operating" },
    { label: "Total Funding", value: "$12M+", description: "Raised by alumni" },
    { label: "Jobs Created", value: "200+", description: "Direct employment" },
    { label: "Average Growth", value: "280%", description: "Year-over-year" }
  ]

  const timeline = [
    { year: "2022", milestone: "First cohort launched with 8 startups" },
    { year: "2023", milestone: "15 startups graduated, $5M total funding raised" },
    { year: "2024", milestone: "25 startups in program, 3 successful exits" },
    { year: "2025", milestone: "50+ alumni companies, expanding internationally" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Meet the inspiring entrepreneurs who transformed their ideas into successful businesses
          through the Nex10 Labs incubation program.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            50+ Success Stories
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <DollarSign className="h-4 w-4 mr-2" />
            $12M+ Raised
          </Badge>
        </div>
      </div>

      {/* Program Stats */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Program Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {programStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Success Stories</h2>
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Company Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{story.companyName}</h3>
                      <Badge variant="outline">{story.industry}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{story.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Founded by {story.founderName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{story.yearFounded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{story.metrics.users}</div>
                      <div className="text-sm text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{story.metrics.revenue}</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{story.metrics.growth}</div>
                      <div className="text-sm text-muted-foreground">Growth</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    &ldquo;{story.founderQuote}&rdquo;
                    <cite className="block text-sm text-muted-foreground mt-2">
                      — {story.founderName}, Founder of {story.companyName}
                    </cite>
                  </blockquote>
                </div>

                {/* Achievements & Actions */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {story.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Raised:</span>
                      <span className="font-semibold">{story.fundingRaised}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span className="font-semibold">{story.employees} employees</span>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={story.website} className="flex items-center gap-2">
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Program Timeline</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {item.year}
                </div>
                <div className="flex-1">
                  <Card>
                    <CardContent className="pt-6">
                      <p>{item.milestone}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Join Our Success Stories?</CardTitle>
            <CardDescription className="text-lg">
              Apply to Nex10 Labs and transform your innovative idea into the next success story.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/nex10/apply">Apply Now</Link>
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
