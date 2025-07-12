import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Target, CheckCircle } from 'lucide-react';

const FloatingShapes = () => {
  const shapes = new Array(8).fill(null);
  const colors = ['#FFB3D9', '#E6D5F0', '#D4B5F7'];
  const shapeTypes = ['rounded-full', 'rounded-lg', 'rounded-xl'];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {shapes.map((_, i) => (
        <div
          key={i}
          className={`absolute w-4 h-4 ${shapeTypes[i % 3]} opacity-40 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: colors[i % 3],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <FloatingShapes />



      {/* Hero Section */}
      <section className="relative py-24 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium mb-6 shadow-sm">
      <CheckCircle className="w-4 h-4 mr-2 text-pink-400" />
      Simple. Organized. Done.
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
      About <span className="bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">Lapse</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Lapse is a task management app designed to make your life simpler and more organized.
      </p>
      </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                I'm Grishma, a student who built Lapse to tackle my own struggle with staying organized. I wanted a tool that’s simple yet powerful.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Lapse helps students, professionals, and anyone manage tasks without complexity.
              </p>
              <div className="flex items-center text-gray-600">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-300 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Made for simplicity.</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100/80 to-purple-100/80 rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-300 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Our Goal</h3>
                  <p className="text-gray-600">Keep task management clear and effective.</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-pink-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lapse Section */}
      <section className="py-16 bg-gradient-to-br from-pink-100/50 to-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why <span className="bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">Lapse</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lapse is built for ease, security, and clarity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Easy to Use</h3>
              <p className="text-gray-600">Designed for a seamless experience.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Secure</h3>
              <p className="text-gray-600">Your data is protected.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Clear</h3>
              <p className="text-gray-600">No clutter, just what you need.</p>
            </div>
          </div>
        </div>
      </section>


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;