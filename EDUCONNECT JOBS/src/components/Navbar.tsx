import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">EDUCONNECT JOBS</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/jobs" className="text-white hover:text-indigo-100">Jobs</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-indigo-100">Dashboard</Link>
                <button
                  onClick={logout}
                  className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;