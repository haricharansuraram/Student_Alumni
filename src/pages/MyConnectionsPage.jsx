import React from 'react';
import ProfileCard from '../pages/ProfileCard.jsx';

const connections = [/* same array as above or filter by connections */];

const MyConnectionsPage = () => {
  return (
    <div className="dashboard-content">
      <h2>My Connections</h2>
      <div className="profile-grid">
        {connections.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </div>
  );
};

export default MyConnectionsPage;
