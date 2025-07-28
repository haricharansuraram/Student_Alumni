import React, { useState } from 'react';
import '../styles/Login.css'; // Ensure this CSS file is used and up-to-date
import logo from '../assets/logo.png'; // Assuming your logo path is correct
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
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
    setError(''); // Clear any previous general errors

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
    } else if (password.length < 8) { // Admin passwords should ideally be stronger
      setPasswordError('Password must be at least 8 characters.');
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
      // 1. Send credentials securely to your backend API via HTTPS
      //    (e.g., using fetch or axios)
      // 2. The backend should authenticate and return a secure token (e.g., JWT).
      // 3. For security, store tokens in HTTP-only cookies, not localStorage, to prevent XSS attacks.
      //    (localStorage is used here for demonstration purposes but is less secure for tokens).

      console.log('Attempting Admin login with:', { email, password });

      // Mock API call: Replace this with your actual backend API endpoint
      const response = await new Promise(resolve => setTimeout(() => {
        // Simulate backend response based on credentials
        if (email === 'admin@example.com' && password === 'secureadmin123') { // Use a strong mock password
          resolve({
            ok: true,
            status: 200,
            json: () => ({
              email: email,
              role: 'Admin',
              token: 'mock_jwt_token_for_admin',
            }),
          });
        } else {
          resolve({
            ok: false,
            status: 401,
            json: () => ({ message: 'Invalid email or password.' }),
          });
        }
      }, 1500)); // Simulate network delay

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const userData = await response.json();

      // Store user data (e.g., token, role)
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        role: userData.role,
        token: userData.token,
      }));

      // Redirect to the appropriate dashboard
      if (userData.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        // If an unexpected role is returned, handle it gracefully
        setError('Unexpected user role. Please contact support.');
      }

    } catch (err) {
      // Catch network errors, server errors, etc.
      setError(err.message || 'An unexpected error occurred during login. Please try again.');
      console.error('Admin login error:', err);
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
      {/* Back Button (consistent with other enhanced pages) */}
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
            <img src={logo} alt="Institute Logo" className="login-logo" />
            <h1>Admin / Staff Login</h1>
            <p>Access the administrative portal</p> {/* Specific sub-heading for Admin */}
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
                onClick={() => alert('Forgot Password functionality is under development for Admins.')}
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

            {/* Optional: Link to general signup if an admin needs to redirect someone */}
            <p className="signup-text">
              Not an admin? <span className="signup-link-span" onClick={() => navigate('/select-role')}>Go back to role selection</span>
            </p>
          </form>
        </div>

        {/* RIGHT SECTION - Benefits/Welcome */}
        <div className="login-benefits">
          <div className="benefits-content">
            <h2>
              Manage and Oversee Your <br />
              <span className="highlight">Student Alumni Network</span>
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">📊</span> {/* Changed icon for admin */}
                <div className="benefit-text">
                  <h3>Centralized Control</h3>
                  <p>Manage user accounts, content, and system settings efficiently.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🛡️</span> {/* Changed icon for admin */}
                <div className="benefit-text">
                  <h3>Secure Operations</h3>
                  <p>Maintain data integrity and privacy with robust security features.</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📈</span> {/* Changed icon for admin */}
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