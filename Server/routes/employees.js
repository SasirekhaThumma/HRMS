import express from 'express';
import { dbPromise } from '../db.js';
import { logAction } from '../logs.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = await dbPromise;
  const employees = await db.all('SELECT * FROM employees');
  res.json(employees);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const db = await dbPromise;
  const result = await db.run('INSERT INTO employees(name,email) VALUES(?,?)', [name,email]);
  await logAction(`Employee ${name} created`);
  res.json({ id: result.lastID, name, email });
});

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('UPDATE employees SET name=?, email=? WHERE id=?', [name,email,id]);
  await logAction(`Employee ID ${id} updated`);
  res.json({ message: 'Updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('DELETE FROM employees WHERE id=?', [id]);
  await logAction(`Employee ID ${id} deleted`);
  res.json({ message: 'Deleted' });
});

export default router;
