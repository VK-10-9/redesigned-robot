'use client'

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterBySkill: (skill: string) => void;
  activeFilters: string[];
  onClearFilter: (skill: string) => void;
  onClearAllFilters: () => void;
  popularSkills: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilterBySkill,
  activeFilters,
  onClearFilter,
  onClearAllFilters,
  popularSkills
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search developers by name, role, or skills..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-muted-foreground">Popular skills:</span>
        {popularSkills.map((skill) => (
          <Badge 
            key={skill} 
            variant={activeFilters.includes(skill) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => onFilterBySkill(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="default"
              className="cursor-pointer"
            >
              {filter}
              <X 
                className="ml-1 h-3 w-3" 
                onClick={() => onClearFilter(filter)}
              />
            </Badge>
          ))}
          <Button 
            variant="neutral" 
            size="sm" 
            onClick={onClearAllFilters}
            className="text-xs h-7"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};