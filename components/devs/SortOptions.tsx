'use client'

import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownAZ, ArrowUpAZ, Clock, Star } from 'lucide-react';

export type SortOption = 'name_asc' | 'name_desc' | 'experience' | 'recent';

interface SortOptionsProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

export const SortOptions: React.FC<SortOptionsProps> = ({ onSort, currentSort }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select
        value={currentSort}
        onValueChange={(value) => onSort(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name_asc">
            <div className="flex items-center">
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              <span>Name (A-Z)</span>
            </div>
          </SelectItem>
          <SelectItem value="name_desc">
            <div className="flex items-center">
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              <span>Name (Z-A)</span>
            </div>
          </SelectItem>
          <SelectItem value="experience">
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              <span>Experience</span>
            </div>
          </SelectItem>
          <SelectItem value="recent">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>Recently Added</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};