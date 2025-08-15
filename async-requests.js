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

const util = require('util');

// Promisify db.query so we can use await
const query = util.promisify(db.query).bind(db);

app.post('/add-routine', async (req, res) => {
  try {
    const { user_id, routine_name, routine_duration_minutes, steps } = req.body;

    // 1) VALIDATION

    // validate user_id
    if (!user_id || isNaN(Number(user_id)) || user_id <= 0) {
      return res.status(400).json({ error: 'Missing or invalid user_id.' });
    }

    // validate routine_name
    if (!routine_name || !routine_name.trim()) {
      return res.status(400).json({ error: 'routine_name is required' });
    }

    // validate routine_duration_minutes
    const mins = Number(routine_duration_minutes);
    if (!Number.isInteger(mins) || mins < 0 || mins > 1440) {
      return res.status(400).json({ error: 'routine_duration_minutes must be 0..1440' });
    }

    // validate steps
    if (!Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ error: 'steps must be a non-empty array' });
    }

    // 2) INSERT ROUTINE
    const insertRoutineSql = `
      INSERT INTO routines (user_id, routine_name, routine_duration_minutes, num_of_tasks)
      VALUES (?, ?, ?, ?)
    `;

    const routineResult = await query(insertRoutineSql, [
      Number(user_id),
      routine_name.trim(),
      mins,
      steps.length
    ]);

    const routine_id = routineResult.insertId;

    // 3) PREPARE STEP VALUES
    const values = steps.map((s, i) => {
      const text = String(s?.task_text || '').trim();
      const time = Number(s?.task_time);
      const orderRaw = s?.task_order ?? (i + 1);
      const order = Number(orderRaw);

      if (
        !text ||
        !Number.isInteger(time) || time < 1 || time > 1440 ||
        !Number.isInteger(order) || order < 1
      ) {
        return null;
      }
      return [routine_id, text, time, order];
    });

    if (values.includes(null)) {
      return res.status(400).json({ error: 'Invalid step data' });
    }

    // 4) INSERT STEPS
    const insertStepSql = `
      INSERT INTO tasks (routine_id, task_text, task_time, task_order)
      VALUES ?
    `;

    await query(insertStepSql, [values]);

    // 5) SUCCESS RESPONSE
    return res.status(201).json({
      message: 'Routine created',
      routine_id,
      steps_created: values.length
    });

  } catch (err) {
    console.error('Error creating routine:', err);
    return res.status(500).json({ error: 'Server error while creating routine' });
  }
});

// EditRoutine endpoint
// PUT /api/routines/:id
app.put('/api/routines/:id', async (req, res) => {
  try {
    const routineId = parseInt(req.params.id, 10);
    const { routine_name, routine_duration_minutes } = req.body || {};

    // Validate routine_id
    if (!Number.isInteger(routineId) || routineId <= 0) {
      return res.status(400).json({ error: 'Invalid routine id.' });
    }
    // Validate routine_name
    if (!routine_name || routine_name.trim() === '') {
      return res.status(400).json({ error: 'routine_name is required.' });
    }
    // Validate routine_duration_minutes
    const duration = Number(routine_duration_minutes);
    if (!Number.isInteger(duration) || duration < 0 || duration > 1440) {
      return res.status(400).json({
        error: 'routine_duration_minutes must be an integer between 0 and 1440.',
      });
    }

    // Update the routine
    const updateRoutineSql = `
      UPDATE routines
      SET routine_name = ?, routine_duration_minutes = ?
      WHERE routine_id = ?
    `;
    const [updateResult] = await db.query(updateRoutineSql, [
      routine_name.trim(),
      duration,
      routineId,
    ]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Routine not found.' });
    }

    // Fetch the updated routine
    const fetchUpdatedSql = `
      SELECT routine_id, user_id, routine_name, routine_duration_minutes, num_of_tasks
      FROM routines
      WHERE routine_id = ?
    `;
    const [rows] = await db.query(fetchUpdatedSql, [routineId]);

    return res.status(200).json({ routine: rows[0] });
  } catch (err) {
    console.error('Error updating routine:', err);
    return res.status(500).json({ error: 'Database error.' });
  }
});

// DELETE /routines/:id
app.delete('/routines/:id', async (req, res) => {
  try {
    const routineId = parseInt(req.params.id, 10);
    if (!Number.isInteger(routineId) || routineId <= 0) {
      return res.status(400).json({ error: 'Invalid routine id.' });
    }

    const [result] = await db.query(
      'DELETE FROM routines WHERE routine_id = ?',
      [routineId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Routine not found.' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting routine:', err);
    return res.status(500).json({ error: 'Database error.' });
  }
});





app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

