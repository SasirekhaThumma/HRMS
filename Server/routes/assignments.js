import express from 'express';
import { dbPromise } from '../db.js';
import { logAction } from '../logs.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { employee_id, team_id } = req.body;
  const db = await dbPromise;
  await db.run('INSERT OR REPLACE INTO employee_team(employee_id,team_id) VALUES(?,?)', [employee_id, team_id]);
  await logAction(`Employee ${employee_id} assigned to team ${team_id}`);
  res.json({ message: 'Assigned' });
});

router.get('/', async (req, res) => {
  const db = await dbPromise;
  const assignments = await db.all(`
    SELECT e.id as employee_id, e.name as employee_name, t.id as team_id, t.name as team_name
    FROM employee_team et
    JOIN employees e ON e.id = et.employee_id
    JOIN teams t ON t.id = et.team_id
  `);
  res.json(assignments);
});

export default router;
