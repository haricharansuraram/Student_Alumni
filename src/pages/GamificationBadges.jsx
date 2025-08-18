import React, { useState } from 'react';
import { FaAward } from 'react-icons/fa';
import '../styles/studentDashboard/GamificationBadges.css';

const initialBadges = [
  { name: 'Community Helper', description: 'Helped 10+ students in forums', earned: true },
  { name: 'Top Mentor', description: 'Received 5 mentorship requests', earned: false },
  { name: 'Skill Endorsed', description: 'Endorsed by 3 alumni', earned: true },
  { name: 'Event Participant', description: 'Attended 3 events', earned: false },
  { name: 'Blog Contributor', description: 'Published a blog post', earned: true }
];

const leaderboardData = [
  { rank: 1, name: 'Priya Sharma', points: 1200, badges: 5 },
  { rank: 2, name: 'Rahul Verma', points: 1100, badges: 4 },
  { rank: 3, name: 'Sneha Patel', points: 950, badges: 4 },
  { rank: 4, name: 'Amit Desai', points: 900, badges: 3 },
  { rank: 5, name: 'Anjali Mehta', points: 850, badges: 3 }
];

const GamificationBadges = ({onNavigate}) => {
  const [badges] = useState(initialBadges);

  return (
    <div className="gamification-page-container dashboard-section-card">
      <button
        className="profile-back-btn"
        onClick={() => onNavigate && onNavigate('explore')}
      >
        ← Back
      </button>
      <h2 className="gamification-title"><FaAward /> Gamification & Badges</h2>
      <p className="gamification-description">
        Earn recognition and climb leaderboards for your contributions. Collect badges and see your achievements!
      </p>
      <div className="gamification-content">
        <div className="gamification-badges-list">
          <h3 className="gamification-badges-title">Your Badges</h3>
          <ul className="gamification-badges-ul">
            {badges.map((badge, idx) => (
              <li key={idx} className={`gamification-badge-item${badge.earned ? ' earned' : ''}`}>
                <span className="gamification-badge-icon"><FaAward /></span>
                <span className="gamification-badge-name">{badge.name}</span>
                <span className="gamification-badge-desc">{badge.description}</span>
                <span className="gamification-badge-status">
                  {badge.earned ? 'Earned' : 'Locked'}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="gamification-leaderboard-table-container">
          <h3 className="gamification-badges-title">Leaderboard</h3>
          <table className="gamification-leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
                <th>Badges</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map(user => (
                <tr key={user.rank}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>{user.points}</td>
                  <td>{user.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GamificationBadges;