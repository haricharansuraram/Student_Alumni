import React from 'react';

const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '#feffffff',
  color: '#374151',
  fontSize: '1rem',
};

const Footer = () => (
  <footer style={footerStyle}>
    <p>&copy; {new Date().getFullYear()} Student-Alumni Connect</p>
  </footer>
);

export default Footer;
