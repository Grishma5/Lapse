import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import NavBar from './pages/components/NavBar';
import FormData from './pages/Form';
import { ListandKeys } from './pages/components/Buttons';
import { Toaster } from 'react-hot-toast';
import Footer from './pages/components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/Task';
import UserProfile from './pages/UserProfile';
import Admin_Dashboard from './pages/Admin_dashboard';

const AppContent = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const hideNavAndFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-[#4B0082]'}`}>
      <Toaster
        toastOptions={{
          style: {
            background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: isDarkMode ? '1px solid #4B5563' : '1px solid #FEE9F2',
            color: isDarkMode ? '#D1D5DB' : '#4B0082',
            borderRadius: '1rem',
            fontFamily: 'font-cute, sans-serif',
          },
          success: {
            style: {
              border: isDarkMode ? '1px solid #6B7280' : '1px solid #F4B8D3',
              color: isDarkMode ? '#D1D5DB' : '#4B0082',
            },
            iconTheme: {
              primary: isDarkMode ? '#10B981' : '#EC4899',
              secondary: isDarkMode ? '#1F2937' : '#FFF',
            },
          },
          error: {
            style: {
              border: isDarkMode ? '1px solid #6B7280' : '1px solid #FDA4AF',
              color: isDarkMode ? '#D1D5DB' : '#4B0082',
            },
            iconTheme: {
              primary: isDarkMode ? '#EF4444' : '#E11D48',
              secondary: isDarkMode ? '#1F2937' : '#FFF',
            },
          },
        }}
      />
      {!hideNavAndFooter && <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/" element={<Homepage isDarkMode={isDarkMode} />} />
        <Route path="/aboutus" element={<AboutUs isDarkMode={isDarkMode} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/formdata" element={<FormData isDarkMode={isDarkMode} />} />
        <Route path="/listsandkeys" element={<ListandKeys isDarkMode={isDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskManager isDarkMode={isDarkMode} />} />
        <Route path="/profile" element={<UserProfile isDarkMode={isDarkMode} />} />
        <Route path="/admin/*" element={<Admin_Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      {!hideNavAndFooter && <Footer isDarkMode={isDarkMode} />}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <AppContent />
  </Router>
);

export default AppWithRouter;