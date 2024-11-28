import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useJobStore } from '../store/jobStore';
import { 
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react';

export function EmployerDashboard() {
  const user = useAuthStore((state) => state.user);
  const { jobs } = useJobStore();

  const stats = [
    { 
      label: 'Active Jobs', 
      value: jobs.filter(job => job.status === 'open').length,
      icon: Briefcase,
      color: 'blue'
    },
    { 
      label: 'Total Applicants', 
      value: '156',
      icon: Users,
      color: 'green'
    },
    { 
      label: 'Interviews Scheduled', 
      value: '12',
      icon: Clock,
      color: 'yellow'
    },
    { 
      label: 'Profile Views', 
      value: '1.2k',
      icon: TrendingUp,
      color: 'purple'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Post New Job
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4"
            >
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <img
                  src={`https://images.unsplash.com/photo-${1570295999919 + i}-b8d9078fb959?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80`}
                  alt="Applicant"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">Sarah Thompson</p>
                    <span className="text-sm text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm text-gray-500">Applied for Frontend Developer</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Job Listings</h3>
          <div className="space-y-4">
            {jobs.filter(job => job.status === 'open').map((job) => (
              <div key={job.id} className="p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {job.applications?.length || 0} applicants
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {job.requirements.slice(0, 3).map((req) => (
                    <span key={req} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}