import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Save, X, Edit3, CheckCircle, Circle } from 'lucide-react';
import { getUserProfileApi, updateUserProfileApi, getTasksApi } from '../Api/Api';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', profilePicture: '' });
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', profilePicture: '' });
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'To-Do').length,
    inProgress: tasks.filter(task => task.status === 'In-Progress').length,
    done: tasks.filter(task => task.status === 'Done').length,
  };

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    if (!localStorage.getItem('token')) {
      toast.error('Please log in');
      navigate('/login');
    } else {
      fetchUserProfile();
      fetchTasks();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfileApi();
      if (response?.data?.success) {
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          profilePicture: response.data.user.profilePicture || '',
        });
      } else {
        toast.error(response?.data?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      toast.error('Error fetching profile');
      console.error('Fetch profile error:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasksApi();
      if (response?.data?.success) {
        setTasks(response.data.tasks);
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
      setFormData({ name: user.name, email: user.email, profilePicture: user.profilePicture });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    try {
      const response = await updateUserProfileApi(formData);
      if (response?.data?.success) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success('Profile updated');
      } else {
        toast.error(response?.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Update profile error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 mt-14">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1 font-cute">{greeting}</h2>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-cute">
            Your <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-gray-600 font-cute">Manage your personal details and track your progress</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-pink-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-pink-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 font-cute">{user.name}</h3>
                <p className="text-gray-600 font-cute">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleEditToggle}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl font-cute"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing && (
            <div className="border-t border-pink-100 pt-6">
              <div className="space-y-4">
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
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={formData.profilePicture}
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all font-cute"
                    placeholder="Enter profile picture URL..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2 text-gray-600 hover:text-purple-400 transition-colors font-cute"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg font-cute"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-cute">Task Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-pink-300 to-rose-300 rounded-xl p-4 text-white shadow-lg">
                <h4 className="text-lg font-semibold font-cute">Total Tasks</h4>
                <p className="text-2xl font-bold font-cute">{taskStats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-300 to-violet-300 rounded-xl p-4 text-white shadow-lg">
                <h4 className="text-lg font-semibold font-cute">To Do</h4>
                <p className="text-2xl font-bold font-cute">{taskStats.todo}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-300 to-blue-300 rounded-xl p-4 text-white shadow-lg">
                <h4 className="text-lg font-semibold font-cute">In Progress</h4>
                <p className="text-2xl font-bold font-cute">{taskStats.inProgress}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-300 to-pink-300 rounded-xl p-4 text-white shadow-lg">
                <h4 className="text-lg font-semibold font-cute">Done</h4>
                <p className="text-2xl font-bold font-cute">{taskStats.done}</p>
              </div>
            </div>
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-12">
              <Circle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm font-cute">No tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;