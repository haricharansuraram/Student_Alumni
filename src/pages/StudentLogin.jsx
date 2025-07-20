import React, { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: Replace with actual backend API call
    const res = {
      data: {
        email: email,
        role: 'Student', // mock role
        token: 'fake-jwt-token',
      }
    };

    localStorage.setItem('user', JSON.stringify({
      email: res.data.email,
      role: res.data.role,
      token: res.data.token
    }));

    switch (res.data.role) {
      case 'Student':
        navigate('/student/dashboard');
        break;
      case 'Alumni':
        navigate('/alumni/dashboard');
        break;
      case 'Admin':
        navigate('/admin/dashboard');
        break;
      default:
        alert('Invalid user role');
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <div className="login-left">
        <img src={logo} alt="Student Alumni Connect Logo" className="login-logo" />
        <div className="login-form">
          <h2>Student Login</h2>
          <p className="browser-tip">(Best viewed in Chrome 60+)</p>

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-actions">
            <a href="#">Forgot Password?</a>
            <a href="#">Get Activation Link</a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <h1>
          Welcome to <br />
          <span className="highlight">Student Alumni Connect</span>
        </h1>
      </div>
    </div>
  );
};

export default StudentLogin;
