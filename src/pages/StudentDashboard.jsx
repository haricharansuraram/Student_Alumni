import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUser, FaComments, FaAddressBook, FaUserFriends, FaEllipsisH,
  FaSignOutAlt, FaCog
} from 'react-icons/fa';
import '../styles/StudentDashboard.css';
import { Outlet } from 'react-router-dom';
import ExploreSection from '../components/ExploreSection';
import AlumniForgeSection from '../components/AlumniForgeSection';
import MyQuadSection from '../components/MyQuadSection';
import EchoChamberSection from '../components/EchoChamberSection';
import AscensionPathSection from '../components/AscensionPathSection';
import JobsInternshipsPortal from '../pages/JobsInternshipsPortal';
import userAvatarImage from '../assets/user1.jpeg';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('alumni');
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role.toLowerCase() === 'student') {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('user');
        navigate('/select-role');
      }
    } else {
      navigate('/select-role');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Pass onMessageClick to AlumniForgeSection and selectedChatUser to EchoChamberSection
  const renderContent = () => {
    switch (selectedTab) {
      case 'alumni':
        return (
          <AlumniForgeSection
            onMessageClick={(alumniUser) => {
              setSelectedChatUser(alumniUser);
              setSelectedTab('chats');
            }}
          />
        );
      case 'chats':
        return <EchoChamberSection selectedChatUser={selectedChatUser} />;
      case 'jobs':
        return <JobsInternshipsPortal />;
      case 'explore':
        return <ExploreSection setSelectedTab={setSelectedTab} />;
      case 'connections':
        return <MyQuadSection />;
      case 'profile':
        return <AscensionPathSection />;
      default:
        return <AlumniForgeSection />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="app-brand-link">
            🎓 StudentAlumniConnect
          </Link>
        </div>
        <div className="header-right">
          {user && (
            <div className="user-info-dropdown">
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

      {/* Main Content Area */}
      <main className="main-dashboard-content">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <footer className="bottom-nav">
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
          <FaUser />
          <span>Profile</span>
        </button>
      </footer>
      
    </div>
  );
};

export default StudentDashboard;