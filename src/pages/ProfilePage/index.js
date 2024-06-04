import React from 'react';
import Profile from '../../components/Profile';
import { getCurrentUser } from '../../services/authService';

const ProfilePage = () => {
  const user = getCurrentUser();

  return (
    <div>
      <h1>Profile</h1>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;