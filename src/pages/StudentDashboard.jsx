import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../styles/StudentDashboard.css';
import { FaUserFriends, FaUser, FaComments, FaAddressBook } from 'react-icons/fa';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Custom Navbar */}
      <nav className="student-navbar">
        <div className="student-navbar-brand">
          <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            🎓 StudentAlumniConnect
          </h1>
        </div>
      </nav>

      {/* Main Content (Nested Routes Render Here) */}
      <div className="dashboard-content">
        <Outlet /> {/* 👈 This is mandatory for nested routing */}
      </div>

      {/* Custom Footer */}
      <footer className="footer-nav">
        <button
          className={`footer-btn ${location.pathname.includes('alumni') ? 'active' : ''}`}
          onClick={() => navigate('/student/dashboard/alumni')}
        >
          <FaAddressBook />
          <span>Alumni</span>
        </button>
        <button
          className={`footer-btn ${location.pathname.includes('connections') ? 'active' : ''}`}
          onClick={() => navigate('/student/dashboard/connections')}
        >
          <FaUserFriends />
          <span>My Connections</span>
        </button>
        <button
          className={`footer-btn ${location.pathname.includes('chats') ? 'active' : ''}`}
          onClick={() => navigate('/student/dashboard/chats')}
        >
          <FaComments />
          <span>Chats</span>
        </button>
        <button
          className={`footer-btn ${location.pathname.includes('profile') ? 'active' : ''}`}
          onClick={() => navigate('/student/dashboard/profile')}
        >
          <FaUser />
          <span>Profile</span>
        </button>
      </footer>
    </div>
  );
};

export default StudentDashboard;
