// src/components/MyQuadSection.jsx
import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch, FaComments, FaUserPlus, FaUsers, FaHandshake } from 'react-icons/fa';
import '../styles/studentDashboard/MyQuadSection.css'; // Dedicated CSS for My Quad

// Placeholder for a circular user avatar
const FaUserCircle = ({ className }) => (
    <div className={`user-circle-avatar ${className}`}>
        <FaUser />
    </div>
);

const MyQuadSection = () => {
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real application, fetch user's connections from backend
    const mockConnections = [
      { id: 'c1', name: 'Peer A', meta: 'Student | Batch 2025', type: 'student', bio: 'Working on a robotics project. Let\'s connect if you\'re into AI!' },
      { id: 'c2', name: 'Mentor B', meta: 'Alumni | Software Engineer @ Acme Corp', type: 'alumni', bio: 'Offering mentorship in full-stack development. Always happy to help fellow alums/students.' },
      { id: 'c3', name: 'Alum C', meta: 'Alumni | Marketing Manager @ Global Brands', type: 'alumni', bio: 'Specializing in digital strategy and brand growth. Reach out for career advice.' },
      { id: 'c4', name: 'Peer D', meta: 'Student | Batch 2026', type: 'student', bio: 'Interested in data science and machine learning. Looking for study partners.' },
      { id: 'c5', name: 'Dr. Expert E', meta: 'Alumni | University Professor', type: 'alumni', bio: 'Researching sustainable energy solutions. Connect for academic collaborations.' },
    ];
    setConnections(mockConnections);
  }, []);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.meta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-quad-container dashboard-section-card">
      <h2 className="section-title">My Quad (Connections)</h2>
      <p className="section-description">Your personal network within Veritas Nexus. Connect, collaborate, and grow together.</p>

      <div className="connections-search-bar">
        <input
          type="text"
          placeholder="Search your connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button"><FaSearch /> Search</button>
      </div>

      <div className="connections-grid">
        {filteredConnections.length > 0 ? (
          filteredConnections.map(connection => (
            <div key={connection.id} className="connection-card">
              <FaUserCircle className="connection-avatar" />
              <h3>{connection.name}</h3>
              <p className="connection-meta">{connection.meta}</p>
              <p className="connection-bio">{connection.bio}</p>
              <div className="connection-card-actions">
                <button className="message-button"><FaComments /> Message</button>
                {/* Add other actions like View Profile, Endorse Skill etc. */}
                <button className="view-profile-button"><FaUser /> View Profile</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-message">No connections found matching your search. Try connecting with more alumni!</p>
        )}
      </div>

      <div className="quad-features-section">
        <div className="connections-feature-card">
          <h3 className="feature-card-title">Peer Accountability Circles <FaUsers /></h3>
          <p>Form small, private groups with peers to share goals, track progress, and hold each other accountable for academic or professional milestones.</p>
          <button className="feature-card-button">Create Circle</button>
        </div>
        <div className="connections-feature-card">
          <h3 className="feature-card-title">Skill Exchange Board <FaHandshake /></h3>
          <p>Post requests for help with specific skills you need, or offer your expertise to others. Facilitate informal skill swaps within your network.</p>
          <button className="feature-card-button">View Board</button>
        </div>
      </div>
    </div>
  );
};

export default MyQuadSection;
