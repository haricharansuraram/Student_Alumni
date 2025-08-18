import React, { useState } from 'react';
import '../styles/studentDashboard/SkillEndorsements.css';

const skillsList = [
  'JavaScript',
  'React',
  'Python',
  'Data Analysis',
  'UI/UX Design',
  'Project Management',
  'Machine Learning',
  'Communication',
  'Cloud Computing',
  'Leadership'
];

const SkillEndorsements = ({onNavigate}) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [endorsementRequests, setEndorsementRequests] = useState([]);
  const [requestSent, setRequestSent] = useState(false);

  const handleRequest = () => {
    if (selectedSkill) {
      setEndorsementRequests([...endorsementRequests, selectedSkill]);
      setRequestSent(true);
      setTimeout(() => setRequestSent(false), 2000);
      setSelectedSkill('');
    }
  };

  return (
    <div className="skill-page-container dashboard-section-card">
      <button
        className="profile-back-btn"
        onClick={() => onNavigate && onNavigate('explore')}
      >
        ← Back
      </button>
      <h2 className="skill-title"><span role="img" aria-label="star">⭐</span> Skill Endorsements</h2>
      <p className="skill-description">
        Get recognized for your expertise by alumni and peers. Select a skill below and request endorsements from your network!
      </p>
      <div className="skill-content">
        <div className="skill-request-section">
          <label htmlFor="skill-select" className="skill-label">Choose a skill to request endorsement:</label>
          <select
            id="skill-select"
            className="skill-select"
            value={selectedSkill}
            onChange={e => setSelectedSkill(e.target.value)}
          >
            <option value="">-- Select Skill --</option>
            {skillsList.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          <button className="skill-request-btn" onClick={handleRequest} disabled={!selectedSkill}>
            Request Endorsement
          </button>
          {requestSent && (
            <div className="skill-notification">
              Endorsement request for <strong>{selectedSkill}</strong> sent!
            </div>
          )}
        </div>
        <div className="skill-requests-list">
          <h3 className="skill-requests-title">Your Requested Endorsements</h3>
          {endorsementRequests.length === 0 ? (
            <p className="skill-no-requests">No endorsement requests yet.</p>
          ) : (
            <ul className="skill-requests-ul">
              {endorsementRequests.map((skill, idx) => (
                <li key={idx} className="skill-request-item">
                  <span role="img" aria-label="star">⭐</span> {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillEndorsements;