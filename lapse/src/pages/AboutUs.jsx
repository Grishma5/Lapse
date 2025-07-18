import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Lapse
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Lapse is a simple task management app created to help you stay organized and manage tasks effortlessly.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg">
            <CheckCircle className="w-5 h-5 mr-3 text-pink-500" />
            <span className="font-semibold text-gray-700">Built for simplicity and efficiency</span>
          </div>
        </div>
      </section>

      {/* What is Lapse Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">What is Lapse?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Lapse is a user-friendly app designed by Grishma, a student, to simplify task management for students, professionals, and anyone seeking clarity in their daily tasks.
              </p>
            </div>
            
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl flex items-center justify-center shadow-xl">
                  {/* Task management illustration */}
                  <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
                    {/* Person sitting on tasks */}
                    <circle cx="100" cy="80" r="20" fill="#8B5CF6" opacity="0.8"/>
                    <rect x="85" y="100" width="30" height="40" rx="15" fill="#EC4899"/>
                    <rect x="90" y="95" width="20" height="8" rx="4" fill="#F3E8FF"/>
                    
                    {/* Task list/clipboard */}
                    <rect x="60" y="140" width="80" height="50" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
                    <rect x="70" y="150" width="60" height="4" rx="2" fill="#D1D5DB"/>
                    <rect x="70" y="160" width="45" height="4" rx="2" fill="#D1D5DB"/>
                    <rect x="70" y="170" width="50" height="4" rx="2" fill="#D1D5DB"/>
                    
                    {/* Check marks */}
                    <circle cx="75" cy="152" r="3" fill="#10B981"/>
                    <polyline points="73,152 75,154 77,150" stroke="white" strokeWidth="1" fill="none"/>
                    <circle cx="75" cy="172" r="3" fill="#10B981"/>
                    <polyline points="73,172 75,174 77,170" stroke="white" strokeWidth="1" fill="none"/>
                    
                    {/* Floating elements */}
                    <circle cx="40" cy="60" r="8" fill="#F472B6" opacity="0.6"/>
                    <circle cx="160" cy="70" r="6" fill="#A855F7" opacity="0.6"/>
                    <circle cx="150" cy="40" r="4" fill="#EC4899" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* How was it made Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <div className="flex justify-center order-2 md:order-1">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-3xl flex items-center justify-center shadow-xl">
                  {/* Developer illustration */}
                  <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
                    {/* Person coding */}
                    <circle cx="100" cy="70" r="18" fill="#8B5CF6" opacity="0.8"/>
                    <rect x="88" y="88" width="24" height="35" rx="12" fill="#EC4899"/>
                    <rect x="92" y="85" width="16" height="6" rx="3" fill="#F3E8FF"/>
                    
                    {/* Laptop */}
                    <rect x="60" y="120" width="80" height="45" rx="6" fill="#374151"/>
                    <rect x="65" y="125" width="70" height="35" rx="4" fill="#1F2937"/>
                    
                    {/* Code on screen */}
                    <rect x="70" y="130" width="25" height="3" rx="1" fill="#10B981"/>
                    <rect x="70" y="136" width="35" height="3" rx="1" fill="#F59E0B"/>
                    <rect x="75" y="142" width="30" height="3" rx="1" fill="#3B82F6"/>
                    <rect x="75" y="148" width="20" height="3" rx="1" fill="#EF4444"/>
                    <rect x="70" y="154" width="40" height="3" rx="1" fill="#8B5CF6"/>
                    
                    {/* Tech stack icons floating around */}
                    <circle cx="45" cy="50" r="12" fill="#61DAFB" opacity="0.8"/>
                    <text x="45" y="55" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">R</text>
                    
                    <rect x="140" y="45" width="20" height="20" rx="4" fill="#06B6D4" opacity="0.8"/>
                    <text x="150" y="58" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">CSS</text>
                    
                    <circle cx="160" cy="95" r="8" fill="#F472B6" opacity="0.6"/>
                    <text x="160" y="98" textAnchor="middle" fontSize="6" fill="white">JS</text>
                    
                    {/* Sparkles */}
                    <circle cx="35" cy="90" r="2" fill="#FBBF24" opacity="0.8"/>
                    <circle cx="170" cy="75" r="2" fill="#F472B6" opacity="0.8"/>
                    <circle cx="145" cy="25" r="2" fill="#8B5CF6" opacity="0.8"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How was it made?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Lapse was built using modern web technologies: React for the frontend, Tailwind CSS for styling, and Lucide icons for a clean, intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;