import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Menu, X, User, Sun, Moon } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.role === 'admin');
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleHashNavigation = (hash) => {
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + hash);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800/50' : 'border-[#ECD2E0]/50'} z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="http://localhost:5555/uploads/logo.svg" alt="Lapse Logo" className="w-8 h-8 rounded-lg" />
              <span className={`text-xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent' : 'bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] bg-clip-text text-transparent'}`}>
                Lapse
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleHashNavigation('#features')}
              className={`text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors`}
            >
              Features
            </button>
            <button 
              onClick={() => handleHashNavigation('#how-it-works')}
              className={`text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors`}
            >
              How it Works
            </button>
            <button 
              onClick={() => handleHashNavigation('#about')}
              className={`text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors`}
            >
              Why Lapse
            </button>
            <button 
              onClick={() => handleHashNavigation('#contact')}
              className={`text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors`}
            >
              Contact Us
            </button>
            <NavLink 
              to="/aboutus" 
              className={({ isActive }) => 
                `text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors ${isActive ? 'font-bold text-' + (isDarkMode ? 'gray-100' : '[#FFA5D6]') : ''}`
              }
            >
              About Us
            </NavLink>
            
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  `text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} transition-colors ${isActive ? 'font-bold text-' + (isDarkMode ? 'gray-100' : '[#FFA5D6]') : ''}`
                }
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-10 h-10 bg-gradient-to-br from-[#FFA5D6] to-[#A7ABDE] rounded-full flex items-center justify-center text-${isDarkMode ? 'gray-200' : 'F0F0F5'} hover:from-[#FFD6EE] hover:to-[#CED1F8] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                >
                  <User className="w-5 h-5" />
                </button>
                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-700/50' : 'border-[#ECD2E0]/50'} z-50`}>
                    <NavLink 
                      to="/tasks"
                      className={`block px-4 py-2 text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} hover:bg-${isDarkMode ? 'gray-700/50' : '[#FFD6EE]/10'} transition-colors`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Tasks
                    </NavLink>
                    <NavLink 
                      to="/profile"
                      className={`block px-4 py-2 text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} hover:bg-${isDarkMode ? 'gray-700/50' : '[#FFD6EE]/10'} transition-colors`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className={`block w-full text-left px-4 py-2 text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} hover:bg-${isDarkMode ? 'gray-700/50' : '[#FFD6EE]/10'} transition-colors`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to="/register"
                className={`bg-${isDarkMode ? 'gray-700' : 'gradient-to-r from-[#FFA5D6] to-[#A7ABDE]'} text-${isDarkMode ? 'gray-200' : 'F0F0F5'} px-6 py-2 rounded-lg hover:${isDarkMode ? 'bg-gray-600' : 'from-[#FFD6EE] to-[#CED1F8]'} transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                Get Started
              </NavLink>
            )}
            <button
              onClick={toggleTheme}
              className={`ml-4 w-10 h-10 bg-gradient-to-br from-[#FFA5D6] to-[#A7ABDE] rounded-full flex items-center justify-center text-${isDarkMode ? 'gray-200' : 'F0F0F5'} hover:from-[#FFD6EE] hover:to-[#CED1F8] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Hamburger menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-black'}`} /> : <Menu className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-black'}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800 border-t-gray-700' : 'bg-white border-t border-[#ECD2E0]'}`}>
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => handleHashNavigation('#features')}
              className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleHashNavigation('#how-it-works')}
              className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
            >
              How it Works
            </button>
            <button 
              onClick={() => handleHashNavigation('#about')}
              className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
            >
              Why Lapse
            </button>
            <button 
              onClick={() => handleHashNavigation('#contact')}
              className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
            >
              Contact Us
            </button>
            <NavLink 
              to="/aboutus"
              className={({ isActive }) => 
                `block text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} ${isActive ? 'font-bold text-' + (isDarkMode ? 'gray-100' : '[#FFA5D6]') : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>

            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `block text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} ${isActive ? 'font-bold text-' + (isDarkMode ? 'gray-100' : '[#FFA5D6]') : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <>
                <NavLink 
                  to="/tasks" 
                  className={({ isActive }) => 
                    `block text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'} ${isActive ? 'font-bold text-' + (isDarkMode ? 'gray-100' : '[#FFA5D6]') : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tasks
                </NavLink>
                <NavLink 
                  to="/profile"
                  className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className={`block w-full text-left text-${isDarkMode ? 'gray-300' : '[#A7ABDE]'} hover:text-${isDarkMode ? 'gray-100' : '[#FFA5D6]'}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink 
                to="/register"
                className={`block w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE]'} text-${isDarkMode ? 'gray-200' : 'F0F0F5'} px-6 py-2 rounded-lg text-center hover:${isDarkMode ? 'bg-gray-600' : 'from-[#FFD6EE] to-[#CED1F8]'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </NavLink>
            )}
            <button
              onClick={toggleTheme}
              className={`block w-full px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE]'} text-${isDarkMode ? 'gray-200' : 'F0F0F5'} rounded-lg flex items-center justify-center hover:${isDarkMode ? 'bg-gray-600' : 'from-[#FFD6EE] to-[#CED1F8]'} transition-colors`}
            >
              {isDarkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;