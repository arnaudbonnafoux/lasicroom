import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            pagination?: {
                page: number;
                limit: number;
                offset: number;
            };
        }
    }
}
/**
 * Middleware de pagination réutilisable
 * Extrait et valide les paramètres de pagination depuis la query string
 * Ajoute les infos de pagination dans req.pagination
 */
declare const paginationMiddleware: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Utilitaire pour ajouter les headers de pagination à la réponse
 * À appeler après avoir le nombre total d'éléments
 */
declare const sendPaginatedResponse: (res: Response, data: any[], totalCount: number, pagination: {
    page: number;
    limit: number;
    offset: number;
}) => void;
export { paginationMiddleware, sendPaginatedResponse };
export default paginationMiddleware;
