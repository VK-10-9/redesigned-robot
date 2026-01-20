'use client'

import React from 'react';
import { Developer } from '@/src/types/developer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Code2, FolderKanban } from 'lucide-react';

interface StatsSectionProps {
  developers: Developer[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ developers }) => {
  // Calculate statistics
  const totalDevelopers = developers.length;
  
  // Extract unique skills across all developers
  const uniqueSkills = new Set<string>();
  developers.forEach(dev => {
    dev.skills.forEach(skill => uniqueSkills.add(skill));
  });
  
  // Count total projects
  const totalProjects = developers.reduce((acc, dev) => acc + dev.projects.length, 0);
  
  const stats = [
    {
      title: 'Developers',
      value: totalDevelopers,
      icon: <Users className="h-5 w-5 text-primary" />,
      description: 'Talented professionals'
    },
    {
      title: 'Skills',
      value: uniqueSkills.size,
      icon: <Code2 className="h-5 w-5 text-primary" />,
      description: 'Diverse technologies'
    },
    {
      title: 'Projects',
      value: totalProjects,
      icon: <FolderKanban className="h-5 w-5 text-primary" />,
      description: 'Showcased work'
    }
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-muted/40 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};