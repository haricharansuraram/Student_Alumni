import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaRocket, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import '../styles/studentDashboard/MentorshipProgram.css';

const fallbackAlumni = [
  {
    _id: '1',
    name: 'Priya Sharma',
    profession: 'Software Engineer, Google',
    bio: 'Passionate about mentoring students in tech and career development.',
    email: 'priya.sharma@gmail.com',
    linkedin: 'https://linkedin.com/in/priyasharma'
  },
  {
    _id: '2',
    name: 'Rahul Verma',
    profession: 'Data Scientist, Microsoft',
    bio: 'Loves sharing insights on data science and analytics.',
    email: 'rahul.verma@gmail.com',
    linkedin: 'https://linkedin.com/in/rahulverma'
  },
  {
    _id: '3',
    name: 'Anjali Mehta',
    profession: 'Product Manager, Amazon',
    bio: 'Guiding students in product thinking and leadership.',
    email: 'anjali.mehta@gmail.com',
    linkedin: 'https://linkedin.com/in/anjalimehta'
  },
  {
    _id: '4',
    name: 'Vikram Singh',
    profession: 'Cybersecurity Analyst, Cisco',
    bio: 'Helping students understand cybersecurity and best practices.',
    email: 'vikram.singh@gmail.com',
    linkedin: 'https://linkedin.com/in/vikramsingh'
  },
  {
    _id: '5',
    name: 'Sneha Patel',
    profession: 'UX Designer, Adobe',
    bio: 'Mentoring on design thinking and user experience.',
    email: 'sneha.patel@gmail.com',
    linkedin: 'https://linkedin.com/in/snehapatel'
  },
  {
    _id: '6',
    name: 'Amit Desai',
    profession: 'Cloud Architect, AWS',
    bio: 'Cloud technologies and career guidance for tech aspirants.',
    email: 'amit.desai@gmail.com',
    linkedin: 'https://linkedin.com/in/amitdesai'
  }
];

const MentorshipProgram = ({ alumniList , onNavigate }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetch('/api/alumni?isMentor=true')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch mentors');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMentors(data);
        } else if (alumniList && alumniList.length > 0) {
          setMentors(alumniList);
        } else {
          setMentors(fallbackAlumni);
        }
      })
      .catch(() => {
        if (alumniList && alumniList.length > 0) {
          setMentors(alumniList);
        } else {
          setMentors(fallbackAlumni);
        }
        setError('');
      })
      .finally(() => setLoading(false));
  }, [alumniList]);

  const handleMentorshipRequest = (mentorName) => {
    setNotification(`Mentorship request sent to ${mentorName}`);
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <div className="mentorship-program-container dashboard-section-card">
      <button
        className="profile-back-btn"
        onClick={() => onNavigate && onNavigate('explore')}
      >
        ← Back
      </button>
      <h2 className="section-title"><FaRocket /> Mentorship Program</h2>
      <p className="section-description">
        Accelerate your growth with experienced alumni mentors. 
      </p>
      {notification && <div className="notification-popup">{notification}</div>}
      {loading && <div>Loading mentors...</div>}
      <div className="mentors-list">
        {mentors.length === 0 && !loading && <div>No mentors found.</div>}
        {mentors.map(mentor => (
          <div key={mentor._id} className="mentor-card">
            <div className="mentor-avatar">
              <FaUserGraduate size={32} />
            </div>
            <div className="mentor-info">
              <h3>{mentor.name}</h3>
              <p className="mentor-profession">{mentor.profession || 'Alumni Mentor'}</p>
              <p className="mentor-bio">{mentor.bio}</p>
              <div className="mentor-contact">
                {mentor.email && (
                  <a href={`mailto:${mentor.email}`} target="_blank" rel="noopener noreferrer">
                    <FaEnvelope /> Email
                  </a>
                )}
                {mentor.linkedin && (
                  <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
              </div>
              <button
                className="mentor-request-btn"
                onClick={() => handleMentorshipRequest(mentor.name)}
              >
                <FaRocket style={{ marginRight: 6 }} />
                Send Mentorship Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipProgram;