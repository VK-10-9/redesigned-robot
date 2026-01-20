import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events & Workshops | VishwaDev",
  description: "Join community events, workshops, and tech talks hosted by VishwaDev.",
}

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "AI Workshop: Building Your First Neural Network",
      description: "Hands-on workshop covering the fundamentals of neural networks using Python and TensorFlow.",
      date: "Feb 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Tech Hub, Room 201",
      type: "Workshop",
      capacity: "30 seats",
      registrationUrl: "#",
      featured: true
    },
    {
      title: "Web Development Bootcamp",
      description: "3-day intensive bootcamp covering React, Node.js, and modern web development practices.",
      date: "Feb 20-22, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Campus, Lab A",
      type: "Bootcamp",
      capacity: "25 seats",
      registrationUrl: "#",
      featured: true
    },
    {
      title: "Tech Talk: The Future of Cloud Computing",
      description: "Industry experts discuss emerging trends in cloud technologies and serverless architectures.",
      date: "Feb 28, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Auditorium B",
      type: "Tech Talk",
      capacity: "100 seats",
      registrationUrl: "#",
      featured: false
    }
  ]

  const pastEvents = [
    {
      title: "Mobile App Development Workshop",
      description: "Cross-platform mobile development using React Native and Flutter.",
      date: "Jan 18, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Tech Hub, Room 105",
      type: "Workshop",
      attendees: 28,
      recording: "#"
    },
    {
      title: "Open Source Contribution Hackathon",
      description: "24-hour hackathon focused on contributing to open source projects.",
      date: "Jan 12-13, 2025",
      time: "24 hours",
      location: "Innovation Center",
      type: "Hackathon",
      attendees: 45,
      recording: "#"
    },
    {
      title: "Career Panel: Landing Your First Tech Job",
      description: "Industry professionals share insights on breaking into the tech industry.",
      date: "Dec 15, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Main Auditorium",
      type: "Panel",
      attendees: 120,
      recording: "#"
    }
  ]

  const getEventTypeColor = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "Workshop": return "default"
      case "Bootcamp": return "destructive"
      case "Tech Talk": return "secondary"
      case "Hackathon": return "outline"
      case "Panel": return "default"
      default: return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Events & Workshops</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community events, workshops, and tech talks. Learn from industry experts,
            network with peers, and enhance your technical skills.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${event.featured ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    {event.featured && <Badge>Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={event.registrationUrl}>Register Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge variant="outline">Past</Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <Button asChild variant="neutral" size="sm" className="w-full">
                    <Link href={event.recording}>View Recording</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Want to Host an Event?</CardTitle>
              <CardDescription>
                Have an idea for a workshop or tech talk? We&apos;d love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Propose an Event</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
