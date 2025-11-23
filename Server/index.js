import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import teamRoutes from './routes/teams.js';
import assignmentRoutes from './routes/assignments.js';

const app = express();
app.use(cors());
app.use(express.json());

await initDB();

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/assignments', assignmentRoutes);

app.listen(5000, () => 
  console.log('Server running on port 5000')
);
