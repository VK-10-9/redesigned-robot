import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Users, Lightbulb, DollarSign } from "lucide-react"

export default function Nex10ApplyPage() {
  const applicationSections = [
    {
      title: "Project Information",
      description: "Tell us about your innovative project or startup idea",
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      title: "Team Details",
      description: "Information about your team members and their expertise",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Business Model",
      description: "How you plan to generate revenue and scale your business",
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Documentation",
      description: "Upload supporting documents like pitch deck, business plan, etc.",
      icon: <FileText className="h-5 w-5" />
    }
  ]

  const requirements = [
    "Original and innovative project idea",
    "Committed team with relevant skills",
    "Clear market opportunity and target audience",
    "Scalable business model",
    "Technology-focused solution",
    "Willingness to relocate to our campus (if selected)"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Apply to Nex10 Labs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Ready to transform your innovative idea into a successful startup? 
          Apply to our exclusive incubation program and get the support you need to succeed.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            Applications Open
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            Rolling Admissions
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Please fill out all sections completely. Applications are reviewed on a rolling basis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/johndoe" />
                </div>
              </div>

              {/* Project Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Project Information
                </h3>
                <div>
                  <Label htmlFor="projectName">Project/Startup Name *</Label>
                  <Input id="projectName" placeholder="Your awesome project name" />
                </div>
                <div>
                  <Label htmlFor="tagline">One-line Description *</Label>
                  <Input id="tagline" placeholder="Describe your project in one compelling sentence" />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="mobile-app">Mobile Application</SelectItem>
                      <SelectItem value="iot">IoT & Hardware</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthtech">Healthtech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project in detail, including the problem it solves, your solution, and what makes it unique..."
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="stage">Current Stage *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea Stage</SelectItem>
                      <SelectItem value="prototype">Prototype/MVP</SelectItem>
                      <SelectItem value="beta">Beta Testing</SelectItem>
                      <SelectItem value="launched">Launched Product</SelectItem>
                      <SelectItem value="revenue">Generating Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Team Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Information
                </h3>
                <div>
                  <Label htmlFor="teamSize">Team Size *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo Founder</SelectItem>
                      <SelectItem value="2">2 Members</SelectItem>
                      <SelectItem value="3">3 Members</SelectItem>
                      <SelectItem value="4">4 Members</SelectItem>
                      <SelectItem value="5+">5+ Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="teamDetails">Team Member Details *</Label>
                  <Textarea 
                    id="teamDetails" 
                    placeholder="List team members, their roles, and relevant experience/skills..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="previousExperience">Previous Startup/Project Experience</Label>
                  <Textarea 
                    id="previousExperience" 
                    placeholder="Describe any previous entrepreneurial or significant project experience..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Business Model */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Business Model & Market
                </h3>
                <div>
                  <Label htmlFor="targetMarket">Target Market *</Label>
                  <Textarea 
                    id="targetMarket" 
                    placeholder="Describe your target customers and market size..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="revenueModel">Revenue Model *</Label>
                  <Textarea 
                    id="revenueModel" 
                    placeholder="How do you plan to generate revenue? What's your monetization strategy?"
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="competition">Competition Analysis</Label>
                  <Textarea 
                    id="competition" 
                    placeholder="Who are your competitors and what's your competitive advantage?"
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="fundingNeeds">Funding Requirements *</Label>
                  <Textarea 
                    id="fundingNeeds" 
                    placeholder="How much funding do you need and how will you use it?"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Program Selection</h3>
                <div>
                  <Label htmlFor="program">Preferred Program *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accelerator">Nex10 Accelerator (6 months, up to $50K)</SelectItem>
                      <SelectItem value="incubator">Nex10 Incubator (12 months, up to $25K)</SelectItem>
                      <SelectItem value="fellowship">Nex10 Fellowship (3 months, up to $10K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline">When can you start? *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div>
                  <Label htmlFor="whyNex10">Why Nex10 Labs? *</Label>
                  <Textarea 
                    id="whyNex10" 
                    placeholder="Why do you want to join Nex10 Labs? What do you hope to achieve?"
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Anything else you&apos;d like us to know?</Label>
                  <Textarea 
                    id="additionalInfo" 
                    placeholder="Any additional information that might help your application..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Nex10 Labs terms and conditions and privacy policy *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="updates" />
                  <Label htmlFor="updates" className="text-sm">
                    I want to receive updates about Nex10 Labs programs and events
                  </Label>
                </div>
              </div>

              <Button size="lg" className="w-full">
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Application Sections</CardTitle>
              <CardDescription>
                Complete all sections for the best chance of acceptance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applicationSections.map((section, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/10 rounded">
                      {section.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-muted-foreground">{section.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>
                Make sure your project meets these criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application Review:</span>
                  <span>2-3 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interview Process:</span>
                  <span>1-2 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Final Decision:</span>
                  <span>1 week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program Start:</span>
                  <span>Flexible</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about the application process?
              </p>
              <Button variant="neutral" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
