import { Request, Response, NextFunction } from "express";
interface JWTPayload {
    id: number;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
declare global {
    namespace Express {
        interface Request {
            utilisateur?: JWTPayload;
        }
    }
}
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default authMiddleware;
