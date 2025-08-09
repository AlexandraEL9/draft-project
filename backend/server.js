// server.js
const express = require('express');
const cors = require('cors');
//const router = express.Router();
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

//fetch routines for a user
app.get('/routines', (req, res) => {
  const userId = parseInt(req.query.user_id, 10);

  if (!userId) {
    return res.status(400).json({ error: 'Missing or invalid user_id.' });
  }

  const sql = `
    SELECT routine_id, user_id, routine_name, routine_duration_minutes
    FROM routines
    WHERE user_id = ?
    ORDER BY routine_id ASC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error('DB error (/routines):', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }
    return res.status(200).json({ routines: rows });
  });
});

// GET /routine-player?routine_id=123
app.get('/routine-player', (req, res) => {
  const { routine_id } = req.query;

  // 1) Basic validation
  if (!routine_id || isNaN(Number(routine_id))) {
    return res.status(400).json({ error: 'Missing or invalid routine_id' });
  }

  // 2) Fetch routine
  const routineSql = `
    SELECT routine_id, user_id, routine_name, routine_duration_minutes, num_of_tasks
    FROM routines
    WHERE routine_id = ?
  `;
  db.query(routineSql, [routine_id], (err, routineRows) => {
    if (err) {
      console.error('DB error (routine):', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (routineRows.length === 0) {
      return res.status(404).json({ error: 'Routine not found' });
    }

    const routine = routineRows[0];

    // 3) Fetch steps for the routine (ordered)
    const stepsSql = `
      SELECT task_id, task_text, task_time, task_order
      FROM tasks
      WHERE routine_id = ?
      ORDER BY task_order ASC
    `;
    db.query(stepsSql, [routine_id], (err2, stepRows) => {
      if (err2) {
        console.error('DB error (steps):', err2);
        return res.status(500).json({ error: 'Database error' });
      }

      // 4) Success response
      return res.status(200).json({
        routine,
        steps: stepRows, // [{ task_id, task_text, task_time, task_order }, ...]
      });
    });
  });
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

