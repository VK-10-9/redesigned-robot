import { projects } from "../projects-data";
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/src/types/project';
import { Metadata } from 'next';
import { Calendar, Github, ExternalLink, Users, Star, GitFork, Eye } from 'lucide-react';

interface ProjectPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id.toString() === params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found | VishwaDev',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | VishwaDev`,
    description: project.tagline || project.description.substring(0, 160),
    openGraph: {
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id.toString() === params.id);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={project.image || '/placeholder.svg'}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-sm">{project.category}</Badge>
                <Badge className={`${getStatusColor(project.status)} text-xs`}>
                  {project.status.replace('-', ' ')}
                </Badge>
                <Badge className={`${getDifficultyColor(project.difficulty)} text-xs`}>
                  {project.difficulty}
                </Badge>
                {project.featured && (
                  <Badge className="bg-amber-500 text-white text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
              {project.tagline && (
                <p className="text-xl text-gray-300 max-w-3xl">{project.tagline}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Description */}
              <section className="bg-card p-6 rounded-xl border">
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </section>

              {/* Technologies Used */}
              <section className="bg-card p-6 rounded-xl border">
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline"
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section className="bg-card p-6 rounded-xl border">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-primary mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Details */}
              <div className="bg-card p-6 rounded-xl border space-y-4">
                <h3 className="text-xl font-bold">Project Details</h3>
                <div className="space-y-4">
                  {/* Project Status */}
                  <div className="space-y-1">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      Status
                    </h4>
                    <Badge className={`${getStatusColor(project.status)} w-fit`}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Project Timeline */}
                  <div className="space-y-1">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Timeline
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Started: {formatDate(project.createdDate)}</p>
                      <p>Last updated: {formatDate(project.lastUpdated)}</p>
                      {project.duration && <p>Duration: {project.duration}</p>}
                    </div>
                  </div>

                  {/* Contributors */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Team
                    </h4>
                    <div className="space-y-2">
                      {project.contributors.map((contributor, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            {contributor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{contributor.name}</p>
                            <p className="text-xs text-muted-foreground">{contributor.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Metrics */}
                  {project.metrics && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Metrics</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {project.metrics.stars !== undefined && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{project.metrics.stars.toLocaleString()}</span>
                          </div>
                        )}
                        {project.metrics.forks !== undefined && (
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4 text-purple-500" />
                            <span>{project.metrics.forks.toLocaleString()}</span>
                          </div>
                        )}
                        {project.metrics.views !== undefined && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>{project.metrics.views.toLocaleString()} views</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="pt-2 space-y-2">
                    <Button asChild className="w-full">
                      <Link 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button asChild variant="neutral" className="w-full">
                        <Link 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.links && project.links.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Additional Links</h4>
                        <div className="space-y-1">
                          {project.links
                            .filter(link => !['github', 'live'].includes(link.type))
                            .map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {link.label}
                              </a>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}