import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { MatchFilters } from '../types';

interface MentorFiltersProps {
  filters: MatchFilters;
  onFilterChange: (filters: MatchFilters) => void;
}

export function MentorFilters({ filters, onFilterChange }: MentorFiltersProps) {
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing'];
  const experienceLevels = [
    { value: 'junior', label: 'Junior (1-3 years)' },
    { value: 'mid', label: 'Mid-Level (4-7 years)' },
    { value: 'senior', label: 'Senior (8+ years)' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filter Mentors
        </h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by expertise..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={filters.industry}
              onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => 
                onFilterChange({ 
                  ...filters, 
                  experienceLevel: e.target.value as 'junior' | 'mid' | 'senior' 
                })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Experience</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}