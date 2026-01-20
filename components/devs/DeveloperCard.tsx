"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { Developer } from "../../src/types/developer";

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  // Function to handle click events on social links to prevent propagation
  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="block">
      <Link href={`/${developer.username.toLowerCase()}`} className="block">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 cursor-pointer group overflow-hidden border-muted/40">
          {/* Card Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-1 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center ring-2 ring-background shadow-md group-hover:from-primary/90 group-hover:to-primary/70 transition-all duration-300">
                  <span className="text-white font-bold text-lg">
                    {developer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {developer.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs group-hover:bg-primary/10 transition-all duration-300">@{developer.username}</Badge>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    {developer.role}
                    {developer.featured && (
                      <Badge variant="default" className="ml-2 text-[10px] py-0 px-1.5 animate-pulse">Featured</Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </div>
          
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{developer.bio}</p>
            
            {/* Projects Section */}
            {developer.projects && developer.projects.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium mb-2 text-muted-foreground">Recent Project:</p>
                <div className="bg-muted/30 rounded-md p-3 hover:bg-muted/50 transition-colors duration-200 group/project">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium group-hover/project:text-primary transition-colors duration-200">{developer.projects[0].name}</p>
                    {developer.projects[0].link && (
                      <a 
                        href={developer.projects[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover/project:opacity-100 transition-opacity duration-200"
                      >
                        <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{developer.projects[0].description}</p>
                  <div className="flex flex-wrap gap-1">
                    {developer.projects[0].tech.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-[10px] bg-background/50">
                        {tech}
                      </Badge>
                    ))}
                    {developer.projects[0].tech.length > 3 && (
                      <Badge variant="secondary" className="text-[10px] bg-background/50">
                        +{developer.projects[0].tech.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Top Skills */}
            <div className="mb-4">
              <p className="text-xs font-medium mb-2 text-muted-foreground">Skills:</p>
              <div className="flex flex-wrap gap-1.5">
                {developer.skills.slice(0, 4).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
                {developer.skills.length > 4 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                  >
                    +{developer.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Experience & Location */}
            <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-muted/30 pt-3 mt-4">
              <span className="flex items-center gap-1.5 group/exp">
                <span className="inline-block w-2 h-2 rounded-full bg-primary/60 group-hover/exp:bg-primary group-hover/exp:animate-pulse transition-colors"></span>
                <span className="group-hover/exp:text-primary transition-colors">{developer.yearsExperience} years exp.</span>
              </span>
              <span className="flex items-center gap-1.5 group/loc hover:text-primary transition-colors">
                <MapPin className="w-3 h-3" />
                {developer.location}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      {/* Social Links - Moved outside of the Link component */}
      <div className="flex gap-3 mt-2 px-4">
        {developer.social.linkedin && (
          <a 
            href={developer.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={handleSocialClick}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {developer.social.twitter && (
          <a 
            href={developer.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={handleSocialClick}
          >
            <Twitter className="w-4 h-4" />
          </a>
        )}
        {developer.social.github && (
          <a 
            href={developer.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={handleSocialClick}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {developer.social.email && (
          <a 
            href={developer.social.email} 
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={handleSocialClick}
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
