// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db'); // this is your pool from db.js

const app = express();
const PORT = process.env.PORT || 5000; // use a web port, not MySQL port

app.use(cors());
app.use(express.json());

// sanity check endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend API!' });
});

/**
 * POST /register
 * Body: { username, password }
 * Validates basic rules, checks duplicates, inserts user.
 */
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // basic validations
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password.' });
  }
  if (username.trim().length < 8 || password.trim().length < 12) {
    return res.status(400).json({
      error: 'Username must be at least 8 characters and password at least 12.'
    });
  }

  // adjust this column name to your schema: 'id' vs 'user_id'
  const checkSql = 'SELECT id FROM users WHERE username = ?';

  db.query(checkSql, [username], (err, results) => {
    if (err) {
      console.error('Database error (check):', err);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertSql, [username, password], (err, result) => {
      if (err) {
        console.error('Database error (insert):', err);
        return res.status(500).json({ error: 'User could not be registered.' });
      }

      // result.insertId will be the new user id
      res.status(201).json({
        message: `User ${username} created successfully!`,
        user_id: result.insertId
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
