import React from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Example login logic
    const res = {
      data: {
        email: 'admin@example.com',
        role: 'Admin',
        token: 'fake-jwt-token',
      }
    };

    localStorage.setItem('user', JSON.stringify({
      email: res.data.email,
      role: res.data.role,
      token: res.data.token
    }));

    if (res.data.role === 'Student') navigate('/dashboard/student');
    else if (res.data.role === 'Alumni') navigate('/dashboard/alumni');
    else if (res.data.role === 'Admin') navigate('/dashboard/admin');
  };

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <div className="login-left">
        <img src={logo} alt="Institute Logo" />
        <div className="login-form">
          <h2>Admin/Staff Login</h2>
          <label>Email Address</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
          <div className="login-actions">
            <a href="#">Forgot Password?</a>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <h1>
          Welcome to <br />
          Student Alumni Portal
        </h1>
      </div>
    </div>
  );
};

export default AdminLogin;
