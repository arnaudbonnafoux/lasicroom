import { Request, Response, NextFunction } from "express";
declare const compresserImage: (req: Request, res: Response, next: NextFunction) => void;
export default compresserImage;
