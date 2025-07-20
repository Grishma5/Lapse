import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Home, Mail, Lock, ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';
import { loginUserApi } from '../Api/Api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error('Please fill in all fields');
    return;
  }

  setIsLoading(true);

  try {
    const data = { email, password };
    console.log('Login Payload:', data);

    const response = await loginUserApi(data);
    console.log('API Response:', response);

    // Fix: access token from response.data.data.token
    const resData = response?.data?.data;

    if (
      response.status === 200 &&
      resData?.success
    ) {
      const token = resData?.token;
      console.log('Extracted Token:', token);

      if (!token || typeof token !== 'string') {
        toast.error('Invalid or missing token from server. Please contact support.');
        return;
      }

      localStorage.setItem('token', token);
      toast.success('Login successful! Welcome back to Lapse!');
      const decode = jwtDecode(token);

      setTimeout(() => {
        if (decode.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/tasks');
        }
      }, 1000);
    } else {
      toast.error(resData?.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err.response || err);
    const errorMessage = err?.response?.data?.message || 'An error occurred during login';
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b flex items-center justify-center p-4 pt-20">
      <div className="fixed top-6 left-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <Home className="w-5 h-5 text-pink-400 group-hover:text-purple-200 transition-colors" />
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full text-purple-300 text-sm font-medium mb-6">
            <LogIn className="w-4 h-4 mr-2" />
            Welcome Back
          </div>

          <h1 className="text-4xl font-bold text-pink-400 mb-3">
            Sign In to
            <span className="block bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Lapse
            </span>
          </h1>

          <p className="text-black-400 text-lg">Continue your productive journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/10">
          <form onSubmit={submit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-black-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-200" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-200 transition-all duration-200 bg-white-100 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-black-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-200 transition-all duration-200 bg-white-100 hover:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-200 hover:text-pink-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-300 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-pink-300 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-black-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-purple-400 hover:text-purple-500 font-semibold hover:underline transition-colors"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;