// src/components/AscensionPathSection.jsx
import React, { useState, useEffect } from 'react';
import {
  FaUser, FaCog, FaRocket, FaCode, FaChartLine, FaBook, FaMapMarkedAlt,
  FaLinkedin, FaGithub, FaLink, FaEnvelope, FaPhone, FaEdit, FaPlus, FaAward, FaTimes
} from 'react-icons/fa';
import '../styles/studentDashboard/AscensionPathSection.css'; // Dedicated CSS for Ascension Path

// Placeholder for a circular user avatar
const FaUserCircle = ({ className }) => (
    <div className={`user-circle-avatar ${className}`}>
        <FaUser />
    </div>
);

const AscensionPathSection = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [editedProfile, setEditedProfile] = useState(null); // State for form data during editing

  useEffect(() => {
    // In a real app, fetch user profile data from your backend API
    const mockProfile = {
      id: 's1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.edu',
      phone: '123-456-7890',
      batch: '2025',
      branch: 'Computer Science',
      bio: 'Aspiring software engineer with a passion for AI and machine learning. Currently exploring ethical AI development and open-source contributions. Looking for internship opportunities in tech.',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'Data Analysis', 'Cloud Computing'],
      linkedin: 'https://linkedin.com/in/alexjohnson',
      github: 'https://github.com/alexjohnson',
      portfolio: 'https://alexjohnson.dev/portfolio',
      growthGoals: [
        { id: 'g1', text: 'Secure a Summer 2024 AI/ML internship', completed: false },
        { id: 'g2', text: 'Complete advanced Python certification', completed: true },
        { id: 'g3', text: 'Contribute to an open-source project', completed: false },
      ],
      skillProgression: {
        'React': { level: 'Intermediate', endorsements: 5 },
        'Python': { level: 'Advanced', endorsements: 10 },
      },
      legacyScore: 0, // Students start at 0, alumni gain score
    };
    setProfile(mockProfile);
    setEditedProfile(mockProfile); // Initialize editedProfile with current profile
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // When exiting edit mode, revert changes if cancelled, or save if confirmed
    if (isEditing) {
      setEditedProfile(profile); // Revert changes if cancelling
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In a real app, send editedProfile to backend API
    console.log('Saving profile:', editedProfile);
    setProfile(editedProfile); // Update main profile state
    setIsEditing(false);
    alert('Profile saved successfully!'); // Placeholder for success feedback
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setEditedProfile(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()) }));
  };

  const handleAddGoal = () => {
    const newGoalText = prompt('Enter your new growth goal:');
    if (newGoalText) {
      setEditedProfile(prev => ({
        ...prev,
        growthGoals: [...(prev.growthGoals || []), { id: `g${Date.now()}`, text: newGoalText, completed: false }]
      }));
    }
  };

  const handleToggleGoalCompletion = (goalId) => {
    setEditedProfile(prev => ({
      ...prev,
      growthGoals: prev.growthGoals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  };

  if (!profile) {
    return <div className="dashboard-section-card">Loading profile...</div>; // Loading state
  }

  return (
    <div className="ascension-path-container dashboard-section-card">
      <h2 className="section-title">Ascension Path (My Profile)</h2>
      <p className="section-description">Your living growth journey within Veritas Nexus. Showcase your progress and aspirations.</p>

      <div className="profile-header-section">
        <FaUserCircle className="profile-avatar" />
        <h3>{profile.name}</h3>
        <p className="profile-meta">{profile.branch} | Batch {profile.batch}</p>
        <button className="edit-profile-button" onClick={handleEditToggle}>
          {isEditing ? <FaTimes /> : <FaEdit />} {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form className="profile-edit-form" onSubmit={handleSaveProfile}>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={editedProfile.bio} onChange={handleInputChange} rows="4"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={editedProfile.phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input type="url" id="linkedin" name="linkedin" value={editedProfile.linkedin} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub URL</label>
            <input type="url" id="github" name="github" value={editedProfile.github} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="portfolio">Portfolio URL</label>
            <input type="url" id="portfolio" name="portfolio" value={editedProfile.portfolio} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input type="text" id="skills" name="skills" value={editedProfile.skills.join(', ')} onChange={handleSkillsChange} />
          </div>
          <button type="submit" className="save-profile-button">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details-view">
          <div className="profile-section-card">
            <h3 className="section-card-heading">About Me</h3>
            <p>{profile.bio}</p>
            <div className="contact-info">
              {profile.email && <p><FaEnvelope /> {profile.email}</p>}
              {profile.phone && <p><FaPhone /> {profile.phone}</p>}
            </div>
            <div className="social-links">
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>}
              {profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener noreferrer"><FaLink /> Portfolio</a>}
            </div>
          </div>

          <div className="profile-section-card">
            <h3 className="section-card-heading">Skills</h3>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <button className="endorse-skills-button"><FaAward /> Get Endorsed</button>
          </div>

          <div className="profile-section-card">
            <h3 className="section-card-heading">Growth Goal Tracker <FaRocket /></h3>
            <ul className="growth-goals-list">
              {profile.growthGoals && profile.growthGoals.map(goal => (
                <li key={goal.id} className={goal.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => handleToggleGoalCompletion(goal.id)}
                    disabled={!isEditing} // Only allow toggle in edit mode
                  />
                  {goal.text}
                </li>
              ))}
            </ul>
            <button className="add-goal-button" onClick={handleAddGoal}><FaPlus /> Add New Goal</button>
          </div>

          <div className="profile-section-card">
            <h3 className="section-card-heading">Skill Progression Tree <FaCode /></h3>
            <p className="feature-description">Visualize your skill development over time and see endorsements.</p>
            <button className="feature-card-button">View Skill Tree</button>
          </div>

          <div className="profile-section-card">
            <h3 className="section-card-heading">My Analytics <FaChartLine /></h3>
            <p className="feature-description">Track your engagement, connections, and learning on Veritas Nexus.</p>
            <button className="feature-card-button">View Analytics</button>
          </div>

          <div className="profile-section-card">
            <h3 className="section-card-heading">University Footprint Map <FaMapMarkedAlt /></h3>
            <p className="feature-description">See the global presence of our alumni network and their locations.</p>
            <button className="feature-card-button">Explore Map</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AscensionPathSection;
