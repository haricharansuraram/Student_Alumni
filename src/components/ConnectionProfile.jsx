import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/studentDashboard/ConnectionProfile.css';
const mockConnections = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    meta: 'Student | Batch 2025',
    type: 'student',
    bio: 'Robotics enthusiast, passionate about AI and automation.',
    email: 'priya.sharma@email.com',
    location: 'Delhi, India',
    interests: 'Robotics, AI, Automation',
    linkedin: 'https://linkedin.com/in/priyasharma',
    experience: 'Intern at TechLabs (2024)',
    passedOutYear: '2025',
    company: 'N/A'
  },
  {
    id: 'c2',
    name: 'Rahul Verma',
    meta: 'Alumni | Software Engineer @ Google',
    type: 'alumni',
    bio: 'Mentoring in full-stack development and cloud technologies.',
    email: 'rahul.verma@email.com',
    location: 'Bangalore, India',
    interests: 'Full-stack, Cloud, Mentoring',
    linkedin: 'https://linkedin.com/in/rahulverma',
    experience: '5 years at Google, 2 years at Infosys',
    passedOutYear: '2017',
    company: 'Google'
  },
  {
    id: 'c3',
    name: 'Sneha Patel',
    meta: 'Alumni | Marketing Manager @ Global Brands',
    type: 'alumni',
    bio: 'Expert in digital strategy and brand growth.',
    email: 'sneha.patel@email.com',
    location: 'Mumbai, India',
    interests: 'Marketing, Branding, Strategy',
    linkedin: 'https://linkedin.com/in/snehapatel',
    experience: '3 years at Global Brands, 2 years at AdWorks',
    passedOutYear: '2015',
    company: 'Global Brands'
  },
  {
    id: 'c4',
    name: 'Amit Desai',
    meta: 'Student | Batch 2026',
    type: 'student',
    bio: 'Data science and machine learning enthusiast.',
    email: 'amit.desai@email.com',
    location: 'Ahmedabad, India',
    interests: 'Data Science, ML',
    linkedin: 'https://linkedin.com/in/amitdesai',
    experience: 'Research Assistant at University (2025)',
    passedOutYear: '2026',
    company: 'N/A'
  },
  {
    id: 'c5',
    name: 'Dr. Anjali Mehta',
    meta: 'Alumni | University Professor',
    type: 'alumni',
    bio: 'Researching sustainable energy solutions and academic collaborations.',
    email: 'anjali.mehta@email.com',
    location: 'Pune, India',
    interests: 'Energy, Research, Academics',
    linkedin: 'https://linkedin.com/in/anjalimehta',
    experience: '10 years as Professor, 5 years in Industry',
    passedOutYear: '2008',
    company: 'University of Pune'
  },
];

const ConnectionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const connection = mockConnections.find(conn => conn.id === id);

  if (!connection) {
    return <div style={{ padding: 32 }}>Connection not found.</div>;
  }

  return (
    <div className="connection-profile-container">
      <button className="profile-back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="profile-header">
        <div className="profile-avatar">
          {connection.name[0]}
        </div>
        <div>
          <h2 className="profile-name">{connection.name}</h2>
          <div className="profile-role">{connection.type === 'student' ? 'Student' : 'Alumni'}</div>
          <div className="profile-meta">{connection.meta.includes('|') ? connection.meta.split('|')[1].trim() : connection.meta}</div>
        </div>
      </div>
      <div className="profile-details">
        <div className="profile-detail-row"><span className="profile-label">Email:</span> {connection.email}</div>
        <div className="profile-detail-row"><span className="profile-label">Location:</span> {connection.location}</div>
        <div className="profile-detail-row"><span className="profile-label">Interests:</span> {connection.interests}</div>
        <div className="profile-detail-row"><span className="profile-label">Experience:</span> {connection.experience}</div>
        <div className="profile-detail-row"><span className="profile-label">Passed Out Year:</span> {connection.passedOutYear}</div>
        <div className="profile-detail-row"><span className="profile-label">Company:</span> {connection.company}</div>
        <div className="profile-detail-row"><span className="profile-label">LinkedIn:</span> <a href={connection.linkedin} target="_blank" rel="noopener noreferrer">{connection.linkedin}</a></div>
        <div className="profile-detail-row"><span className="profile-label">Bio:</span> {connection.bio}</div>
      </div>
    </div>
  );
};

export default ConnectionProfile;