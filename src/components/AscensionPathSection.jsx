import React, { useState, useEffect } from 'react';
import {
  FaUser, FaCog, FaRocket, FaCode, FaChartLine, FaBook, FaMapMarkedAlt,
  FaLinkedin, FaGithub, FaLink, FaEnvelope, FaPhone, FaEdit, FaPlus, FaAward, FaTimes
} from 'react-icons/fa';
import '../styles/studentDashboard/AscensionPathSection.css';
import { useNavigate } from 'react-router-dom';
// Placeholder for a circular user avatar
const FaUserCircle = ({ className }) => (
  <div className={`user-circle-avatar ${className}`}>
    <FaUser />
  </div>
);

const AscensionPathSection = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Notification and input state for goal tracker and skill endorsement
  const [notification, setNotification] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const userId = user ? user._id : null;

    if (!token || !userId) {
      setError('User not authenticated.');
      return;
    }

    setLoading(true);
    fetch(`/api/profile/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setEditedProfile(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedProfile(profile);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      if (!token || !user) {
        throw new Error('User not authenticated.');
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...editedProfile,
          skills: editedProfile.skills.join(', ')
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile.');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
      setIsEditing(false);
      setNotification('Profile saved successfully!');
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setEditedProfile(prev => ({ ...prev, skills: value.split(',').map(s => s.trim()) }));
  };

  // --- Growth Goal Tracker ---
  const handleAddGoal = () => {
    setShowGoalInput(true);
    setNewGoalText('');
  };

  const handleGoalInputChange = (e) => {
    setNewGoalText(e.target.value);
  };

  const handleGoalInputSubmit = (e) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      setEditedProfile(prev => ({
        ...prev,
        growthGoals: [
          ...(prev.growthGoals || []),
          { id: `g${Date.now()}`, text: newGoalText.trim(), completed: false }
        ]
      }));
      setNotification('New goal added!');
      setTimeout(() => setNotification(''), 2000);
    }
    setShowGoalInput(false);
    setNewGoalText('');
  };

  const handleToggleGoalCompletion = (goalId) => {
    setEditedProfile(prev => ({
      ...prev,
      growthGoals: prev.growthGoals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  };

  // --- Skill Endorsement ---
  const handleAddSkill = () => {
    setShowSkillInput(true);
    setNewSkillText('');
  };

  const handleSkillInputChange = (e) => {
    setNewSkillText(e.target.value);
  };

  const handleSkillInputSubmit = (e) => {
    e.preventDefault();
    if (newSkillText.trim()) {
      setEditedProfile(prev => ({
        ...prev,
        skills: [
          ...(prev.skills || []),
          newSkillText.trim()
        ]
      }));
      setNotification('New skill endorsed!');
      setTimeout(() => setNotification(''), 2000);
    }
    setShowSkillInput(false);
    setNewSkillText('');
  };

  if (loading) {
    return <div className="dashboard-section-card">Loading profile...</div>;
  }
  if (error) {
    return <div className="dashboard-section-card error-message">{error}</div>;
  }
  if (!profile || !editedProfile) {
    return <div className="dashboard-section-card">No profile found. Create one by clicking 'Edit Profile'.</div>;
  }

  return (
    <div className="ascension-path-container dashboard-section-card">
      {/* Notification for goal tracker and skill endorsement */}
      {notification && (
        <div className="notification-popup">{notification}</div>
      )}
      <h2 className="section-title">My Profile</h2>
      <div className="profile-header-section">
        <FaUserCircle className="profile-avatar" />
        <h3>{profile.user.name}</h3>
        <p className="profile-meta">Computer Science and Engineering | Batch: {2022}</p>
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
          {/* --- Growth Goal Tracker --- */}
          <div className="form-group">
            <label>Growth Goal Tracker</label>
            <ul className="growth-goals-list">
              {editedProfile.growthGoals && editedProfile.growthGoals.map(goal => (
                <li key={goal.id} className={goal.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => handleToggleGoalCompletion(goal.id)}
                  />
                  {goal.text}
                </li>
              ))}
            </ul>
            <button type="button" className="add-goal-button" onClick={handleAddGoal}><FaPlus /> Add New Goal</button>
            {showGoalInput && (
              <form className="goal-input-form" onSubmit={handleGoalInputSubmit}>
                <input
                  type="text"
                  value={newGoalText}
                  onChange={handleGoalInputChange}
                  placeholder="Enter your new growth goal"
                  autoFocus
                />
                <button type="submit" className="save-goal-btn">Save Goal</button>
              </form>
            )}
          </div>
          {/* --- Skill Endorsement --- */}
          <div className="form-group">
            <label>Skills Endorsed</label>
            <div className="skills-list">
              {editedProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <button type="button" className="endorse-skills-button" onClick={handleAddSkill}><FaAward /> Endorse Skill</button>
            {showSkillInput && (
              <form className="skill-input-form" onSubmit={handleSkillInputSubmit}>
                <input
                  type="text"
                  value={newSkillText}
                  onChange={handleSkillInputChange}
                  placeholder="Enter a skill to endorse"
                  autoFocus
                />
                <button type="submit" className="save-skill-btn">Save Skill</button>
              </form>
            )}
          </div>
          <button type="submit" className="save-profile-button">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details-view">
          <div className="profile-section-card">
            <h3 className="section-card-heading">About Me</h3>
            <p>{profile.bio}</p>
            <div className="contact-info">
              {profile.user.email && (
                <a href={`mailto:${profile.user.email}`} target="_blank" rel="noopener noreferrer">
                  {/* <FaEnvelope /> {profile.user.email} */}
                </a>
              )}
              {profile.phone && <p><FaPhone /> {profile.phone}</p>}
            </div>
            <div className="social-links">
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>}
              {profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener noreferrer"><FaLink /> Portfolio</a>}
              {profile.user.email && (
                <a href={`mailto:${profile.user.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope /> Email
                </a>
              )}
            </div>
          </div>
          {/* --- Skills Endorsed --- */}
          <div className="profile-section-card">
            <h3 className="section-card-heading">Skills Endorsed</h3>
            <div className="skills-list">
              {editedProfile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            {/* <button className="endorse-skills-button" onClick={handleAddSkill}><FaAward /> Endorse Skill</button> */}
            {showSkillInput && (
              <form className="skill-input-form" onSubmit={handleSkillInputSubmit}>
                <input
                  type="text"
                  value={newSkillText}
                  onChange={handleSkillInputChange}
                  placeholder="Enter a skill to endorse"
                  autoFocus
                />
                <button type="submit" className="save-skill-btn">Save Skill</button>
              </form>
            )}
          </div>
          {/* --- Growth Goal Tracker --- */}
          <div className="profile-section-card">
            <h3 className="section-card-heading">Growth Goal Tracker <FaRocket /></h3>
            <ul className="growth-goals-list">
              {editedProfile.growthGoals && editedProfile.growthGoals.map(goal => (
                <li key={goal.id} className={goal.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    disabled
                  />
                  {goal.text}
                </li>
              ))}
            </ul>
            <button className="add-goal-button" onClick={handleAddGoal}><FaPlus /> Add New Goal</button>
            {showGoalInput && (
              <form className="goal-input-form" onSubmit={handleGoalInputSubmit}>
                <input
                  type="text"
                  value={newGoalText}
                  onChange={handleGoalInputChange}
                  placeholder="Enter your new growth goal"
                  autoFocus
                />
                <button type="submit" className="save-goal-btn">Save Goal</button>
              </form>
            )}
          </div>
          <div className="profile-section-card">
            <h3 className="section-card-heading">Skill Progression Tree <FaCode /></h3>
            <p className="feature-description">Visualize your skill development over time and see endorsements.</p>
            <button className="feature-card-button" onClick={() => navigate('/student/dashboard/skill-tree')}>
  View Skill Tree
</button>
          </div>
          {/* <div className="profile-section-card">
            <h3 className="section-card-heading">My Analytics <FaChartLine /></h3>
            <p className="feature-description">Track your engagement, connections, and learning on Veritas Nexus.</p>
            <button className="feature-card-button">View Analytics</button>
          </div>
          <div className="profile-section-card">
            <h3 className="section-card-heading">University Footprint Map <FaMapMarkedAlt /></h3>
            <p className="feature-description">See the global presence of our alumni network and their locations.</p>
            <button className="feature-card-button">Explore Map</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default AscensionPathSection;