import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Project } from '@/src/types/project';
import { Calendar, Users, Star, GitFork, Eye, ExternalLink, Github, Zap, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const getDifficultyColor = (difficulty: Project['difficulty']) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-orange-100 text-orange-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/projects/${project.id}`}>
        <div className="relative h-48 w-full group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Badge className="bg-white/90 text-black" variant="secondary">
              {project.category}
            </Badge>
            {project.trending && (
              <Badge className="bg-orange-500/90 text-white flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Trending
              </Badge>
            )}
          </div>

          {/* Status and Difficulty */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Badge className={getDifficultyColor(project.difficulty)}>
              {project.difficulty}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl line-clamp-2 mb-1">{project.title}</CardTitle>
            {project.tagline && (
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>
        
        {/* Project Metrics */}
        {project.metrics && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {project.metrics.stars && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {project.metrics.stars}
              </div>
            )}
            {project.metrics.forks && (
              <div className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {project.metrics.forks}
              </div>
            )}
            {project.metrics.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {project.metrics.views}
              </div>
            )}
          </div>
        )}

        {/* Contributors */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {project.contributors.slice(0, 3).map((contributor, index) => (
                <Avatar key={contributor.developerId} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={`/placeholder-user.jpg`} />
                  <AvatarFallback className="text-xs">
                    {contributor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.contributors.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +{project.contributors.length - 3}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {formatDate(project.lastUpdated)}
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>

        {/* Duration */}
        {project.duration && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {project.duration}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-4">
        <Button asChild variant="neutral" size="sm" className="flex-1">
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" />
            Code
          </Link>
        </Button>
        {project.liveUrl && (
          <Button asChild size="sm" className="flex-1">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}