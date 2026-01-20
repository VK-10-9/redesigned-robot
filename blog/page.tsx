import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developer Blog | VishwaDev",
  description: "Insights, tutorials, and updates from the VishwaDev community.",
}

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Getting Started with Machine Learning in 2025",
      excerpt: "A comprehensive guide for beginners looking to enter the world of AI and machine learning.",
      author: "Dr. Sarah Kim",
      publishDate: "Jan 15, 2025",
      readTime: "8 min read",
      category: "AI/ML",
      slug: "getting-started-ml-2025",
      featured: true
    },
    {
      title: "Building Scalable Web Applications with Next.js",
      excerpt: "Learn best practices for creating performant and scalable web applications using Next.js 14.",
      author: "Michael Chen",
      publishDate: "Jan 10, 2025",
      readTime: "12 min read",
      category: "Web Dev",
      slug: "scalable-nextjs-apps",
      featured: false
    },
    {
      title: "The Future of Mobile Development",
      excerpt: "Exploring emerging trends in mobile app development including AR, AI integration, and cross-platform solutions.",
      author: "Lisa Rodriguez",
      publishDate: "Jan 8, 2025",
      readTime: "6 min read",
      category: "Mobile",
      slug: "future-mobile-development",
      featured: true
    },
    {
      title: "IoT Security Best Practices",
      excerpt: "Essential security considerations when building Internet of Things applications and devices.",
      author: "James Wilson",
      publishDate: "Jan 5, 2025",
      readTime: "10 min read",
      category: "IoT",
      slug: "iot-security-practices",
      featured: false
    },
    {
      title: "Open Source Contribution Guide",
      excerpt: "How to start contributing to open source projects and make a meaningful impact in the developer community.",
      author: "Alex Kumar",
      publishDate: "Jan 3, 2025",
      readTime: "7 min read",
      category: "Community",
      slug: "open-source-guide",
      featured: false
    },
    {
      title: "Career Tips for New Developers",
      excerpt: "Practical advice for students and new developers entering the tech industry.",
      author: "Emma Davis",
      publishDate: "Dec 28, 2024",
      readTime: "9 min read",
      category: "Career",
      slug: "career-tips-developers",
      featured: false
    }
  ]

  const categories = ["All", "AI/ML", "Web Dev", "Mobile", "IoT", "Community", "Career"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Developer Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts from our community of developers, mentors, and tech enthusiasts.
            Stay updated with the latest trends and best practices.
          </p>
        </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category, index) => (
          <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
            {category}
          </Badge>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {blogPosts.filter(post => post.featured).map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <Badge>Featured</Badge>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <Button asChild variant="neutral" size="sm">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  By {post.author} • {post.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.publishDate}</span>
                  <Button asChild variant="neutral" size="sm">
                    <Link href={`/blog/${post.slug}`}>Read →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest articles and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Subscribe to Newsletter</Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
