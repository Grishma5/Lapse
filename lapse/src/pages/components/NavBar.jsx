import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Menu, X, User } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
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
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-[#ECD2E0]/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="http://localhost:5555/uploads/logo.svg" alt="Lapse Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] bg-clip-text text-transparent">
                Lapse
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleHashNavigation('#features')}
              className="text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleHashNavigation('#how-it-works')}
              className="text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleHashNavigation('#about')}
              className="text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors"
            >
              Why Lapse
            </button>
            <button 
              onClick={() => handleHashNavigation('#contact')}
              className="text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors"
            >
              Contact Us
            </button>
            <NavLink 
              to="/aboutus" 
              className={({ isActive }) => 
                `text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
              }
            >
              About Us
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink 
                  to="/tasks" 
                  className={({ isActive }) => 
                    `text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                  }
                >
                  Tasks
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    `text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                  }
                >
                  Profile
                </NavLink>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-[#A7ABDE] hover:text-[#FFA5D6] transition-colors ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                }
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-10 h-10 bg-gradient-to-br from-[#FFA5D6] to-[#A7ABDE] rounded-full flex items-center justify-center text-[#F0F0F5] hover:from-[#FFD6EE] hover:to-[#CED1F8] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <NavLink 
                to="/register"
                className="bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] text-[#F0F0F5] px-6 py-2 rounded-lg hover:from-[#FFD6EE] hover:to-[#CED1F8] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </NavLink>
            )}
          </div>

          {/* Hamburger menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#ECD2E0]">
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => handleHashNavigation('#features')}
              className="block w-full text-left text-[#A7ABDE] hover:text-[#FFA5D6]"
            >
              Features
            </button>
            <button 
              onClick={() => handleHashNavigation('#how-it-works')}
              className="block w-full text-left text-[#A7ABDE] hover:text-[#FFA5D6]"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleHashNavigation('#about')}
              className="block w-full text-left text-[#A7ABDE] hover:text-[#FFA5D6]"
            >
              Why Lapse
            </button>
            <button 
              onClick={() => handleHashNavigation('#contact')}
              className="block w-full text-left text-[#A7ABDE] hover:text-[#FFA5D6]"
            >
              Contact Us
            </button>
            <NavLink 
              to="/aboutus"
              className={({ isActive }) => 
                `block text-[#A7ABDE] hover:text-[#FFA5D6] ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink 
                  to="/tasks" 
                  className={({ isActive }) => 
                    `block text-[#A7ABDE] hover:text-[#FFA5D6] ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tasks
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    `block text-[#A7ABDE] hover:text-[#FFA5D6] ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `block text-[#A7ABDE] hover:text-[#FFA5D6] ${isActive ? 'font-bold text-[#FFA5D6]' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] text-[#F0F0F5] px-6 py-2 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <NavLink 
                to="/register"
                className="block w-full bg-gradient-to-r from-[#FFA5D6] to-[#A7ABDE] text Lukas@123
                text-[#F0F0F5] px-6 py-2 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;