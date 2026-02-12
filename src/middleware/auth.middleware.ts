
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = process.env.JWT_SECRET || 'prava2026_super_secret_key_change_in_production';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (token == null) return res.sendStatus(401); // Agar token bo'lmasa

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Token noto'g'ri bo'lsa
        req.user = user;
        next();
    });
};
