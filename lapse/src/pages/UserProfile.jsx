import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, Save, X, Edit3, CheckCircle, Circle, Camera, 
  Calendar, Trophy, Target, TrendingUp, Activity,
  Mail, Phone, MapPin, Clock, Star, Award
} from 'lucide-react';
import { getUserProfileApi, updateUserProfileApi, getTasksApi } from '../Api/Api';

const UserProfile = () => {
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    profilePicture: '',
    phone: '',
    location: '',
    bio: '',
    joinedDate: ''
  });
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    profilePicture: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [greeting, setGreeting] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState('overview');
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'To-Do').length,
    inProgress: tasks.filter(task => task.status === 'In-Progress').length,
    done: tasks.filter(task => task.status === 'Done').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(task => task.status === 'Done').length / tasks.length) * 100) : 0
  };

  const achievementLevel = taskStats.done >= 50 ? 'Expert' : taskStats.done >= 20 ? 'Advanced' : taskStats.done >= 5 ? 'Intermediate' : 'Beginner';

  useEffect(() => {
    const hour = new Date().getHours();
    const userName = user.name || 'there';
    if (hour < 12) {
      setGreeting(`Good Morning, ${userName}! ☀️`);
    } else if (hour < 18) {
      setGreeting(`Good Afternoon, ${userName}! 🌤️`);
    } else {
      setGreeting(`Good Evening, ${userName}! 🌙`);
    }

    if (!localStorage.getItem('token')) {
      toast.error('Please log in');
      navigate('/login');
    } else {
      console.log('Token:', localStorage.getItem('token'));
      fetchUserProfile();
      fetchTasks();
    }
  }, [navigate, user.name]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfileApi();
      console.log('Profile response:', response);
      const data = response.data;
      if (data?.success || data?.data?.success) {
        const userData = data.user || data.data.user;
        const userInfo = {
          name: userData.name || userData.username || '',
          email: userData.email || '',
          profilePicture: userData.profilePicture || userData.image || '',
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
          joinedDate: userData.createdAt || userData.joinedDate || new Date().toISOString()
        };
        setUser(userInfo);
        setFormData({
          name: userInfo.name,
          email: userInfo.email,
          profilePicture: userInfo.profilePicture,
          phone: userInfo.phone,
          location: userInfo.location,
          bio: userInfo.bio,
        });
        setImagePreview(userInfo.profilePicture);
      } else {
        toast.error(data?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Fetch profile error:', error.response ? error.response.data : error.message);
      toast.error('Error fetching profile');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasksApi();
      if (response?.data?.success || response?.success) {
        setTasks(response.data.tasks || response.tasks || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Fetch tasks error:', error);
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setFormData({ 
        name: user.name, 
        email: user.email, 
        profilePicture: user.profilePicture,
        phone: user.phone,
        location: user.location,
        bio: user.bio
      });
      setImagePreview(user.profilePicture);
    } else {
      setImagePreview(user.profilePicture);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, profilePicture: url });
    setImagePreview(url);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await updateUserProfileApi(formData);
      if (response?.data?.success) {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        setIsEditing(false);
        toast.success('Profile updated successfully! 🎉');
      } else {
        toast.error(response?.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Update profile error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 mt-14">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2 font-cute">{greeting}</h2>
          <p className="text-gray-600 font-cute text-lg">Welcome back to your personal dashboard</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 overflow-hidden mb-8">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                {imagePreview || user.profilePicture ? (
                  <img
                    src={imagePreview || user.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-cute">
                  Hi, {user.name || 'User'}! 👋
                </h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  {user.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-cute">{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-cute">{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-cute">{user.location}</span>
                    </div>
                  )}
                </div>
                {user.bio && (
                  <p className="text-gray-600 font-cute max-w-lg">{user.bio}</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <div className="text-center bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-4">
                  <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-cute">Level</p>
                  <p className="font-bold text-purple-600 font-cute">{achievementLevel}</p>
                </div>
                
                <button
                  onClick={handleEditToggle}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl font-cute transform hover:scale-105"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="border-t border-pink-100 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                      placeholder="Enter your name..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                      placeholder="Enter your email..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                      placeholder="Enter your phone number..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                      placeholder="Enter your location..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      value={formData.profilePicture}
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                      placeholder="Enter profile picture URL..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-cute">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 text-gray-600 hover:text-purple-400 transition-colors font-cute rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg font-cute transform hover:scale-105"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Statistics */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-cute flex items-center">
                <Activity className="w-6 h-6 mr-3 text-purple-500" />
                Task Analytics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <Target className="w-8 h-8 mb-3" />
                  <h4 className="text-lg font-semibold font-cute">Total</h4>
                  <p className="text-3xl font-bold font-cute">{taskStats.total}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-400 to-violet-400 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <Circle className="w-8 h-8 mb-3" />
                  <h4 className="text-lg font-semibold font-cute">To Do</h4>
                  <p className="text-3xl font-bold font-cute">{taskStats.todo}</p>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-400 to-blue-400 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <Clock className="w-8 h-8 mb-3" />
                  <h4 className="text-lg font-semibold font-cute">In Progress</h4>
                  <p className="text-3xl font-bold font-cute">{taskStats.inProgress}</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <CheckCircle className="w-8 h-8 mb-3" />
                  <h4 className="text-lg font-semibold font-cute">Done</h4>
                  <p className="text-3xl font-bold font-cute">{taskStats.done}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray-100 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-purple-400 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${taskStats.completionRate}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-600 font-cute">
                <span className="font-bold text-purple-600">{taskStats.completionRate}%</span> completion rate
              </p>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-8">
            {/* Achievement Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-cute flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Achievement
              </h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 font-cute">{achievementLevel}</h4>
                <p className="text-gray-600 font-cute">{taskStats.done} tasks completed</p>
              </div>
            </div>

            {/* Join Date */}
            {user.joinedDate && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 font-cute flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  Member Since
                </h3>
                <p className="text-gray-600 font-cute text-lg">
                  {formatDate(user.joinedDate)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-16 mt-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-12">
              <Circle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2 font-cute">No tasks yet</h3>
              <p className="text-gray-400 font-cute">Start your productivity journey by creating your first task!</p>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg font-cute transform hover:scale-105">
                Create Your First Task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;