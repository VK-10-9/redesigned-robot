'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToDevs = () => {
    const devsSection = document.getElementById('developer-community');
    if (devsSection) {
      devsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-center mb-20 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-muted-foreground bg-clip-text text-transparent">
          Meet Our Student Developers
        </h1>
      </motion.div>
      
      <motion.p 
        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get to know the talented student developers who are building the future of technology. 
        From full-stack development to AI/ML, our community represents the next generation of tech innovators.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button 
          onClick={scrollToDevs}
          className="rounded-full px-6 group"
          size="lg"
        >
          Explore Developers
          <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
        </Button>
      </motion.div>
    </div>
  );
};
