import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateProfile = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const role = query.get('role');

  const [profile, setProfile] = useState({
    bio: '', education: '', skills: '',
    linkedin: '', github: '', password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/profile/create', {
        ...profile, role
      });

      alert("Profile created!");
      navigate('/dashboard');
    } catch (err) {
      alert("Profile creation failed.");
    }
  };

  return (
    <div>
      <h2>{role} - Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Bio" onChange={e => setProfile({ ...profile, bio: e.target.value })} />
        <input type="text" placeholder="Education" onChange={e => setProfile({ ...profile, education: e.target.value })} />
        <input type="text" placeholder="Skills (comma separated)" onChange={e => setProfile({ ...profile, skills: e.target.value })} />
        <input type="url" placeholder="LinkedIn URL" onChange={e => setProfile({ ...profile, linkedin: e.target.value })} />
        <input type="url" placeholder="GitHub URL" onChange={e => setProfile({ ...profile, github: e.target.value })} />
        <input type="password" placeholder="Set Password" onChange={e => setProfile({ ...profile, password: e.target.value })} required />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
