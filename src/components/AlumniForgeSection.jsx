import React, { useState, useEffect } from 'react';
import { FaHandshake, FaComments, FaUser, FaLightbulb, FaGlobe } from 'react-icons/fa';
import '../styles/studentDashboard/AlumniForgeSection.css';

const FaUserCircle = ({ className }) => (
  <div className={`user-circle-avatar ${className}`}>
    <FaUser />
  </div>
);

// Accept onMessageClick as a prop from parent (StudentDashboard)
const AlumniForgeSection = ({ onMessageClick }) => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 20 }, (_, i) => currentYear - i).map(String);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;
        if (!token || !user || !user._id) throw new Error('User not authenticated.');
        const queryParams = new URLSearchParams({
          batch: selectedBatch,
          industry: selectedIndustry,
          search: searchTerm
        });
        const response = await fetch(`/api/alumni?${queryParams.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch alumni data.');
        }
        const data = await response.json();
        setAlumniList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [searchTerm, selectedBatch, selectedIndustry]);

  // Filter alumni list by search term, batch, and industry
  const filteredAlumni = alumniList.filter(alum =>
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedBatch ? alum.batch === selectedBatch : true) &&
    (selectedIndustry ? alum.industry === selectedIndustry : true)
  );

  return (
    <div className="alumni-forge-container dashboard-section-card">
      <h2 className="section-title">Alumni Forge</h2>
      <p className="section-description">Discover and connect with our esteemed alumni. Leverage their experience to shape your future.</p>
      
      {/* Search and filter controls */}
      <div className="alumni-search-filters">
        <input
          type="text"
          placeholder="Search alumni by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        
      </div>

      {loading && <p className="loading-message">Loading alumni...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && filteredAlumni.length > 0 ? (
        <div className="alumni-list-grid">
          {filteredAlumni.map(alum => (
            <div key={alum._id} className="alumni-card">
              <FaUserCircle className="alumni-avatar" />
              <h3>{alum.name}</h3>
              <p className="alumni-meta">{alum.jobTitle} | {alum.batch} | {alum.industry}</p>
              <p className="alumni-location">{alum.location}</p>
              <div className="alumni-card-actions">
                <button className="connect-button"><FaHandshake /> Connect</button>
                <button
                  className="message-button"
                  onClick={() =>
                    onMessageClick &&
                    onMessageClick({
                      id:alum._id,
                      name: alum.name,
                      avatar: alum.avatar // if available
                    })
                  }
                >
                  <FaComments /> Message
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-results-message">No alumni found matching your criteria.</p>
      )}
      <div className="alumni-features-section">
        <div className="alumni-feature-card">
          <h3 className="feature-card-title">Knowledge Capsules <FaLightbulb /></h3>
          <p>Access short, actionable video/audio advice from alumni on specific topics like career tips, industry insights, and skill development.</p>
          <button className="feature-card-button">Explore Capsules</button>
        </div>
        <div className="alumni-feature-card">
          <h3 className="feature-card-title">Industry Navigator <FaGlobe /></h3>
          <p>Visualize common career paths taken by alumni from different university branches and batches. Understand industry trends and opportunities.</p>
          <button className="feature-card-button">View Paths</button>
        </div>
      </div>
    </div>
  );
};

export default AlumniForgeSection;