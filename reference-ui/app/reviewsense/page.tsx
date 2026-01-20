import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ReviewSense - AI-Powered Review Summarizer",
  description: "Explore ReviewSense, an intelligent product review summarizer that uses AI to analyze and summarize customer reviews for smarter decision-making.",
}

export default function ReviewSensePage() {
  const features = [
    {
      title: "Automatic Review Scraping",
      description: "Seamlessly scrapes product reviews from e-commerce platforms using BeautifulSoup",
      icon: "🔍"
    },
    {
      title: "Sentiment Analysis",
      description: "Achieves ~90% accuracy in classifying reviews as Positive or Negative using Logistic Regression",
      icon: "📊"
    },
    {
      title: "AI-Powered Summaries",
      description: "Generates concise summaries using BART (Bidirectional and Auto-Regressive Transformers)",
      icon: "🤖"
    },
    {
      title: "Real-Time Insights",
      description: "Provides instant structured insights through a user-friendly Flask-based web interface",
      icon: "⚡"
    }
  ]

  const techStack = [
    { name: "Flask", category: "Backend Framework" },
    { name: "Python", category: "Language" },
    { name: "BeautifulSoup", category: "Web Scraping" },
    { name: "scikit-learn", category: "ML Library" },
    { name: "Transformers", category: "NLP Library" },
    { name: "HTML/CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" }
  ]

  const methodology = [
    {
      step: "01",
      title: "Data Collection",
      description: "Automated scraping of product reviews from e-commerce websites using BeautifulSoup"
    },
    {
      step: "02",
      title: "Sentiment Classification",
      description: "Logistic Regression model trained on review datasets with 90% accuracy"
    },
    {
      step: "03",
      title: "AI Summarization",
      description: "BART model integration for generating concise, meaningful summaries"
    },
    {
      step: "04",
      title: "User Interface",
      description: "Flask backend with dynamic HTML/CSS/JavaScript frontend for real-time insights"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              AI/ML Project
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ReviewSense
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-Powered Product Review Summarizer for Smarter Decision-Making
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Developed by <span className="font-semibold text-foreground">Yashas Patil</span>
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Project Overview</CardTitle>
              <CardDescription>
                Solving the information overload problem in e-commerce reviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                In today&apos;s digital-first marketplace, consumers rely heavily on product reviews before making a purchase. 
                However, the sheer volume of reviews often overwhelms buyers, making it difficult to extract meaningful insights. 
                ReviewSense addresses this challenge by automatically scraping, analyzing, and summarizing product reviews to empower smarter decision-making.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">90%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Real-Time</div>
                  <div className="text-sm text-muted-foreground">Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">BART</div>
                  <div className="text-sm text-muted-foreground">AI Model</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem Statement */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">E-commerce platforms host thousands of reviews per product</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Customers struggle to differentiate between genuine feedback and noise</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Manual review analysis is time-consuming and inefficient</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Need for a system that provides quick, accurate, and sentiment-aware summaries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{feature.icon}</span>
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Implementation Methodology</h2>
            <div className="space-y-6">
              {methodology.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Technology Stack</CardTitle>
              <CardDescription>
                Built with modern technologies for scalability and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="text-center">
                    <Badge variant="outline" className="text-sm">
                      {tech.name}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tech.category}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results & Impact */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Results & Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Reduced information overload by condensing hundreds of reviews into short summaries</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Enhanced decision-making for consumers by providing structured insights</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Created a scalable, modular system that can be extended to multiple e-commerce platforms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Enhancements */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Future Enhancements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Expand scraping support for more e-commerce sites (Flipkart, Amazon, etc.)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Add aspect-based sentiment analysis (e.g., battery life, delivery, quality)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Deploy on cloud platforms (AWS/GCP) for scalability</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Integrate with browser extensions for instant review summarization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore ReviewSense?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Check out the live demo or explore the source code to learn more about this AI-powered review summarizer developed by Yashas Patil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="https://reviewsense.vercel.app" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </Link>
              </Button>
              <Button asChild variant="neutral">
                <Link href="https://github.com/yashas-patil/ReviewSense" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}