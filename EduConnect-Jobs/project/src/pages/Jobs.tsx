import React, { useState } from 'react';
import { useJobStore } from '../store/jobStore';
import { useAuthStore } from '../store/authStore';
import { 
  Search,
  MapPin,
  Building,
  Clock,
  Filter,
  Plus
} from 'lucide-react';

export function Jobs() {
  const { jobs, applyToJob } = useJobStore();
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApply = (jobId: string) => {
    if (!user) return;

    const application = {
      id: Math.random().toString(),
      jobId,
      studentId: user.id,
      status: 'pending' as const,
      appliedAt: new Date().toISOString(),
      resume: 'path/to/resume.pdf',
    };

    applyToJob(application);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.role === 'employer' ? 'Manage Jobs' : 'Find Your Next Opportunity'}
          </h2>
          {user?.role === 'employer' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center text-gray-500 gap-4">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
              {user?.role === 'student' && (
                <button
                  onClick={() => handleApply(job.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Now
                </button>
              )}
            </div>

            <div className="mt-4">
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requirements.map((req) => (
                <span
                  key={req}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {req}
                </span>
              ))}
            </div>

            {job.salary && (
              <div className="mt-4 text-sm text-gray-500">
                Salary: {job.salary}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}