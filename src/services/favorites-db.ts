import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

export type Favorite = { id: number; name: string };

let database: Promise<SQLiteDatabase> | undefined;

/** Opens the database once and creates the table the first time. */
function getDatabase(): Promise<SQLiteDatabase> {
  database ??= openDatabaseAsync('pokedex.db')
    .then(async (db) => {
      // Milliseconds in created_at, so two favorites added in the same second keep their order.
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favorites (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
        );
      `);
      return db;
    })
    .catch((error: unknown) => {
      // Forget the failed attempt, so "Try again" opens the database again.
      database = undefined;
      throw error;
    });
  return database;
}

/** All favorites, newest first. */
export async function getFavorites(): Promise<Favorite[]> {
  const db = await getDatabase();
  return db.getAllAsync<Favorite>('SELECT id, name FROM favorites ORDER BY created_at DESC, id DESC');
}

export async function isFavorite(id: number): Promise<boolean> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ id: number }>('SELECT id FROM favorites WHERE id = ?', id);
  return row !== null;
}

export async function addFavorite(id: number, name: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('INSERT OR IGNORE INTO favorites (id, name) VALUES (?, ?)', id, name);
}

export async function removeFavorite(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM favorites WHERE id = ?', id);
}
