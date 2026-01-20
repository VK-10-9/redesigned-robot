'use client'

import React, { useState, useMemo } from 'react';
import { DeveloperCard } from "./DeveloperCard";
import { SearchAndFilter } from "./SearchAndFilter";
import { SortOptions, SortOption } from './SortOptions';
import { Developer } from "../../src/types/developer";
import { motion, AnimatePresence } from 'framer-motion';

interface DeveloperGridProps {
  developers: Developer[];
  title?: string;
}

export const DeveloperGrid: React.FC<DeveloperGridProps> = ({ 
  developers, 
  title = "Our Developer Community" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');

  // Get popular skills (top 8)
  const popularSkills = useMemo(() => {
    const skillCount = new Map<string, number>();
    
    developers.forEach(dev => {
      dev.skills.forEach(skill => {
        skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
      });
    });
    
    return Array.from(skillCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(entry => entry[0]);
  }, [developers]);

  // Filter developers based on search query and active filters
  const filteredDevelopers = useMemo(() => {
    // First filter the developers
    const filtered = developers.filter(developer => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        developer.name.toLowerCase().includes(searchLower) ||
        developer.role.toLowerCase().includes(searchLower) ||
        developer.bio.toLowerCase().includes(searchLower) ||
        developer.skills.some(skill => skill.toLowerCase().includes(searchLower));
      
      // Skills filter
      const matchesSkills = activeFilters.length === 0 ||
        activeFilters.every(filter => developer.skills.includes(filter));
      
      return matchesSearch && matchesSkills;
    });
    
    // Then sort the filtered developers
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'recent':
          // Assuming higher IDs are more recent
          return b.id - a.id;
        default:
          return 0;
      }
    });
  }, [developers, searchQuery, activeFilters, sortOption]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterBySkill = (skill: string) => {
    if (activeFilters.includes(skill)) {
      handleClearFilter(skill);
    } else {
      setActiveFilters([...activeFilters, skill]);
    }
  };

  const handleClearFilter = (skill: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== skill));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      
      <SearchAndFilter
        onSearch={handleSearch}
        onFilterBySkill={handleFilterBySkill}
        activeFilters={activeFilters}
        onClearFilter={handleClearFilter}
        onClearAllFilters={handleClearAllFilters}
        popularSkills={popularSkills}
      />
      
      <div className="flex justify-end mb-4">
        <SortOptions 
          onSort={setSortOption}
          currentSort={sortOption}
        />
      </div>
      
      <AnimatePresence>
        {filteredDevelopers.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDevelopers.map((developer) => (
              <motion.div
                key={developer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DeveloperCard developer={developer} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No developers found matching your criteria.</p>
            <button 
              onClick={handleClearAllFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
