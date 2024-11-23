import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with Your Dream Career
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Connecting Rwandan students with employers, mentors, and opportunities
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50"
              >
                Get Started
              </Link>
              <Link
                to="/jobs"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Briefcase className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-600">
                Access exclusive job listings and internships from top employers in Rwanda
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
              <p className="text-gray-600">
                Connect with industry professionals for guidance and support
              </p>
            </div>
            <div className="text-center p-6">
              <GraduationCap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Focus</h3>
              <p className="text-gray-600">
                Tailored for undergraduate students in Rwanda
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;