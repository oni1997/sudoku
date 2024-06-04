import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      {/* Display other user information and game progress */}
    </div>
  );
};

export default Profile;