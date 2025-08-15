import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AlumniDetail.css';
const AlumniDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;
        const res = await fetch(`/api/alumni/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Alumni not found');
        const data = await res.json();
        setAlumni(data);
      } catch (err) {
        setAlumni(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!alumni) return <div>Alumni not found</div>;

  const {
    img,
    name,
    batch,
    jobTitle,
    location,
    education,
    degree,
    experience,
    qualification,
    passedOut,
    skills
  } = alumni;

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
        {img && <img src={img} alt={name} className="alumni-img-large" />}
        <h2>{name}</h2>
        <p><strong>Job Title:</strong> {jobTitle}</p>
        <p><strong>Education:</strong> {education}</p>
        <p><strong>Degree:</strong> {degree}</p>
        <p><strong>Experience:</strong> {experience}</p>
        <p><strong>Batch Year:</strong> {passedOut}</p>
        <p><strong>Skills:</strong> {skills && Array.isArray(skills) ? skills.join(', ') : skills}</p>
        <p><strong>Location:</strong> {location}</p>
        <div className="alumni-card-actions">
          <button className="connect-btn">Connect</button>
          <button
            className="message-btn"
            onClick={() =>
              navigate(`/student/dashboard/chats/${alumni._id}`, {
                state: {
                  selectedChatUser: {
                    id: alumni._id,
                    name: alumni.name,
                    avatar: alumni.avatar
                  }
                }
              })
            }
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetail;