// src/components/ExploreSection.jsx
import React from 'react';
import {
  FaBriefcase, FaCalendarAlt, FaGraduationCap, FaBook, FaBullhorn,
  FaStar, FaAward, FaCog, FaLightbulb, FaGlobe, FaChartLine, FaCode, FaRocket, FaMapMarkedAlt
} from 'react-icons/fa';
import '../styles/studentDashboard/ExploreSection.css'; // Dedicated CSS for Explore

const ExploreSection = ({ navigate }) => { // Receive navigate prop from parent
  // In a real application, these would navigate to specific routes or open modals
  const handleNavigation = (path) => {
    // Example: navigate('/student/dashboard/jobs');
    alert(`Navigating to: ${path}`);
  };

  return (
    <div className="explore-section-container dashboard-section-card">
      <h2 className="section-title">Explore Veritas Nexus</h2>
      <p className="section-description">Discover more features and opportunities to enhance your journey.</p>

      <div className="explore-grid">
        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/jobs')}>
          <FaBriefcase className="explore-icon" />
          <h3>Job & Internship Portal</h3>
          <p>Find your next career step, posted by alumni.</p>
          <button className="explore-item-button">Go to Jobs</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/events')}>
          <FaCalendarAlt className="explore-icon" />
          <h3>Events & Meetups</h3>
          <p>Connect at virtual and in-person community events.</p>
          <button className="explore-item-button">View Events</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/mentorship')}>
          <FaGraduationCap className="explore-icon" />
          <h3>Mentorship Program</h3>
          <p>Accelerate your growth with experienced alumni mentors.</p>
          <button className="explore-item-button">Find Mentors</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/blogs')}>
          <FaBook className="explore-icon" />
          <h3>Blogs & Success Stories</h3>
          <p>Read inspiring journeys and insights from our community.</p>
          <button className="explore-item-button">Read Blogs</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/announcements')}>
          <FaBullhorn className="explore-icon" />
          <h3>Announcements</h3>
          <p>Stay updated with the latest institutional news and updates.</p>
          <button className="explore-item-button">View Announcements</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/skill-endorsements')}>
          <FaStar className="explore-icon" />
          <h3>Skill Endorsements</h3>
          <p>Get recognized for your expertise by alumni and peers.</p>
          <button className="explore-item-button">Endorse Skills</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/gamification')}>
          <FaAward className="explore-icon" />
          <h3>Gamification & Badges</h3>
          <p>Earn recognition and climb leaderboards for your contributions.</p>
          <button className="explore-item-button">View Badges</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/knowledge-capsules')}>
          <FaLightbulb className="explore-icon" />
          <h3>Knowledge Capsules</h3>
          <p>Access short, actionable video/audio advice from alumni.</p>
          <button className="explore-item-button">Explore Capsules</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/industry-navigator')}>
          <FaGlobe className="explore-icon" />
          <h3>Industry Navigator</h3>
          <p>Visualize career paths and industry trends among alumni.</p>
          <button className="explore-item-button">Explore Navigator</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/career-path-map')}>
          <FaMapMarkedAlt className="explore-icon" />
          <h3>University Footprint Map</h3>
          <p>See the global presence of our alumni network.</p>
          <button className="explore-item-button">View Map</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/settings')}>
          <FaCog className="explore-icon" />
          <h3>Settings</h3>
          <p>Manage your account preferences and privacy settings.</p>
          <button className="explore-item-button">Go to Settings</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/my-analytics')}>
          <FaChartLine className="explore-icon" />
          <h3>My Analytics</h3>
          <p>Track your engagement and impact on Veritas Nexus.</p>
          <button className="explore-item-button">View Analytics</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/skill-progression')}>
          <FaCode className="explore-icon" />
          <h3>Skill Progression Tree</h3>
          <p>Visualize your skill development and growth journey.</p>
          <button className="explore-item-button">View Tree</button>
        </div>

        <div className="explore-item" onClick={() => handleNavigation('/student/dashboard/growth-goal-tracker')}>
          <FaRocket className="explore-icon" />
          <h3>Growth Goal Tracker</h3>
          <p>Set and track your personal and professional goals.</p>
          <button className="explore-item-button">Track Goals</button>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
