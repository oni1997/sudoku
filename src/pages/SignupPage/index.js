import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm';

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm />
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;