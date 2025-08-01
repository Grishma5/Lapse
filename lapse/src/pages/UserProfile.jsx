import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, Save, Edit3, CheckCircle, Circle, Camera, 
  Calendar, Trophy, Target, Activity, Mail, Award,
  Settings, Bell, Shield, Globe, HelpCircle
} from 'lucide-react';
import { getUserProfileApi, updateUserProfileApi, getTasksApi } from '../Api/Api';

const UserProfile = ({ isDarkMode }) => {
  const [user, setUser] = useState({ 
    username: '', 
    email: '', 
    image: '',
    joinedDate: ''
  });
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    image: null
  });
  const [greeting, setGreeting] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [activeSection, setActiveSection] = useState('account');
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
    const userName = user.username || 'there';
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
      fetchUserProfile();
      fetchTasks();
    }
  }, [navigate, user.username]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfileApi();
      console.log('Profile API Response:', response);
      const data = response.data;
      if (data?.data?.success) {
        const userData = data.data.user;
        const userInfo = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
          image: userData.image || '',
          joinedDate: userData.createdAt || new Date().toISOString(),
        };
        setUser(userInfo);
        setFormData({
          name: userInfo.username,
          email: userInfo.email,
          image: null,
        });
        setImagePreview(userInfo.image ? `${import.meta.env.VITE_API_BASE_URL}/${userInfo.image}` : '');
      } else {
        toast.error(data?.data?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Fetch profile error:', error.response ? error.response.data : error.message);
      toast.error('Error fetching profile');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasksApi();
      if (response?.data?.success) {
        setTasks(response.data.tasks || []);
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
        name: user.username, 
        email: user.email, 
        image: null
      });
      setImagePreview(user.image ? `https://localhost:5555/${user.image}` : '');
    } else {
      setImagePreview(user.image ? `${import.meta.env.VITE_API_BASE_URL}/${user.image}` : '');
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() && !formData.email.trim() && !formData.image) {
      toast.error('At least one field (name, email, or image) is required');
      return;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const formDataToSend = new FormData();
    if (formData.name.trim() && formData.name.trim() !== user.username) {
      formDataToSend.append('username', formData.name.trim());
    }
    if (formData.email.trim() && formData.email.trim() !== user.email) {
      formDataToSend.append('email', formData.email.trim());
    }
    if (formData.image) {
      formDataToSend.append('image', formData.image, formData.image.name);
    }

    console.log('FormData contents:');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    try {
      const response = await updateUserProfileApi(user.id, formDataToSend);
      console.log('Update Profile API Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.status === 200 && response.data?.data?.success) {
        const updatedUser = {
          ...user,
          username: response.data.data.user.username || user.username,
          email: response.data.data.user.email || user.email,
          image: response.data.data.user.image || user.image,
        };
        setUser(updatedUser);
        setIsEditing(false);
        setImagePreview(
          updatedUser.image ? `${import.meta.env.VITE_API_BASE_URL}/${updatedUser.image}` : ''
        );
        toast.success('Profile updated successfully! 🎉');
      } else {
        toast.error(response.data?.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.data?.message || 'Error updating profile');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const menuItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-[#4B0082]'} p-6 mt-14`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-2`}>{greeting}</h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage your account settings and preferences</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className={`bg-${isDarkMode ? 'gray-800/80' : 'white'} rounded-2xl shadow-sm ${isDarkMode ? 'border-gray-700/50' : 'border border-gray-100'} p-6`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>Settings</h3>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-colors ${
                        activeSection === item.id
                          ? isDarkMode
                            ? 'bg-gray-700/50 text-gray-100 border-l-4 border-pink-500'
                            : 'bg-pink-100 text-pink-600 border-l-4 border-pink-500'
                          : isDarkMode
                            ? 'text-gray-400 hover:bg-gray-700/50'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Stats Card */}
            <div className={`mt-6 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white'} rounded-2xl shadow-sm ${isDarkMode ? 'border-gray-700/50' : 'border border-gray-100'} p-6`}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-4 flex items-center`}>
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Achievement
              </h4>
              <div className="text-center">
                <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-yellow-400 to-orange-400'} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h5 className={`text-xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{achievementLevel}</h5>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{taskStats.done} tasks completed</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className={`bg-${isDarkMode ? 'gray-800/80' : 'white'} rounded-2xl shadow-sm ${isDarkMode ? 'border-gray-700/50' : 'border border-gray-100'}`}>
              {/* Header */}
              <div className={`border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'} p-6`}>
                <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Account Settings</h2>
              </div>

              {/* Account Section */}
              {activeSection === 'account' && (
                <div className="p-6">
                  {/* Basic Info */}
                  <div className="mb-8">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>Basic info</h3>
                    
                    {/* Profile Picture */}
                    <div className={`flex items-center justify-between py-4 ${isDarkMode ? 'border-gray-700/50' : 'border-b border-gray-100'}`}>
                      <div className="flex items-center space-x-4">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-sm font-medium text-gray-600'} style={{ width: '96px' }}>Profile Picture</span>
                        <div className="relative">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Profile"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-12 h-12 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-pink-300 to-purple-300'} flex items-center justify-center`}>
                              <User className="w-6 h-6 text-white" />
                            </div>
                          )}
                          {isEditing && (
                            <div className={`absolute -bottom-1 -right-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-full p-1 shadow-sm border ${isDarkMode ? 'border-gray-600' : 'border'}`}>
                              <label htmlFor="image-upload-main">
                                <Camera className="w-3 h-3 text-gray-600 cursor-pointer" />
                              </label>
                              <input
                                id="image-upload-main"
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isEditing && (
                          <>
                            <label htmlFor="image-upload-button" className={isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-sm text-pink-600 hover:text-pink-700 cursor-pointer'}>
                              Upload new picture
                            </label>
                            <input
                              id="image-upload-button"
                              type="file"
                              accept="image/*"
                              name="image"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <button className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-sm text-gray-500 hover:text-gray-600'}>
                              Remove
                            </button>
                          </>
                        )}
                        {!isEditing && (
                          <button
                            onClick={handleEditToggle}
                            className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div className={`flex items-center justify-between py-4 ${isDarkMode ? 'border-gray-700/50' : 'border-b border-gray-100'}`}>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-sm font-medium text-gray-600'} style={{ width: '96px' }}>Name</span>
                      <div className="flex-1 mx-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'pink-400'} focus:border-transparent`}
                          />
                        ) : (
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>{user.username || 'Not set'}</span>
                        )}
                      </div>
                      <div className="w-8">
                        {!isEditing && (
                          <button
                            onClick={handleEditToggle}
                            className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className={`flex items-center justify-between py-4 ${isDarkMode ? 'border-gray-700/50' : 'border-b border-gray-100'}`}>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-sm font-medium text-gray-600'} style={{ width: '96px' }}>Email</span>
                      <div className="flex-1 mx-4">
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'pink-400'} focus:border-transparent`}
                          />
                        ) : (
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>{user.email || 'Not set'}</span>
                        )}
                      </div>
                      <div className="w-8">
                        {!isEditing && (
                          <button
                            onClick={handleEditToggle}
                            className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Member Since */}
                    {user.joinedDate && (
                      <div className={`flex items-center justify-between py-4 ${isDarkMode ? 'border-gray-700/50' : 'border-b border-gray-100'}`}>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-sm font-medium text-gray-600'} style={{ width: '96px' }}>Member Since</span>
                        <div className="flex-1 mx-4">
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>{formatDate(user.joinedDate)}</span>
                        </div>
                        <div className="w-8"></div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className={`flex justify-end space-x-3 mt-6 pt-6 ${isDarkMode ? 'border-gray-700/50' : 'border-t border-gray-100'}`}>
                        <button
                          onClick={handleEditToggle}
                          className={isDarkMode ? 'px-4 py-2 text-gray-400 hover:text-gray-300' : 'px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className={`px-6 py-2 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'} rounded-lg hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-600 to-purple-600'} transition-all duration-300 shadow-sm`}
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Task Analytics */}
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-6`}>Task Analytics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`bg-${isDarkMode ? 'gray-700' : 'gradient-to-br from-pink-400 to-rose-400'} rounded-xl p-4 text-white`}>
                        <Target className="w-6 h-6 mb-2" />
                        <h4 className="font-semibold">Total</h4>
                        <p className="text-2xl font-bold">{taskStats.total}</p>
                      </div>
                      
                      <div className={`bg-${isDarkMode ? 'gray-600' : 'gradient-to-br from-purple-400 to-violet-400'} rounded-xl p-4 text-white`}>
                        <Circle className="w-6 h-6 mb-2" />
                        <h4 className="font-semibold">To Do</h4>
                        <p className="text-2xl font-bold">{taskStats.todo}</p>
                      </div>
                      
                      <div className={`bg-${isDarkMode ? 'gray-500' : 'gradient-to-br from-indigo-400 to-blue-400'} rounded-xl p-4 text-white`}>
                        <Activity className="w-6 h-6 mb-2" />
                        <h4 className="font-semibold">In Progress</h4>
                        <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                      </div>
                      
                      <div className={`bg-${isDarkMode ? 'gray-400' : 'gradient-to-br from-emerald-400 to-teal-400'} rounded-xl p-4 text-white`}>
                        <CheckCircle className="w-6 h-6 mb-2" />
                        <h4 className="font-semibold">Done</h4>
                        <p className="text-2xl font-bold">{taskStats.done}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} rounded-full h-2 mb-2`}>
                        <div 
                          className={`bg-${isDarkMode ? 'gray-500' : 'gradient-to-r from-pink-400 to-purple-400'} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${taskStats.completionRate}%` }}
                        ></div>
                      </div>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-sm text-gray-600'}>
                        <span className={isDarkMode ? 'text-gray-300' : 'font-semibold text-purple-600'}>{taskStats.completionRate}%</span> completion rate
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Sections Placeholder */}
              {activeSection !== 'account' && (
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-2`}>
                      {menuItems.find(item => item.id === activeSection)?.label} Settings
                    </h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>This section is coming soon!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* No Tasks Message */}
        {tasks.length === 0 && activeSection === 'account' && (
          <div className={`mt-8 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white'} rounded-2xl shadow-sm ${isDarkMode ? 'border-gray-700/50' : 'border border-gray-100'} p-12 text-center`}>
            <Circle className={`w-16 h-16 ${isDarkMode ? 'text-gray-500' : 'text-gray-300'} mx-auto mb-6`} />
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} mb-2`}>No tasks yet</h3>
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400 mb-4'}>Start your productivity journey by creating your first task!</p>
            <button 
              onClick={() => navigate('/tasks')}
              className={`px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'} rounded-lg hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-600 to-purple-600'} transition-all duration-300 shadow-sm`}
            >
              Create Your First Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;