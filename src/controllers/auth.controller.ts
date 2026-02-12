import { Request, Response } from 'express';
import db from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middleware/auth.middleware';

interface User {
    id: number;
    username: string;
    password: string; // In production, hash this!
    role: 'admin' | 'user';
}


export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
        const user = stmt.get(username) as User | undefined;

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, token, user: { username: user.username, role: user.role } });
        } else {
            res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri" });
        }
    } catch (error: any) {
        console.error("Login xatosi:", error.message);
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

export const register = (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ success: false, message: "Ma'lumotlar to'liq emas" });
        return;
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
        const info = stmt.run(username, hashedPassword, 'user');

        res.status(201).json({ success: true, user: { username, role: 'user' } });
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.status(409).json({ success: false, message: "Bu foydalanuvchi allaqachon mavjud" });
        } else {
            console.error("Ro'yxatdan o'tish xatosi:", error.message);
            res.status(500).json({ success: false, message: "Server xatosi" });
        }
    }
};
