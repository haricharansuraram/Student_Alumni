// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Make sure this is imported

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1 className="main-title">Welcome to Student-Alumni Connect</h1>
        <p className="intro">
          A platform that bridges students, alumni, and admin — for collaboration, mentorship, and professional growth.
        </p>

        <div className="features-section">
          <h2 className="features-title">🔍 Key Features</h2>
          <ul className="features-list">
            <li><strong>Role-based access:</strong> Students, Alumni, and Admin dashboards</li>
            <li><strong>Profile creation & editing:</strong> Add your bio, education, and skillset</li>
            <li><strong>Social links:</strong> Showcase your LinkedIn and GitHub profiles</li>
            <li><strong>Secure authentication:</strong> Login/Register with password protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;