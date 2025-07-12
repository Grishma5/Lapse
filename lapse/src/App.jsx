import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import NavBar from './pages/components/NavBar';
import FormData from './pages/Form';
import { ListandKeys } from './pages/components/Buttons';
import { Toaster } from 'react-hot-toast';
import Footer from './pages/components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskManager from './pages/Task';
import UserProfile from './pages/UserProfile';

const App = () => {
  const location = useLocation();
  // Hide NavBar and Footer for login and register routes
  const hideNavAndFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen">
      <Toaster
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #FEE9F2',
            color: '#4B0082',
            borderRadius: '1rem',
            fontFamily: 'font-cute, sans-serif',
          },
          success: {
            style: {
              border: '1px solid #F4B8D3',
              color: '#4B0082',
            },
            iconTheme: {
              primary: '#EC4899',
              secondary: '#FFF',
            },
          },
          error: {
            style: {
              border: '1px solid #FDA4AF',
              color: '#4B0082',
            },
            iconTheme: {
              primary: '#E11D48',
              secondary: '#FFF',
            },
          },
        }}
      />
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/formdata" element={<FormData />} />
        <Route path="/listsandkeys" element={<ListandKeys />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

// Wrap App with Router since useLocation requires Router context
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;