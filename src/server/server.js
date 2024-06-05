const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const dataFilePath = path.join(__dirname, 'data.json');

// Load user data from the JSON file
let userData = {};
try {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  userData = JSON.parse(data);
} catch (err) {
  console.error('Error reading data file:', err);
}

app.use(cors());
app.use(express.json());

// User signup
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  if (userData[email]) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Create a new user
  userData[email] = { email, password };
  saveUserData();

  res.status(200).json({ message: 'User signed up successfully' });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and the password is correct
  const user = userData[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Save user data to the JSON file
const saveUserData = () => {
  const data = JSON.stringify(userData);
  fs.writeFileSync(dataFilePath, data);
};

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.post('/api/saveGameProgress', (req, res) => {
  const { userId, board } = req.body;
  if (!userData[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  userData[userId].gameProgress = board;
  saveUserData();

  res.status(200).json({ message: 'Game progress saved' });
});

// Load game progress
app.get('/api/loadGameProgress/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!userData[userId] || !userData[userId].gameProgress) {
    return res.status(404).json({ error: 'No saved game found' });
  }

  res.status(200).json(userData[userId].gameProgress);
});