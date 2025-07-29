// src/components/AlumniForgeSection.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaHandshake, FaComments, FaUser, FaLightbulb, FaGlobe } from 'react-icons/fa';
import '../styles/studentDashboard/AlumniForgeSection.css'; // Dedicated CSS for Alumni Forge

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
  const batchYears = Array.from({ length: 20 }, (_, i) => currentYear - i).map(String); // Last 20 years

  useEffect(() => {
    // In a real application, fetch alumni data from your backend API
    // This mock data simulates a diverse set of alumni
    const mockAlumni = [
      { id: 'a1', name: 'Dr. Alum Smith', meta: 'Software Engineer @ Google | Batch 2010', bio: 'Passionate about AI ethics and open-source contributions. Available for mentorship in AI/ML.', industry: 'Technology', batch: '2010' },
      { id: 'a2', name: 'Jane Doe', meta: 'Marketing Director @ HubSpot | Batch 2015', bio: 'Specializing in digital marketing strategies and brand building. Happy to review resumes.', industry: 'Marketing', batch: '2015' },
      { id: 'a3', name: 'John Mentor', meta: 'Financial Analyst @ JPMorgan | Batch 2008', bio: 'Offering mentorship in investment banking and market analysis. Strong network in FinTech.', industry: 'Finance', batch: '2008' },
      { id: 'a4', name: 'Sarah Tech', meta: 'Product Manager @ Microsoft | Batch 2012', bio: 'Experienced in product development lifecycle and agile methodologies. Looking to connect with aspiring PMs.', industry: 'Technology', batch: '2012' },
      { id: 'a5', name: 'David Innovator', meta: 'Startup Founder @ NexusLabs | Batch 2018', bio: 'Building the next generation of EdTech solutions. Always open to new ideas and collaborations.', industry: 'Entrepreneurship', batch: '2018' },
      { id: 'a6', name: 'Emily Creative', meta: 'UX Designer @ Airbnb | Batch 2016', bio: 'Focus on user-centered design and creating intuitive digital experiences. Portfolio reviews available.', industry: 'Design', batch: '2016' },
    ];
    setAlumniList(mockAlumni);
  }, []);

  const filteredAlumni = alumniList.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alum.meta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alum.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alum.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch ? alum.batch === selectedBatch : true;
    const matchesIndustry = selectedIndustry ? alum.industry === selectedIndustry : true;

    return matchesSearch && matchesBatch && matchesIndustry;
  });

  const uniqueIndustries = [...new Set(alumniList.map(alum => alum.industry))];

  return (
    <div className="alumni-forge-container dashboard-section-card">
      <h2 className="section-title">Alumni Forge</h2>
      <p className="section-description">Discover and connect with our esteemed alumni. Leverage their experience to shape your future.</p>

      <div className="alumni-search-filter">
        <input
          type="text"
          placeholder="Search alumni by name, industry, skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button"><FaSearch /> Search</button>

        <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="filter-select">
          <option value="">All Batches</option>
          {batchYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="filter-select">
          <option value="">All Industries</option>
          {uniqueIndustries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="alumni-list-grid">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map(alum => (
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
          ))
        ) : (
          <p className="no-results-message">No alumni found matching your criteria.</p>
        )}
      </div>

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
