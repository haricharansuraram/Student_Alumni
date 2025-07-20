import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AlumniDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.alumni) return <div>Alumni not found</div>;

  const {
    img,
    name,
    batch,
    profession,
    location,
    education,
    degree,
    experience,
    qualification,
    passedOut,
    skills
  } = state.alumni;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#f7f9fb' }}>
      {/* Back button at top left */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: 'none',
          border: 'none',
          color: '#1976d2',
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 2
        }}
      >
        <span style={{ fontSize: 24, marginRight: 6 }}>←</span> Back
      </button>
      {/* Centered content */}
      <div
        className="alumni-detail-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <img src={img} alt={name} className="alumni-img-large" />
        <h2>{name}</h2>
        <p><strong>Profession:</strong> {profession}</p>
        <p><strong>Education:</strong> {education}</p>
        <p><strong>Degree:</strong> {degree}</p>
        <p><strong>Experience:</strong> {experience}</p>
        <p><strong>Qualification:</strong> {qualification}</p>
        <p><strong>Batch:</strong> {batch}</p>
        <p><strong>Passed Out Year:</strong> {passedOut}</p>
        <p><strong>Skills:</strong> {skills && skills.join(', ')}</p>
        <p><strong>Location:</strong> {location}</p>
        <div className="alumni-card-actions">
          <button className="connect-btn">Connect</button>
          <button className="message-btn" onClick={() => navigate(`/student/dashboard/chats/${state.alumni.id}`, { state: { alumni: state.alumni } })}>Message</button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetail;