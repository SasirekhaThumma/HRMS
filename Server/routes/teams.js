import express from 'express';
import { dbPromise } from '../db.js';
import { logAction } from '../logs.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = await dbPromise;
  const teams = await db.all('SELECT * FROM teams');
  res.json(teams);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const db = await dbPromise;
  const result = await db.run('INSERT INTO teams(name) VALUES(?)', [name]);
  await logAction(`Team ${name} created`);
  res.json({ id: result.lastID, name });
});

router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('UPDATE teams SET name=? WHERE id=?', [name,id]);
  await logAction(`Team ID ${id} updated`);
  res.json({ message: 'Updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('DELETE FROM teams WHERE id=?', [id]);
  await logAction(`Team ID ${id} deleted`);
  res.json({ message: 'Deleted' });
});

export default router;
