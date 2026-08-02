import { Request, Response, NextFunction } from "express";

// TODO: Migrer le pagination middleware

const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Stub: à implémenter
  next();
};

export default paginationMiddleware;
