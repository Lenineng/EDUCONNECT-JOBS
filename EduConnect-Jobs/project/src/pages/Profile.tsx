import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Plus,
  Pencil
} from 'lucide-react';

export function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center -mt-12">
              <img
                src={user?.imageUrl}
                alt={user?.name}
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="ml-4 mt-12">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.title}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                {user?.email}
              </div>
              {user?.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  {user.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Education
            </h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {user?.education?.map((edu) => (
              <div key={edu.id} className="border-b pb-4 last:border-0">
                <h4 className="font-medium text-gray-900">{edu.school}</h4>
                <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Experience
            </h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {user?.experience?.map((exp) => (
              <div key={exp.id} className="border-b pb-4 last:border-0">
                <h4 className="font-medium text-gray-900">{exp.title}</h4>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {user?.role === 'student' && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}