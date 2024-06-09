import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

import { getCurrentUser } from './services/authService';

const App = () => {
  const user = getCurrentUser();

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Navigate to="/game" />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/game" element={<GamePage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
