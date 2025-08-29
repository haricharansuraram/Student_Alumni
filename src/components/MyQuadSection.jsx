import React, { useState, useEffect } from 'react';
import { FaUser, FaComments, FaUserPlus, FaUsers, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/studentDashboard/MyQuadSection.css';

const FaUserCircle = ({ className }) => (
  <div className={`user-circle-avatar ${className}`}>
    <FaUser />
  </div>
);

const MyQuadSection = ({onNavigate}) => {
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState('');
  const [handledRequests, setHandledRequests] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const mockConnections = [
      { id: 'c1', name: 'Priya Sharma', meta: 'Student | Batch 2025', type: 'student', bio: 'Robotics enthusiast, passionate about AI and automation.' },
      { id: 'c2', name: 'Rahul Verma', meta: 'Alumni | Software Engineer ', type: 'alumni', bio: 'Mentoring in full-stack development and cloud technologies.' },
      { id: 'c3', name: 'Sneha Patel', meta: 'Alumni | Marketing Manager ', type: 'alumni', bio: 'Expert in digital strategy and brand growth.' },
      { id: 'c4', name: 'Amit Desai', meta: 'Student | Batch 2026', type: 'student', bio: 'Data science and machine learning enthusiast.' },
      { id: 'c5', name: 'Dr. Anjali Mehta', meta: 'Alumni | University Professor', type: 'alumni', bio: 'Researching sustainable energy solutions and academic collaborations.' },
    ];
    setConnections(mockConnections);

    const mockRequests = [
      { id: 'r1', name: 'Vikram Singh', meta: 'Alumni | Cybersecurity Analyst @ Cisco', message: 'Would like to connect regarding cybersecurity career advice.' }
    ];
    setRequests(mockRequests);
  }, []);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.meta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileRedirect = (id) => {
    navigate(`/connections/profile/${id}`);
     if (onNavigate) {
      onNavigate('connections-profile', id);
    }
  };

  const handleRequestAction = (id, action) => {
    setHandledRequests(prev => ({ ...prev, [id]: true }));
    setNotification(
      action === 'accept'
        ? 'Connection request accepted!'
        : 'Connection request rejected!'
    );
    setTimeout(() => {
      setNotification('');
      setRequests(prev => prev.filter(req => req.id !== id));
    }, 2500); // Hide notification and request after 2.5s
  };

  return (
    <div className="connections-container dashboard-section-card">
      {/* Notification in top right */}
      {notification && (
        <div className="connections-notification connections-notification-top">{notification}</div>
      )}

      <h2 className="connections-title">Connections</h2>
      <p className="connections-description">Connect, collaborate, and grow together.</p>

      <div className="connections-requests-section">
        <h3 className="connections-requests-title"><FaUserPlus /> Connection Requests</h3>
        {requests.length > 0 ? (
          <ul className="connections-requests-list">
            {requests.map(req => (
              !handledRequests[req.id] && (
                <li key={req.id} className="connections-request-item">
                  <span className="connections-request-name">{req.name}</span>
                  <span className="connections-request-meta">{req.meta}</span>
                  <span className="connections-request-message">{req.message}</span>
                  <div className="connections-request-actions">
                    <button className="connections-accept-btn" onClick={() => handleRequestAction(req.id, 'accept')}>Accept</button>
                    <button className="connections-reject-btn" onClick={() => handleRequestAction(req.id, 'reject')}>Reject</button>
                  </div>
                </li>
              )
            ))}
          </ul>
        ) : (
          <p className="connections-no-requests">No new connection requests.</p>
        )}
      </div>

      <div className="connections-search-bar">
        <input
          type="text"
          placeholder="Search your connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="connections-search-input"
        />
      </div>

      <div className="connections-list-section">
        <h3 className="connections-list-title">My Connections</h3>
        {filteredConnections.length > 0 ? (
          <ul className="connections-list">
            {filteredConnections.map(connection => (
              <li key={connection.id} className="connections-list-item single-line-connection">
                <FaUserCircle className="connections-avatar" />
                <button
                  className="connections-name-btn"
                  onClick={() => handleProfileRedirect(connection.id)}
                >
                  {connection.name}
                </button>
                <span className="connections-meta-type">{connection.type === 'student' ? 'Student' : 'Alumni'}</span>
                {connection.meta.includes('|') && (
                  <span className="connections-meta-job">
                    {connection.meta.split('|')[1].trim()}
                  </span>
                )}
                <button className="connections-message-btn"><FaComments /> Message</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="connections-no-results">No connections found matching your search. Try connecting with more alumni!</p>
        )}
      </div>

      {/* <div className="connections-features-section">
        <div className="connections-feature-card">
          <h3 className="connections-feature-title">Peer Accountability Circles <FaUsers /></h3>
          <p>Form small, private groups with peers to share goals, track progress, and hold each other accountable for academic or professional milestones.</p>
          <button className="connections-feature-btn">Create Circle</button>
        </div>
        <div className="connections-feature-card">
          <h3 className="connections-feature-title">Skill Exchange Board <FaHandshake /></h3>
          <p>Post requests for help with specific skills you need, or offer your expertise to others. Facilitate informal skill swaps within your network.</p>
          <button className="connections-feature-btn">View Board</button>
        </div>
      </div> */}
    </div>
  );
};

export default MyQuadSection;