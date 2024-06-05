import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;