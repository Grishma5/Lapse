import React from 'react';
import { Shield } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF]/80 py-12 border-t border-[#ECD2E0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <a to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <img src="http://localhost:5555/uploads/logo.svg" alt="Lapse Logo" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] bg-clip-text text-transparent">
                  Lapse
                </span>
              </a>
            </div>
            <p className="text-[#A7ABDE] mb-4">
              Organize. Prioritize. Achieve. Lapse makes task management fun and effortless with a touch of pastel magic.
            </p>
            <div className="flex items-center text-[#A7ABDE]">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm">Secure & Private</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-[#A7ABDE]">Explore Lapse</h3>
            <ul className="space-y-2 text-[#A7ABDE]">
            <li><a href="/#how-it-works" className="text-gray-400 hover:text-white transition">
              How it works
            </a></li>
            <li><a href="/#about" className="text-gray-400 hover:text-white transition">
              About Us
            </a></li>
            <li><a href="/#contact" className="text-gray-400 hover:text-white transition">
              Contact
            </a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#ECD2E0]/50 mt-8 pt-8 text-center text-[#A7ABDE]">
          <p>© 2025 Lapse. All rights reserved. Built with ❤ by Grishma Shrestha.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;