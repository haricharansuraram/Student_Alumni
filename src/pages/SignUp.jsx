import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
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
    // Alumni fields
    jobTitle: '',
    education: '',
    degree: '',
    experience: '',
    qualification: '',
    passedOut: '',
    skills: '',
    img: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.role === 'student' && !formData.batch) {
      newErrors.batch = 'Batch year is required for students';
    }
    if (formData.role === 'alumni' && !formData.profession) {
      newErrors.profession = 'Profession is required for alumni';
    }
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
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
      // Prepare payload
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        batch: formData.batch,
        profession: formData.profession,
        location: formData.location,
        phone: formData.phone,
      };

      // Add alumni fields if role is alumni
      if (formData.role === 'alumni') {
        payload.jobTitle = formData.jobTitle;
        payload.education = formData.education;
        payload.degree = formData.degree;
        payload.experience = formData.experience;
        payload.qualification = formData.qualification;
        payload.passedOut = formData.passedOut;
        payload.skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        payload.img = formData.img;
      }

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message || 'Registration failed.');
      }

      alert('Registration successful! Please log in.');
      navigate('/select-role');
    } catch (error) {
      setErrors({ global: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="signup-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="signup-content">
        <div className="signup-form-section">
          <div className="signup-header">
            <h1>Create Your Account</h1>
            <p>Join our community and start connecting with students and alumni</p>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
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
              </div>
            </div>
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
                    {batchYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.batch && <span className="error-message">{errors.batch}</span>}
                </div>
              )}
              {formData.role === 'alumni' && (
                <>
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
                  <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Senior Developer"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="education">Education</label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder="e.g., B.Tech in CSE"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      placeholder="e.g., M.Tech"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Experience</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 years"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="qualification">Qualification</label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      placeholder="e.g., MBA"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passedOut">Passed Out Year</label>
                    <input
                      type="text"
                      id="passedOut"
                      name="passedOut"
                      value={formData.passedOut}
                      onChange={handleInputChange}
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="skills">Skills (comma separated)</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="img">Profile Image URL</label>
                    <input
                      type="text"
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleInputChange}
                      placeholder="Paste image URL"
                    />
                  </div>
                </>
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
            {errors.global && <span className="error-message global-error">{errors.global}</span>}
            <button type="submit" className={`signup-submit ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="login-link">
              Already have an account? <a href="/select-role">Sign in here</a>
            </div>
          </form>
        </div>
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