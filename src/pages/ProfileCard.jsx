// src/pages/ProfileCard.jsx
import React from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = ({ name, institution, gradYear, degree, jobTitle, company, image }) => {
  return (
    <div className="profile-card">
      <img src={image} alt={name} className="profile-img" />
      <h3>{name}</h3>
      <p>{degree} ({gradYear})</p>
      <p>{institution}</p>
      <p>{jobTitle} @ {company}</p>
      <div className="card-actions">
        <button className="connect-btn">Connect</button>
        <button className="message-btn">Message</button>
      </div>
    </div>
  );
};

export default ProfileCard;
