import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelector.css'; // Make sure this is imported

const RoleSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selector-container">
      <div className="role-selector-card">
        <h2>Select Your Role</h2>
        <div className="role-buttons">
          <button onClick={() => navigate('/login/student')}>Student</button>
          <button onClick={() => navigate('/login/alumni')}>Alumni</button>
          <button onClick={() => navigate('/login/admin')}>Admin/Staff</button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
