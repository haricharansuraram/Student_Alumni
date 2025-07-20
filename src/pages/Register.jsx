import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
const Register = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const role = query.get('role') || 'Student';

  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...form, role
      });

      alert("Signup successful!");
      navigate(`/create-profile?role=${role}`);
    } catch (err) {
      alert("Signup error.");
    }
  };

  return (
    <div>
      <h2>{role} Signup</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
