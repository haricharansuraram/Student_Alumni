import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelector.css'; // Make sure this is imported

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selector-container">
      {/* Back Button - Reused from previous pages */}
      <button
        className="back-button"
        onClick={() => navigate('/')} // Adjust to your actual home page path
      >
        ← Back to Home
      </button>

      <div className="role-selector-card">
        <h2 className="card-title">Select Your Role</h2>
        <p className="card-description">Please choose the role that best describes you to proceed.</p>
        <div className="role-buttons">
          {/* We'll use anchor tags or a custom button component for better semantics if not using react-router <Link> */}
          <button className="role-button" onClick={() => navigate('/login/student')}>
            <span className="role-icon">🎓</span>
            <span className="role-text">Student</span>
          </button>
          <button className="role-button" onClick={() => navigate('/login/alumni')}>
            <span className="role-icon">👨‍💼</span>
            <span className="role-text">Alumni</span>
          </button>
          <button className="role-button" onClick={() => navigate('/login/admin')}>
            <span className="role-icon">⚙️</span>
            <span className="role-text">Admin / Staff</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;