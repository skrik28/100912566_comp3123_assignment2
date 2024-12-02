import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>COMP3123 - Assignment 2</h1>
      </div>
      
      <div className="navbar-menu">
        {isAuthenticated && (
          <button 
            onClick={handleLogout} 
            className="logout-btn"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;