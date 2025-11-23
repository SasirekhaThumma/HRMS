import express from 'express';
import bcrypt from 'bcrypt';
import { dbPromise } from '../db.js';
import { logAction } from '../logs.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await dbPromise;
  const user = await db.get('SELECT * FROM users WHERE username=?', [username]);
  if (user && await bcrypt.compare(password, user.password)) {
    await logAction(`User ${username} logged in`);
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const db = await dbPromise;
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.run('INSERT INTO users(username, password) VALUES(?, ?)', [username, hash]);
    await logAction(`User ${username} registered`);
    res.json({ message: 'User registered' });
  } catch(e) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

export default router;
