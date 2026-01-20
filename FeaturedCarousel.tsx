'use client'

import React, { useState, useEffect } from 'react';
import { Developer } from '@/src/types/developer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedCarouselProps {
  developers: Developer[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ developers }) => {
  const featuredDevs = developers.filter(dev => dev.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (featuredDevs.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prevIndex => (prevIndex + 1) % featuredDevs.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredDevs.length]);

  const handlePrevious = () => {
    if (featuredDevs.length <= 1) return;
    setDirection(-1);
    setCurrentIndex(prevIndex => (prevIndex - 1 + featuredDevs.length) % featuredDevs.length);
  };

  const handleNext = () => {
    if (featuredDevs.length <= 1) return;
    setDirection(1);
    setCurrentIndex(prevIndex => (prevIndex + 1) % featuredDevs.length);
  };

  if (featuredDevs.length === 0) {
    return null;
  }

  const currentDev = featuredDevs[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="mb-16 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Badge variant="default" className="mr-2">Featured</Badge>
        Developer Spotlight
      </h2>
      
      <div className="relative bg-card rounded-xl border border-muted/40 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center ring-2 ring-background shadow-md">
                    <span className="text-white font-bold text-xl">
                      {currentDev.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{currentDev.name}</h3>
                    <p className="text-muted-foreground">{currentDev.role}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{currentDev.bio}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Top Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDev.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <Link href={`/${currentDev.username.toLowerCase()}`} className="inline-flex">
                  <Button className="gap-2">
                    View Full Profile
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Achievement:</h4>
                {currentDev.achievements.length > 0 && (
                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <p className="italic text-muted-foreground">&quot;{currentDev.achievements[0]}&quot;</p>
                  </div>
                )}
                
                {currentDev.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Featured Project:</h4>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h5 className="font-medium">{currentDev.projects[0].name}</h5>
                      <p className="text-sm text-muted-foreground mb-4">{currentDev.projects[0].description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {currentDev.projects[0].tech.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <a 
                        href={currentDev.projects[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        View Project <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {featuredDevs.length > 1 && (
          <>
            <Button 
              variant="neutral" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="neutral" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {featuredDevs.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};