// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css'; // Import the dedicated CSS file

const Footer = () => (
  <footer className="app-footer">
    <p>&copy; {new Date().getFullYear()} Student-Alumni Connect</p>
  </footer>
);

export default Footer;