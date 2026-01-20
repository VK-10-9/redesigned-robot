"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Users,
  HelpCircle,
  ArrowRight
} from "lucide-react";

const priorities = [
  { id: "low", label: "Low Priority", description: "General questions or feedback" },
  { id: "medium", label: "Medium Priority", description: "Account issues or technical problems" },
  { id: "high", label: "High Priority", description: "Payment issues or security concerns" },
  { id: "urgent", label: "Urgent", description: "System outages or critical bugs" }
];

const supportCategories = [
  { id: "technical", label: "Technical Support", icon: <AlertCircle className="w-5 h-5" /> },
  { id: "account", label: "Account Issues", icon: <Users className="w-5 h-5" /> },
  { id: "billing", label: "Billing & Payment", icon: <FileText className="w-5 h-5" /> },
  { id: "general", label: "General Questions", icon: <HelpCircle className="w-5 h-5" /> }
];

const quickHelp = [
  {
    title: "Password Reset",
    description: "Reset your account password in a few simple steps",
    link: "#"
  },
  {
    title: "Account Settings",
    description: "Update your profile and notification preferences",
    link: "#"
  },
  {
    title: "Project Guidelines",
    description: "Learn how to submit and showcase your projects",
    link: "#"
  },
  {
    title: "Community Rules",
    description: "Understand our community guidelines and standards",
    link: "#"
  }
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call to submit support ticket
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      priority: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Support Center
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the help you need. Our support team is here to assist you with any questions or issues.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Mail className="w-5 h-5 text-foreground" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@vishwadev.tech</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Phone className="w-5 h-5 text-foreground" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Clock className="w-5 h-5 text-foreground" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM PST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>
                  Common questions and self-service options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickHelp.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Support Ticket Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>
                  Describe your issue and we&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      >
                        <option value="">Select a category</option>
                        {supportCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-2">
                        Priority *
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        required
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      >
                        <option value="">Select priority</option>
                        {priorities.map((priority) => (
                          <option key={priority.id} value={priority.id}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your issue in detail..."
                      rows={6}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                    <Button 
                      type="button" 
                      variant="neutral" 
                      className="flex-1"
                      onClick={() => setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        category: "",
                        priority: "",
                        message: ""
                      })}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Support Categories */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {supportCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {category.icon}
                      {category.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Get help with {category.label.toLowerCase()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      View Articles
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-semibold">Response Times</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Low</Badge>
                  <p className="text-muted-foreground">2-3 business days</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Medium</Badge>
                  <p className="text-muted-foreground">1-2 business days</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">High</Badge>
                  <p className="text-muted-foreground">4-8 hours</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Urgent</Badge>
                  <p className="text-muted-foreground">1-2 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
