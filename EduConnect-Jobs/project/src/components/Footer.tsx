import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EduConnect Jobs</h3>
            <p className="text-gray-400">Connecting students with opportunities in Rwanda</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">Browse Jobs</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white">Sign Up</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@educonnectjobs.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} EduConnect Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;