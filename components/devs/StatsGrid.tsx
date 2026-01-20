'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Stat } from "../../src/types/developer";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';

interface StatsGridProps {
  stats: (Omit<Stat, 'icon'> & { iconName: string })[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="text-center overflow-hidden border-muted/40 hover:border-primary/20 transition-colors">
            <CardContent className="pt-6 pb-6">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/5 blur-xl" />
              </div>
              {(() => {
                const IconComponent = LucideIcons[stat.iconName as keyof typeof LucideIcons] as React.FC<{ className: string }>;
                return IconComponent ? <IconComponent className="w-10 h-10 mx-auto mb-4 text-primary" /> : null;
              })()}
              <div className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
