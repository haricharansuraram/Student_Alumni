// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser, FaComments, FaAddressBook, FaUserFriends, FaEllipsisH,
  FaSignOutAlt, FaCog, FaHome, FaBriefcase, FaGraduationCap, FaCalendarAlt,
  FaLightbulb, FaBullhorn, FaBook, FaChartLine, FaGlobe, FaRocket, FaHandshake, FaCode, FaMapMarkedAlt, FaStar, FaAward
} from 'react-icons/fa';
import '../styles/StudentDashboard.css'; // Main dashboard layout CSS

// Import the individual section components
// Assuming these components are now created directly under src/components/
import ExploreSection from '../components/ExploreSection';
import AlumniForgeSection from '../components/AlumniForgeSection';
import MyQuadSection from '../components/MyQuadSection';
import EchoChamberSection from '../components/EchoChamberSection';
import AscensionPathSection from '../components/AscensionPathSection';

// Import your actual user avatar image here
// IMPORTANT: Replace './path/to/your/user_avatar.png' with the correct path
import userAvatarImage from '../assets/user1.jpeg'; // <--- YOU NEED TO UPDATE THIS PATH

// REMOVED: FaUserCircle helper component is no longer needed here
// as FaUser will be directly styled in CSS.


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Initialize selectedTab based on the new desired default order: 'alumni'
  const [selectedTab, setSelectedTab] = useState('alumni');

  useEffect(() => {
    // In a real app, fetch user data from context/auth service
    // For now, mock user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user, redirect to login or home
      navigate('/select-role');
    }

    // You could potentially read a URL parameter to set initial tab
    // e.g., const queryParams = new URLSearchParams(window.location.search);
    // const tab = queryParams.get('tab');
    // if (tab) setSelectedTab(tab);

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    navigate('/'); // Redirect to home/login page
  };

  // Function to render the content based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'alumni': // FIRST: Alumni Forge
        return <AlumniForgeSection />;
      case 'chats': // SECOND: Echo Chamber (Chats)
        return <EchoChamberSection />;
      case 'explore': // THIRD: Explore Veritas Nexus
        return <ExploreSection />;
      case 'connections': // FOURTH: My Quad (Connections)
        return <MyQuadSection />;
      case 'profile': // FIFTH: Ascension Path (Profile)
        return <AscensionPathSection />;
      default:
        return <AlumniForgeSection />; // Fallback to Alumni Forge
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="app-brand-link">
            🎓 Veritas Nexus
          </Link>
        </div>
        <div className="header-right">
          {user && (
            <div className="user-info-dropdown">
              {/* MODIFIED: Using img tag with userAvatarImage */}
              <img src={userAvatarImage} alt="User Avatar" className="header-avatar" />
              <span className="user-name">{user.email ? user.email.split('@')[0] : 'User'}</span>
              <div className="dropdown-content">
                <button onClick={() => setSelectedTab('profile')} className="dropdown-item">
                  <FaUser /> My Profile
                </button>
                <button onClick={() => alert('Settings functionality coming soon!')} className="dropdown-item">
                  <FaCog /> Settings
                </button>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area - This will scroll if content overflows */}
      <main className="main-dashboard-content">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Primary Dashboard Navigation) */}
      <footer className="bottom-nav">
        {/* Buttons reordered to match the new tab order */}
        <button
          className={`bottom-nav-btn ${selectedTab === 'alumni' ? 'active' : ''}`}
          onClick={() => setSelectedTab('alumni')}
        >
          <FaAddressBook />
          <span>Alumni</span>
        </button>
        <button
          className={`bottom-nav-btn ${selectedTab === 'chats' ? 'active' : ''}`}
          onClick={() => setSelectedTab('chats')}
        >
          <FaComments />
          <span>Chats</span>
        </button>
        <button
          className={`bottom-nav-btn ${selectedTab === 'explore' ? 'active' : ''}`}
          onClick={() => setSelectedTab('explore')}
        >
          <FaEllipsisH />
          <span>Explore</span>
        </button>
        <button
          className={`bottom-nav-btn ${selectedTab === 'connections' ? 'active' : ''}`}
          onClick={() => setSelectedTab('connections')}
        >
          <FaUserFriends />
          <span>Quad</span>
        </button>
        <button
          className={`bottom-nav-btn ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => setSelectedTab('profile')}
        >
          <FaUser /> {/* This is the FaUser icon you're referring to */}
          <span>Profile</span>
        </button>
      </footer>
    </div>
  );
};

export default StudentDashboard;