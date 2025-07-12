import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Home, User, Mail, Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { createUserApi } from '../Api/Api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('username', name);
      data.append('email', email);
      data.append('password', password);
      if (image) data.append('image', image);

      const response = await createUserApi(data);

      if (response?.data?.success) {
        setIsLoading(false);
        toast.success('Registration successful! Welcome to Lapse!');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setIsLoading(false);
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.response?.data?.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b flex items-center justify-center p-4 pt-20">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Home className="w-5 h-5 text-pink-400 group-hover:text-purple-300 transition-colors" />
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-500 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Join Lapse Today
          </div>

          <h1 className="text-4xl font-bold text-pink-400 mb-3">
            Create Your
            <span className="block bg-gradient-to-r to-purple-500 bg-clip-text text-transparent">
              Account
            </span>
          </h1>

          <p className="text-black-400 text-lg">
            Start organizing your life with Lapse
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <form onSubmit={submit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-black-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-300" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-white-50 hover:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-black-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-white-50 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-black-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-white-50 hover:bg-white"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-pink-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-black-700 mb-2">
                Profile Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-white-50 hover:bg-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-300 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-pink-400 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-black-700">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-300 hover:text-purple-300 font-semibold hover:underline transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Live Preview Section */}
        {(name || email || password) && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-pink-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Live Preview
            </h3>
            <div className="space-y-2 text-sm">
              {name && (
                <div className="flex items-center">
                  <span className="text-pink-400 w-16">Name:</span>
                  <span className="text-pink-900 font-medium">{name}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center">
                  <span className="text-pink-400 w-16">Email:</span>
                  <span className="text-pink-900 font-medium">{email}</span>
                </div>
              )}
              {password && (
                <div className="flex items-center">
                  <span className="text-pink-400 w-16">Password:</span>
                  <span className="text-pink-900 font-medium">{'•'.repeat(password.length)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
