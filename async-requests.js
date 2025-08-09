//db.js
// db.js
const mysql = require('mysql2/promise'); // promise-based MySQL client
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db'); // promise-based pool

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend API!' });
});

// register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password.' });

  if (username.trim().length < 8 || password.trim().length < 12)
    return res
      .status(400)
      .json({ error: 'Username must be at least 8 characters and password at least 12.' });

  try {
    const [existing] = await db.query(
      'SELECT user_id FROM users WHERE username = ?',
      [username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const [result] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );

    res.status(201).json({
      message: `User ${username} created successfully!`,
      user_id: result.insertId,
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'User could not be registered.' });
  }
});

// GET routines endpoint
app.get('/routines', async (req, res) => {
  const userId = parseInt(req.query.user_id, 10);

  if (!userId) {
    return res.status(400).json({ error: 'Missing or invalid user_id.' });
  }

  try {
    const sql = `
      SELECT routine_id, user_id, routine_name, routine_duration_minutes
      FROM routines
      WHERE user_id = ?
      ORDER BY routine_id ASC
    `;

    const [rows] = await db.promise().query(sql, [userId]);
    res.status(200).json({ routines: rows });
  } catch (err) {
    console.error('DB error (/routines):', err.message);
    res.status(500).json({ error: 'Database error.' });
  }
});

// GET /routine-player?routine_id=123
app.get('/routine-player', async (req, res) => {
  const { routine_id } = req.query;

  if (!routine_id || isNaN(Number(routine_id))) {
    return res.status(400).json({ error: 'Missing or invalid routine_id' });
  }

  try {
    const routineSql = `
      SELECT routine_id, user_id, routine_name, routine_duration_minutes, num_of_tasks
      FROM routines
      WHERE routine_id = ?
    `;
    const [routineRows] = await db.promise().query(routineSql, [routine_id]);

    if (routineRows.length === 0) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    const routine = routineRows[0];

    const stepsSql = `
      SELECT task_id, task_text, task_time, task_order
      FROM tasks
      WHERE routine_id = ?
      ORDER BY task_order ASC
    `;
    const [stepRows] = await db.promise().query(stepsSql, [routine_id]);

    return res.status(200).json({
      routine,
      steps: stepRows,
    });
  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

