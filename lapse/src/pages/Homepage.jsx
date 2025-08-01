import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Users, BarChart3, Bell, Zap, Star, ArrowRight, Target, Lightbulb, Shield, Layout, Timer, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingShapes = ({ isDarkMode }) => {
  const shapes = new Array(12).fill(null);
  const colors = isDarkMode ? ['#4B5563', '#6B7280', '#9CA3AF'] : ['#FFB3D9', '#E6D5F0', '#D4B5F7'];
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

const LapseHomepage = ({ isDarkMode }) => {
  const features = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Kanban Board",
      description: "Drag-and-drop interface with To-Do, In Progress, and Done columns for visual task management.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-pink-400 to-pink-500",
    },
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Time Tracking",
      description: "Record time spent on tasks to improve productivity and gain valuable insights into your workflow.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-600 to-gray-500" : "bg-gradient-to-br from-purple-400 to-purple-500",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Calendar View",
      description: "Monthly and weekly calendar integration for better timeline management and deadline tracking.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-500 to-gray-400" : "bg-gradient-to-br from-indigo-400 to-indigo-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track progress across your workspace for seamless teamwork.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-rose-400 to-rose-500",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Notifications",
      description: "Timely reminders and alerts to ensure you never miss important deadlines or tasks.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-600 to-gray-500" : "bg-gradient-to-br from-violet-400 to-violet-500",
    },
    {
      icon: <Tag className="w-8 h-8" />,
      title: "Labels & Priority",
      description: "Custom labels and priority markers to categorize tasks by urgency and project type.",
      color: isDarkMode ? "bg-gradient-to-br from-gray-500 to-gray-400" : "bg-gradient-to-br from-fuchsia-400 to-fuchsia-500",
    },
  ];

  const processSteps = [
    { number: "1", title: "Create Account", description: "Sign up with full name, email and password" },
    { number: "2", title: "Add Your Tasks", description: "Create tasks with descriptions, priorities, and deadlines" },
    { number: "3", title: "Organize & Track", description: "Use Kanban boards and calendar views to manage your workflow" },
    { number: "4", title: "Achieve Goals", description: "Track progress and celebrate your accomplishments" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800'}`}>
      <FloatingShapes isDarkMode={isDarkMode} />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>Organize.</span>
                <span className={isDarkMode ? 'bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent'}>
                  Prioritize.
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>Achieve.</span>
              </h1>
              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Transform chaos into clarity with Lapse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className={`bg-${isDarkMode ? 'gray-700' : 'gradient-to-r from-pink-400 to-purple-300'} text-${isDarkMode ? 'gray-200' : 'white'} px-6 py-3 rounded-full hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-400 to-purple-200'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  Get Started
                </Link>
                <Link to="/aboutus" className={`text-${isDarkMode ? 'gray-300' : 'purple-400'} border-2 ${isDarkMode ? 'border-gray-600' : 'border-purple-300'} px-6 py-3 rounded-full hover:${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'} transition-colors`}>
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className={`relative w-full h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-pink-100 to-purple-100'} rounded-3xl overflow-hidden shadow-2xl`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className={`w-32 h-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-pink-200 to-purple-300'} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                      <CheckCircle className="w-16 h-16 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-3`}>Stay Organized</h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Keep track of everything that matters</p>
                  </div>
                </div>
                <div className={`absolute top-6 right-6 w-12 h-12 ${isDarkMode ? 'bg-gray-600' : 'bg-pink-300'} rounded-full opacity-60 animate-bounce`}></div>
                <div className={`absolute bottom-8 left-8 w-8 h-8 ${isDarkMode ? 'bg-gray-500' : 'bg-purple-300'} rounded-full opacity-60 animate-pulse`}></div>
                <div className={`absolute top-1/2 left-6 w-6 h-6 ${isDarkMode ? 'bg-gray-400' : 'bg-indigo-300'} rounded-full opacity-60 animate-ping`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4`}>
              Everything you need to stay
              <span className={isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent'}>
                organized and productive
              </span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Powerful features designed to streamline your workflow and boost your productivity
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-${isDarkMode ? 'gray-800/80' : 'white/80'} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4`}>{feature.title}</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gradient-to-br from-pink-100/50 to-purple-100/50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className={`bg-${isDarkMode ? 'gray-700/80' : 'white/80'} backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center`}>
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-br from-pink-400 to-purple-200'} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4`}>Simple Process</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Our intuitive workflow makes task management effortless and enjoyable.
                </p>
              </div>
              <div className={`absolute -top-4 -right-4 w-8 h-8 ${isDarkMode ? 'bg-gray-600' : 'bg-pink-300'} rounded-full opacity-60 animate-bounce`}></div>
              <div className={`absolute -bottom-4 -left-4 w-6 h-6 ${isDarkMode ? 'bg-gray-500' : 'bg-purple-300'} rounded-full opacity-60 animate-pulse`}></div>
            </div>
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>
                Simple steps to
                <span className={isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent'}>
                  organized success
                </span>
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                Get started with Lapse in just a few simple steps. No complicated setup or lengthy tutorials required.
              </p>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-br from-pink-400 to-purple-300'} rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1 shadow-lg`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-2`}>{step.title}</h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Link to="/register" className={`bg-${isDarkMode ? 'gray-700' : 'gradient-to-r from-pink-400 to-purple-300'} text-${isDarkMode ? 'gray-200' : 'white'} px-6 py-3 rounded-full hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-400 to-purple-200'} transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  Get Started
                </Link>
                <Link to="/aboutus" className={`text-${isDarkMode ? 'gray-300' : 'purple-400'} border-2 ${isDarkMode ? 'border-gray-600' : 'border-purple-300'} px-6 py-3 rounded-full hover:${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'} transition-colors`}>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>
                Why <span className={isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-400 to-purple-200 bg-clip-text text-transparent'}>Lapse</span>?
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                Born from a personal need for better organization, Lapse combines intuitive design with powerful functionality to help you manage tasks without the overwhelming complexity of traditional tools.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className={`w-6 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-br from-pink-400 to-purple-200'} rounded-full flex items-center justify-center mr-3`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-700'}>Secure password hashing and session management</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-br from-pink-400 to-purple-300'} rounded-full flex items-center justify-center mr-3`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-700'}>Real-time task activity logging</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gradient-to-br from-pink-400 to-purple-300'} rounded-full flex items-center justify-center mr-3`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-700'}>Built with modern web technologies</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className={`bg-${isDarkMode ? 'gray-800' : 'gradient-to-br from-purple-100 to-pink-100'} rounded-3xl p-8 h-96 flex items-center justify-center shadow-2xl`}>
                <div className="text-center">
                  <div className={`w-32 h-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-purple-400 to-pink-300'} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-3`}>Secure & Reliable</h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Your data is protected with industry-standard security</p>
                </div>
              </div>
              <div className={`absolute top-4 left-4 w-12 h-12 ${isDarkMode ? 'bg-gray-600' : 'bg-pink-300'} rounded-full opacity-60 animate-pulse`}></div>
              <div className={`absolute bottom-8 right-8 w-8 h-8 ${isDarkMode ? 'bg-gray-500' : 'bg-purple-300'} rounded-full opacity-60 animate-bounce`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gradient-to-b from-pink-100/50 to-purple-100/50'} p-6`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-screen-xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Contact <span className={isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent'}>Us</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get in touch with us for support or inquiries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`bg-${isDarkMode ? 'gray-700/80' : 'white/80'} p-6 rounded-2xl shadow-lg ${isDarkMode ? '' : 'border-[#ECD2E0]/50'}`}
            >
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4`}>Contact Details</h3>
              <div className="space-y-4">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  <span className="font-medium">Email:</span> support@lapse.com
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  <span className="font-medium">Phone (Landline):</span> 014455325
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  <span className="font-medium">Phone (Mobile):</span> +977 9888888888, +977 9777777777
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`bg-${isDarkMode ? 'gray-700/80' : 'white/80'} p-6 rounded-2xl shadow-lg ${isDarkMode ? '' : 'border-[#ECD2E0]/50'}`}
            >
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4`}>Our Location</h3>
              <div className="w-full h-64">
                <iframe
                  title="Lapse Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.012824824184!2d85.354799!3d27.7168903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197d9db5a6ed%3A0xeb8879dc058c8549!2sTusal%20Marg%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1751704477344!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LapseHomepage;