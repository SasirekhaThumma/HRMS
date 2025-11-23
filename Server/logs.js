import { dbPromise } from './db.js';

export async function logAction(action) {
  const db = await dbPromise;
  await db.run('INSERT INTO logs(action) VALUES (?)', [action]);
}
