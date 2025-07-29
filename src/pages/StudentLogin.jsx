import React, { useState } from 'react';
import '../styles/Login.css'; // Make sure this CSS file is aligned with the new structure
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for general login errors
  const [emailError, setEmailError] = useState(''); // State for email validation error
  const [passwordError, setPasswordError] = useState(''); // State for password validation error
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setError('');

    // Basic email validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid.');
      isValid = false;
    }

    // Basic password validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) { // Minimum length for password
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }
    return isValid;
  };
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    setIsLoading(true); // Start loading indicator
    try {
      // --- PRODUCTION-READY LOGIN LOGIC ---
      // 1. Send credentials securely to your backend API
      //    (e.g., using fetch or axios with HTTPS)
      // 2. Do NOT store sensitive information (like tokens) directly in localStorage
      //    In a real app, consider HTTP-only cookies for tokens.
      //    For this example, we'll keep localStorage for simplicity, but acknowledge the risk.
      console.log('Attempting login with:', { email, password });
      // Mock API call: Replace this with your actual backend API endpoint
      const response = await new Promise(resolve => setTimeout(() => {
        // Simulate backend response based on credentials
        if (email === 'student@example.com' && password === 'password123') {
          resolve({
            ok: true,
            status: 200,
            json: () => ({
              email: email,
              role: 'Student',
              token: 'mock_jwt_token_for_student',
            }),
          });
        } else {
          resolve({
            ok: false,
            status: 401,
            json: () => ({ message: 'Invalid email or password.' }),
          });
        }
      }, 1500));
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const userData = await response.json();

      // Store user data (e.g., token, role) securely.
      // For a real application, consider using HTTP-only cookies for tokens.
      // localStorage is used here for demonstration but is not the most secure.
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        role: userData.role,
        token: userData.token,
      }));

      // Redirect based on role (ensure your routes are correctly configured)
      switch (userData.role) {
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
          setError('Invalid user role received from server.');
      }

    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false); // End loading indicator
    }
  };

  // Function to navigate back to the role selection page
  const handleBackToRoleSelection = () => {
    navigate('/select-role'); // Assuming /select-role is your role selection page
  };

  return (
    <div className="login-container">
      {/* Back Button (similar to other enhanced pages) */}
      <button
        className="back-button"
        onClick={handleBackToRoleSelection}
      >
        ← Back
      </button>

      {/* LEFT SECTION - Login Form */}
      <div className="login-content"> {/* Use login-content for consistent layout */}
        <div className="login-form-section">
          <div className="login-header">
            <img src={logo} alt="Student Alumni Connect Logo" className="login-logo" />
            <h1>Student Login</h1>
            <p>Access your student portal</p> {/* Added a sub-heading */}
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} // Clear error on change
                className={emailError ? 'error' : ''} // Apply error class
                disabled={isLoading} // Disable input while loading
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input"> {/* Reuse .password-input for styling */}
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} // Clear error on change
                  className={passwordError ? 'error' : ''} // Apply error class
                  disabled={isLoading} // Disable input while loading
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading} // Disable toggle while loading
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            {error && <span className="error-message global-error">{error}</span>} {/* Display general login error */}

            <div className="login-actions">
              <button
                type="button"
                className="link-button"
                onClick={() => alert('Forgot Password functionality is under development.')}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className={`login-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>

            <p className="signup-text">
              Don't have an account? <span className="signup-link-span" onClick={() => navigate('/signup')}>Sign up here</span> {/* Span for signup link */}
            </p>
          </form>
        </div>

        {/* RIGHT SECTION - Benefits/Welcome */}
        <div className="login-benefits">
          <div className="benefits-content">
            <h2>
              Welcome to the <br />
              <span className="highlight">Student Alumni Network</span>
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🤝</span>
                <div className="benefit-text">
                  <h3>Connect with Peers</h3>
                  <p>Engage with fellow students and alumni for academic and social support.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <div className="benefit-text">
                  <h3>Discover Opportunities</h3>
                  <p>Find internships, projects, and events relevant to your studies and career path.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌱</span>
                <div className="benefit-text">
                  <h3>Grow Your Skills</h3>
                  <p>Access resources and mentorship to develop your professional and personal abilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;