import React from 'react';
import { MessageSquare, Briefcase, Award, Star } from 'lucide-react';
import type { Mentor } from '../types';

interface MentorCardProps {
  mentor: Mentor;
  onConnect: (mentorId: string) => void;
}

export function MentorCard({ mentor, onConnect }: MentorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="absolute -bottom-12 left-6">
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>
      
      <div className="pt-14 px-6 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {mentor.title} at {mentor.company}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-blue-700 font-medium">{mentor.matchScore}% Match</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 line-clamp-2">{mentor.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5" />
              <span>{mentor.yearsOfExperience}+ years experience</span>
            </div>
            <button
              onClick={() => onConnect(mentor.id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}