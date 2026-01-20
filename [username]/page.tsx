import { notFound } from "next/navigation"
import { developers } from "@/app/devs/developers-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

interface UserProfilePageProps {
  params: Promise<{
    username: string
  }>
}

export async function generateMetadata({ params }: UserProfilePageProps): Promise<Metadata> {
  const { username } = await params
  const developer = developers.find(dev => dev.username.toLowerCase() === username.toLowerCase())
  
  if (!developer) {
    return {
      title: "Developer Not Found | VishwaDev",
      description: "The requested developer profile could not be found."
    }
  }

  return {
    title: `${developer.name} (@${developer.username}) | VishwaDev`,
    description: developer.bio,
    openGraph: {
      title: `${developer.name} (@${developer.username})`,
      description: developer.bio,
      type: "profile",
    }
  }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params
  const developer = developers.find(dev => dev.username.toLowerCase() === username.toLowerCase())
  
  if (!developer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="neutral" asChild>
            <Link href="/devs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Developers
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <div className="relative mb-12">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background rounded-xl h-64 -z-10"></div>
          
          <div className="pt-8 pb-4 text-center">
            {/* Avatar with gradient border */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/40 rounded-full blur-sm"></div>
              <div className="absolute inset-0.5 bg-background rounded-full"></div>
              <div className="relative w-full h-full p-1.5">
                <Image 
                  src={developer.avatar} 
                  alt={developer.name}
                  width={144}
                  height={144}
                  className="w-full h-full rounded-full object-cover ring-2 ring-background"
                />
                {developer.featured && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    Featured
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">{developer.name}</h1>
            <div className="inline-block bg-muted/50 px-3 py-1 rounded-full mb-3 hover:bg-primary/10 transition-colors duration-200">
              <p className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200">@{developer.username}</p>
            </div>
            <p className="text-xl text-primary font-semibold mb-4">{developer.role}</p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{developer.bio}</p>
          </div>
        </div>

        {/* Developer Statistics */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                <span className="text-primary text-xl font-bold">{developer.projects.length}</span>
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">Projects</h4>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                <span className="text-primary text-xl font-bold">{developer.skills.length}</span>
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">Skills</h4>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                <span className="text-primary text-xl font-bold">{developer.yearsExperience}</span>
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">Years Exp.</h4>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                <span className="text-primary text-xl font-bold">{developer.achievements.length}</span>
              </div>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">Achievements</h4>
            </div>
          </div>
        </div>
        
        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Contact & Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a href={developer.social.email} className="text-foreground hover:text-primary">
                    {developer.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{developer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{developer.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span>{developer.yearsExperience} years experience</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <div className="space-y-3">
                <a 
                  href={developer.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href={developer.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href={developer.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center Column - Skills */}
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group">
            <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-200">Skills & Technologies</h3>
            
            {/* Skill Categories */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">Frontend</span>
                <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-semibold">Backend</span>
                <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-semibold">DevOps</span>
                <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs font-semibold">Other</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-1/4"></div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Skill Level Indicators */}
            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Frontend Development</span>
                  <span className="text-primary">Advanced</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-4/5"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Backend Development</span>
                  <span className="text-primary">Intermediate</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-3/5"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">DevOps</span>
                  <span className="text-primary">Beginner</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-2/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements Timeline */}
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 group">
            <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-200">Achievements Timeline</h3>
            
            <div className="relative pl-8 border-l-2 border-primary/30 space-y-6">
              {developer.achievements.map((achievement, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] w-4 h-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  
                  {/* Achievement card */}
                  <div className="bg-muted/40 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium">{achievement}</span>
                      <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                        {2023 - index} {/* Placeholder year */}
                      </span>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="h-1 flex-grow bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${100 - (index * 10)}%` }}></div>
                      </div>
                      <span className="text-xs text-primary font-medium">{100 - (index * 10)}%</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Future achievement placeholder */}
              <div className="relative opacity-50">
                <div className="absolute -left-[25px] w-4 h-4 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-background rounded-full"></div>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border border-dashed border-muted-foreground/30">
                  <span className="text-sm text-muted-foreground">Next milestone...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developer.projects.map((project, index) => (
              <div 
                key={index} 
                className="group bg-card p-6 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{project.name}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2.5 py-1 bg-muted/70 text-muted-foreground rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 bg-muted/50 text-muted-foreground rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      asChild 
                      size="sm" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                        View Project
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </a>
                    </Button>
                    
                    {/* Project number badge */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 text-muted-foreground text-sm font-medium group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative overflow-hidden bg-card p-8 rounded-lg border border-border hover:border-primary/20 transition-colors duration-300 max-w-2xl mx-auto">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Connect with {developer.name}</h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
              
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Interested in collaborating or learning more? Reach out and let&apos;s build something amazing together!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button asChild className="bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-sm hover:shadow-md">
                  <a href={developer.social.email} className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button variant="neutral" asChild className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors duration-200 shadow-sm hover:shadow-md">
                  <a href={developer.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub
                  </a>
                </Button>
                <Button variant="neutral" asChild className="border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors duration-200 shadow-sm hover:shadow-md">
                  <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
              
              {/* Availability indicator */}
              <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Available for new opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
