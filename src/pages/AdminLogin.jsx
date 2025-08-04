import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/Login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setError('');

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message || 'Login failed.');
      }

      localStorage.setItem('user', JSON.stringify({
        _id: userData._id,
        email: userData.email,
        role: userData.role,
        token: userData.token,
      }));

      if (userData.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        throw new Error('User is not an Admin.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    navigate('/select-role');
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality is under development.');
  };

  const handleGetActivationLink = () => {
    alert('Get Activation Link functionality is under development.');
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={handleBackToRoleSelection}>
        ← Back
      </button>
      <div className="login-content">
        <div className="login-form-section">
          <div className="login-header">
            <img src={logo} alt="Admin Logo" className="login-logo" />
            <h1>Admin / Staff Login</h1>
            <p>Access the administrative portal</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                className={emailError ? 'error' : ''}
                disabled={isLoading}
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                  className={passwordError ? 'error' : ''}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            {error && <span className="error-message global-error">{error}</span>}
            <div className="login-actions">
              <button
                type="button"
                className="link-button"
                onClick={handleForgotPassword}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="link-button"
                onClick={handleGetActivationLink}
                disabled={isLoading}
              >
                Get Activation Link
              </button>
            </div>
            <button
              type="submit"
              className={`login-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
            <p className="signup-text">
              <span className="signup-link-span" onClick={handleBackToRoleSelection}>Go back to role selection</span>
            </p>
          </form>
        </div>
        <div className="login-benefits">
          <div className="benefits-content">
            <h2>
              Manage and Oversee Your <br />
              <span className="highlight">Student Alumni Network</span>
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">📊</span>
                <div className="benefit-text">
                  <h3>Centralized Control</h3>
                  <p>Manage user accounts, content, and system settings efficiently.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🛡️</span>
                <div className="benefit-text">
                  <h3>Secure Operations</h3>
                  <p>Maintain data integrity and privacy with robust security features.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📈</span>
                <div className="benefit-text">
                  <h3>Insightful Analytics</h3>
                  <p>Monitor platform activity and gain insights for strategic decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
