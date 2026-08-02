import { Request, Response, NextFunction } from "express";

// TODO: Migrer la compression d'image

const compresserImage = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Stub: à implémenter
  next();
};

export default compresserImage;
