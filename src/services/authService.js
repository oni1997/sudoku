export const signup = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.text();
      console.error('Error signing up:', errorData);
      throw new Error('Signup failed. Please check server logs for details.');
    }
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // Store user data in localStorage
      return data;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const logout = () => {
  localStorage.removeItem('user');
};
