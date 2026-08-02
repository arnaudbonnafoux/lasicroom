import { Request, Response, NextFunction } from "express";
declare const compresserImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default compresserImage;
