import React from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoutesApp from './routes';

const App = () => {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden (like dashboard routes)
 const hiddenLayoutPaths = ['/student/dashboard', '/alumni/dashboard', '/admin/dashboard'];


  // Check if current location starts with any of the hidden layout paths
  const shouldHideLayout = hiddenLayoutPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {/* Show Navbar only when not on dashboard-like routes */}
      {!shouldHideLayout && <Navbar />}

      {/* Main Routes */}
      <RoutesApp />

      {/* Show Footer only when not on dashboard-like routes */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
