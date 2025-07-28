import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    batch: '',
    profession: '',
    location: '',
    phone: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (formData.role === 'student' && !formData.batch) {
      newErrors.batch = 'Batch year is required for students';
    }

    if (formData.role === 'alumni' && !formData.profession) {
      newErrors.profession = 'Profession is required for alumni';
    }

    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - redirect to login
      navigate('/select-role');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="signup-container">
      {/* Back Button */}
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>

      <div className="signup-content">
        {/* Left Section - Form */}
        <div className="signup-form-section">
          <div className="signup-header">
            <h1>Create Your Account</h1>
            <p>Join our community and start connecting with students and alumni</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            {/* Account Security */}
            <div className="form-section">
              <h3>Account Security</h3>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <ul>
                    <li className={formData.password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
                    <li className={/(?=.*[a-z])/.test(formData.password) ? 'valid' : ''}>One lowercase letter</li>
                    <li className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>One uppercase letter</li>
                    <li className={/(?=.*\d)/.test(formData.password) ? 'valid' : ''}>One number</li>
                  </ul>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-section">
              <h3>Role Selection</h3>
              <div className="role-selection">
                <label className={`role-option ${formData.role === 'student' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleInputChange}
                  />
                  <div className="role-content">
                    <span className="role-icon">🎓</span>
                    <div className="role-info">
                      <h4>Student</h4>
                      <p>Currently enrolled student</p>
                    </div>
                  </div>
                </label>

                <label className={`role-option ${formData.role === 'alumni' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="alumni"
                    checked={formData.role === 'alumni'}
                    onChange={handleInputChange}
                  />
                  <div className="role-content">
                    <span className="role-icon">👨‍💼</span>
                    <div className="role-info">
                      <h4>Alumni</h4>
                      <p>Graduated from the institution</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Role-specific fields */}
              {formData.role === 'student' && (
                <div className="form-group">
                  <label htmlFor="batch">Batch Year *</label>
                  <select
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className={errors.batch ? 'error' : ''}
                  >
                    <option value="">Select your batch year</option>
                    {batchYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.batch && <span className="error-message">{errors.batch}</span>}
                </div>
              )}

              {formData.role === 'alumni' && (
                <div className="form-group">
                  <label htmlFor="profession">Profession *</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className={errors.profession ? 'error' : ''}
                    placeholder="e.g., Software Engineer, Marketing Manager"
                  />
                  {errors.profession && <span className="error-message">{errors.profession}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-section">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a> *
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`signup-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <div className="login-link">
              Already have an account? <a href="/select-role">Sign in here</a>
            </div>
          </form>
        </div>

        {/* Right Section - Benefits */}
        <div className="signup-benefits">
          <div className="benefits-content">
            <h2>Why Join Student Alumni Connect?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">🤝</span>
                <div className="benefit-text">
                  <h3>Network & Connect</h3>
                  <p>Build meaningful connections with students and alumni across various industries</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <div className="benefit-text">
                  <h3>Career Growth</h3>
                  <p>Access mentorship opportunities and career guidance from experienced professionals</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💼</span>
                <div className="benefit-text">
                  <h3>Job Opportunities</h3>
                  <p>Discover exclusive job postings and internship opportunities shared by alumni</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📚</span>
                <div className="benefit-text">
                  <h3>Knowledge Sharing</h3>
                  <p>Learn from the experiences and insights of successful alumni in your field</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
