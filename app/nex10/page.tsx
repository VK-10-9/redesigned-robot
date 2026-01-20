
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Brain, Smartphone, Settings, Users, Zap, Globe, MessageCircle } from "lucide-react"
import Link from "next/link"
import type { Service, Differentiator, ProcessStep } from "@/src/types/nex10"

export default function Nex10LabsPage() {
  const services: Service[] = [
    {
      title: "Web App Development",
      description: "Custom, scalable web applications tailored to your business needs.",
      icon: <Globe className="h-8 w-8 text-primary" />,
    },
    {
      title: "AI & Machine Learning",
      description: "Integrate AI/ML to automate, analyze, and innovate.",
      icon: <Brain className="h-8 w-8 text-primary" />,
    },
    {
      title: "Mobile App Development",
      description: "iOS and Android apps for seamless mobile experiences.",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
    },
    {
      title: "Automation & Integrations",
      description: "Streamline workflows with automation and third-party integrations.",
      icon: <Zap className="h-8 w-8 text-primary" />,
    },
    {
      title: "Tech Consulting",
      description: "Expert advice to solve your toughest technology challenges.",
      icon: <Settings className="h-8 w-8 text-primary" />,
    },
    {
      title: "Team Augmentation",
      description: "Expand your team with our skilled developers and designers.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
  ];

  const differentiators: Differentiator[] = [
    { icon: <Rocket className="h-6 w-6 text-primary" />, label: "Fast Delivery" },
    { icon: <Brain className="h-6 w-6 text-primary" />, label: "Expert Team" },
    { icon: <MessageCircle className="h-6 w-6 text-primary" />, label: "Clear Communication" },
    { icon: <Zap className="h-6 w-6 text-primary" />, label: "Cutting-Edge Tech" },
    { icon: <Settings className="h-6 w-6 text-primary" />, label: "Full Support" },
  ];

  const process: ProcessStep[] = [
    { step: 1, title: "Consultation", description: "Discuss your goals and requirements with our experts." },
    { step: 2, title: "Proposal", description: "Receive a tailored solution and transparent quote." },
    { step: 3, title: "Build & Launch", description: "We develop, test, and launch your solution." },
    { step: 4, title: "Ongoing Support", description: "Continuous improvement and support post-launch." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nex10 Labs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Nex10 Labs is a platform and SaaS company that builds custom tech solutions for clients. We partner with startups, enterprises, and organizations to deliver web apps, AI/ML, automation, mobile apps, and more—fast, reliably, and with full support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {differentiators.map((d, i) => (
              <Badge key={i} variant="secondary" className="px-4 py-2 flex items-center gap-2">
                {d.icon}
                {d.label}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="neutral" asChild>
              <Link href="/projects">See Our Work</Link>
            </Button>
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((step, idx) => (
                <Card key={idx} className="text-center relative">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                  {idx < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to build your next big thing?</h2>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Nex10 Labs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
