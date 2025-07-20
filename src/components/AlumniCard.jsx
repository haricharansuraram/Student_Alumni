import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlumniCard = ({ id, name, batch, profession, location, img, alumni }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    navigate(`/student/dashboard/alumni/${id}`, { state: { alumni } });
  };

  const handleMessageClick = (e) => {
    e.stopPropagation();
    navigate(`/student/dashboard/chats/${id}`, { state: { alumni } });
  };

  return (
    <div className="alumni-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img src={img} alt={name} className="alumni-img" />
      <h3>{name}</h3>
      <p>Batch: {batch}</p>
      <p>Profession: {profession}</p>
      <p>Location: {location}</p>
      <div className="alumni-card-actions" style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.8rem' }}>
        <button className="connect-btn">Connect</button>
        <button className="message-btn" onClick={handleMessageClick}>Message</button>
      </div>
    </div>
  );
};

export default AlumniCard;