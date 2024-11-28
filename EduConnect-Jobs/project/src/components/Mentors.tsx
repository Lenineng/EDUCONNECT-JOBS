import React, { useState } from 'react';
import { MentorCard } from './MentorCard';
import { MentorFilters } from './MentorFilters';
import type { Mentor, MatchFilters } from '../types';

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Software Engineer',
    company: 'Google',
    expertise: ['React', 'Node.js', 'System Design'],
    yearsOfExperience: 8,
    bio: 'Passionate about helping junior developers grow and succeed in their careers.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Engineering Manager',
    company: 'Microsoft',
    expertise: ['Leadership', 'Frontend', 'Career Growth'],
    yearsOfExperience: 12,
    bio: 'Helping students bridge the gap between academia and industry.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Emily Johnson',
    title: 'Product Manager',
    company: 'Amazon',
    expertise: ['Product Strategy', 'Agile', 'User Research'],
    yearsOfExperience: 6,
    bio: 'Dedicated to mentoring the next generation of product leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    matchScore: 82,
  },
];

export function Mentors() {
  const [filters, setFilters] = useState<MatchFilters>({});

  const handleConnect = (mentorId: string) => {
    console.log('Connecting with mentor:', mentorId);
    // Implement connection logic
  };

  return (
    <div className="space-y-6">
      <MentorFilters filters={filters} onFilterChange={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onConnect={handleConnect}
          />
        ))}
      </div>
    </div>
  );
}