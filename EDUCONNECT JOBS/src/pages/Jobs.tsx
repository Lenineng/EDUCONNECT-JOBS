import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string;
  location: string;
  type: string;
  employer_name: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: number) => {
    if (!user) {
      setError('Please login to apply for jobs');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to apply');
      alert('Application submitted successfully!');
    } catch (err) {
      setError('Failed to submit application');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Opportunities</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>{job.type}</span>
                  <span className="mx-2">•</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{job.description}</p>
            
            <div className="border-t pt-4">
              <button
                onClick={() => handleApply(job.id)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;