// src/components/AlumniForgeSection.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaHandshake, FaComments, FaUser, FaLightbulb, FaGlobe } from 'react-icons/fa';
import '../styles/studentDashboard/AlumniForgeSection.css';

// Placeholder for a circular user avatar
const FaUserCircle = ({ className }) => (
    <div className={`user-circle-avatar ${className}`}>
        <FaUser />
    </div>
);

const AlumniForgeSection = () => {
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
        
        // FIX: The API call will now only run if a valid token exists
        if (!token || !user || !user._id) {
          throw new Error('User not authenticated.');
        }

        const queryParams = new URLSearchParams({
            batch: selectedBatch,
            industry: selectedIndustry,
            search: searchTerm
        });

        const response = await fetch(`/api/alumni?${queryParams.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            // CRUCIAL FIX: Attach the token to the Authorization header
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
        console.error("Error fetching alumni:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [searchTerm, selectedBatch, selectedIndustry]);

  const uniqueIndustries = [...new Set(alumniList.map(alum => alum.industry))];

  return (
    <div className="alumni-forge-container dashboard-section-card">
      <h2 className="section-title">Alumni Forge</h2>
      <p className="section-description">Discover and connect with our esteemed alumni. Leverage their experience to shape your future.</p>

      {loading && <p className="loading-message">Loading alumni...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && alumniList.length > 0 ? (
        <div className="alumni-list-grid">
          {alumniList.map(alum => (
            <div key={alum.id} className="alumni-card">
              <FaUserCircle className="alumni-avatar" />
              <h3>{alum.name}</h3>
              <p className="alumni-meta">{alum.meta}</p>
              <p className="alumni-bio">{alum.bio}</p>
              <div className="alumni-card-actions">
                <button className="connect-button"><FaHandshake /> Connect</button>
                <button className="message-button"><FaComments /> Message</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-results-message">No alumni found matching your criteria.</p>
      )}

      {/* Feature cards for Knowledge Capsules and Industry Navigator */}
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
