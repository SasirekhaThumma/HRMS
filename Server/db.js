import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbPromise = open({
  filename: './hrms.db',
  driver: sqlite3.Database
});

export async function initDB() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employee_team (
      employee_id INTEGER,
      team_id INTEGER,
      PRIMARY KEY(employee_id, team_id),
      FOREIGN KEY(employee_id) REFERENCES employees(id),
      FOREIGN KEY(team_id) REFERENCES teams(id)
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
