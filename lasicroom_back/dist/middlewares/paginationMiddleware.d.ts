import { Request, Response, NextFunction } from "express";
declare const paginationMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default paginationMiddleware;
