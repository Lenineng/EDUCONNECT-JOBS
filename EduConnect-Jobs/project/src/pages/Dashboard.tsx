import React from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Mentor Connections', value: '12', icon: Users },
    { label: 'Job Applications', value: '5', icon: Briefcase },
    { label: 'Upcoming Meetings', value: '3', icon: Calendar },
    { label: 'Profile Views', value: '245', icon: TrendingUp },
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
              <div className="bg-blue-100 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-blue-600" />
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
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Recent Messages
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <img
                  src={`https://images.unsplash.com/photo-${1570295999919 + i}-b8d9078fb959?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80`}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Sarah Thompson</p>
                  <p className="text-sm text-gray-500 truncate">
                    Thanks for connecting! I'd love to schedule a mentoring session...
                  </p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-14 text-center">
                  <div className="text-lg font-bold text-gray-900">{15 + i}</div>
                  <div className="text-xs text-gray-500">MAR</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Technical Interview Prep Session
                  </p>
                  <p className="text-sm text-gray-500">
                    with Michael Chen • 2:00 PM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}