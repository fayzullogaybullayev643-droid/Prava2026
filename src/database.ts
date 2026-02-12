import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

const db = new Database('database.sqlite', { verbose: console.log });

// Create Users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
    )
`);

// Seed default user
const stmt = db.prepare('SELECT count(*) as count FROM users');
const row = stmt.get() as { count: number };

if (row.count === 0) {
    try {
        const hashedPassword = bcrypt.hashSync('1234', 10);
        db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('user', hashedPassword, 'user');
        console.log("Default user created: user / 1234");
    } catch (err) {
        console.error("Error creating default user:", err);
    }
}

export default db;
