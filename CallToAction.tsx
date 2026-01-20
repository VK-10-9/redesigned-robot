'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, MessageSquare, Code } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-3xl mx-auto overflow-hidden border-primary/20">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-1">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
              Join Our Developer Community
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Are you a student developer? Join our growing community of innovators and showcase your projects to the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                <Code className="w-10 h-10 text-primary mb-3" />
                <h4 className="font-medium mb-1">Showcase Projects</h4>
                <p className="text-sm text-muted-foreground">Share your work with the community and get feedback</p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                <MessageSquare className="w-10 h-10 text-primary mb-3" />
                <h4 className="font-medium mb-1">Connect with Peers</h4>
                <p className="text-sm text-muted-foreground">Network with like-minded student developers</p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg bg-muted/30">
                <Github className="w-10 h-10 text-primary mb-3" />
                <h4 className="font-medium mb-1">Collaborate</h4>
                <p className="text-sm text-muted-foreground">Find partners for your next big project</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-6" asChild>
                <Link href="/projects">
                  View All Projects
                </Link>
              </Button>
              <Button size="lg" variant="neutral" className="rounded-full px-6 border-primary/20 hover:bg-primary/5" asChild>
                <Link href="/discord">
                  Join Discord Community
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};
