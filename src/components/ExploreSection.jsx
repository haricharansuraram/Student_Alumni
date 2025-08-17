import React, { useState, useEffect } from 'react';
import {
  FaBriefcase, FaCalendarAlt, FaGraduationCap, FaBook, FaBullhorn,
  FaStar, FaAward, FaCog, FaLightbulb, FaGlobe, FaChartLine, FaCode, FaRocket, FaMapMarkedAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Add this import
import '../styles/studentDashboard/ExploreSection.css';

const mockEvents = [
  { id: 1, title: 'Alumni Tech Talk: The Future of AI', date: 'Oct 25, 2025', time: '5:00 PM', status: 'Upcoming' },
  { id: 2, title: 'Career Fair: Fall 2025', date: 'Nov 10, 2025', time: '10:00 AM', status: 'Ongoing' },
  { id: 3, title: 'Mentorship Mixer', date: 'Nov 1, 2025', time: '6:00 PM', status: 'Upcoming' },
  { id: 4, title: 'Data Science Workshop', date: 'Sep 20, 2025', time: '2:00 PM', status: 'Past' },
];

const ExploreSection = ({ setSelectedTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Use the hook

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % mockEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + mockEvents.length) % mockEvents.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Use navigate instead of alert
  const handleNavigation = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="explore-section-container dashboard-section-card">
      <h2 className="section-title">Community Hub</h2>
      <p className="section-description">Discover more features and opportunities to enhance your journey.</p>
      {/* Events Carousel */}
      <div className="events-carousel-container">
        <h3 className="carousel-title">Upcoming & Ongoing Events</h3>
        <div className="carousel-wrapper">
          <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {mockEvents.map((event, index) => (
              <div key={event.id} className="carousel-item">
                <div className="event-card">
                  <div className={`event-status ${event.status.toLowerCase()}`}>
                    {event.status}
                  </div>
                  <h4>{event.title}</h4>
                  <p className="event-date">
                    <FaCalendarAlt /> {event.date} at {event.time}
                  </p>
                  <button className="event-card-button">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-nav-buttons">
          <button className="nav-button prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="nav-button next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
        <div className="carousel-indicators">
          {mockEvents.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      {/* Main Explore Grid */}
      <div className="explore-grid-container">
        <div className="explore-grid">
  <div className="explore-item" onClick={() => handleNavigation('jobs')}>
    <FaBriefcase className="explore-icon" />
    <h3>Job & Internship Portal</h3>
    <p>Find your next career step, posted by alumni.</p>
    <button className="explore-item-button">Go to Jobs</button>
  </div>
  <div className="explore-item" onClick={() => handleNavigation('mentorship')}>
    <FaRocket className="explore-icon" />
    <h3>Mentorship Program</h3>
    <p>Accelerate your growth with experienced alumni mentors.</p>
    <button className="explore-item-button">Explore Mentorship</button>
  </div>
  <div className="explore-item" onClick={() => handleNavigation('blogs')}>
    <FaBook className="explore-icon" />
    <h3>Blogs & Success Stories</h3>
    <p>Read inspiring journeys and insights from our community.</p>
    <button className="explore-item-button">Read Blogs</button>
  </div>
  {/* <div className="explore-item" onClick={() => handleNavigation('announcements')}>
    <FaBullhorn className="explore-icon" />
    <h3>Announcements</h3>
    <p>Stay updated with the latest institutional news and updates.</p>
    <button className="explore-item-button">View Announcements</button>
  </div> */}
  <div className="explore-item" onClick={() => handleNavigation('skillEndorsements')}>
    <FaStar className="explore-icon" />
    <h3>Skill Endorsements</h3>
    <p>Get recognized for your expertise by alumni and peers.</p>
    <button className="explore-item-button">Endorse Skills</button>
  </div>
  <div className="explore-item" onClick={() => handleNavigation('gamification')}>
    <FaAward className="explore-icon" />
    <h3>Gamification & Badges</h3>
    <p>Earn recognition and climb leaderboards for your contributions.</p>
    <button className="explore-item-button">View Badges</button>
  </div>
</div>
      </div>
    </div>
  );
};

export default ExploreSection;