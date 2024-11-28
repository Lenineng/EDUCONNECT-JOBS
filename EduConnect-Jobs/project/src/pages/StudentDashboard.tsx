import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useJobStore } from '../store/jobStore';
import { 
  Briefcase, 
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const { applications } = useJobStore();

  const stats = [
    { 
      label: 'Applications Sent', 
      value: applications.length,
      icon: Briefcase,
      color: 'blue'
    },
    { 
      label: 'Under Review', 
      value: applications.filter(app => app.status === 'pending').length,
      icon: Clock,
      color: 'yellow'
    },
    { 
      label: 'Accepted', 
      value: applications.filter(app => app.status === 'accepted').length,
      icon: CheckCircle,
      color: 'green'
    },
    { 
      label: 'Rejected', 
      value: applications.filter(app => app.status === 'rejected').length,
      icon: XCircle,
      color: 'red'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.name}!
        </h2>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            Recent Applications
          </h3>
          <div className="space-y-4">
            {applications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Frontend Developer Intern</p>
                  <p className="text-sm text-gray-500">TechCorp • Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Recommended Jobs
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Software Engineer Intern</p>
                    <p className="text-sm text-gray-500">InnovateTech • San Francisco, CA</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    95% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}