import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Calendar,
  Bell,
  Search,
  Activity,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { title: 'Total Users', value: '2,350', change: '+15.3%', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Sessions', value: '1,256', change: '+8.2%', icon: Activity, color: 'bg-green-500' },
    { title: 'Completed Tasks', value: '892', change: '+12.5%', icon: CheckCircle, color: 'bg-purple-500' },
    { title: 'Response Time', value: '2.4s', change: '-5.1%', icon: Clock, color: 'bg-pink-500' },
  ];

  const recentActivity = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { action: 'Task completed successfully', time: '15 minutes ago', type: 'task' },
    { action: 'System update installed', time: '1 hour ago', type: 'system' },
    { action: 'Data backup completed', time: '2 hours ago', type: 'system' },
    { action: 'New report generated', time: '3 hours ago', type: 'report' },
  ];

  return (
    <div className="pt-12 flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl fixed h-full z-50">
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/70 hover:text-purple-600'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isNegative = stat.change.startsWith('-');
              return (
                <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <span className={`text-sm font-semibold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Performance Overview</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium">
                      Week
                    </button>
                    <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100">
                      Month
                    </button>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <path
                      d="M 20 180 Q 100 120 200 100 T 380 80"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle cx="380" cy="80" r="4" fill="#EC4899" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* System Status */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Database</span>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">Operational</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">API Services</span>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">Operational</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Cache Layer</span>
                  </div>
                  <span className="text-yellow-600 text-sm font-semibold">Degraded</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Today's Sessions</span>
                  <span className="font-bold text-gray-800">1,423</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Peak Usage</span>
                  <span className="font-bold text-gray-800">14:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Load Time</span>
                  <span className="font-bold text-gray-800">1.8s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">99.2%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}