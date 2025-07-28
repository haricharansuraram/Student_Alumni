// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title-link">
          🎓 StudentAlumniConnect
        </Link>
      </div>
      <div className="navbar-links">
        <button
          className="nav-button login-button"
          onClick={() => navigate('/select-role')}
        >
          Login
        </button>
        <Link to="/signup" className="nav-button signup-button">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
