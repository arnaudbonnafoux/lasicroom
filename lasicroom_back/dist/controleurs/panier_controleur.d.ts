import { Request, Response } from "express";
export declare const ajouterAuPanier: (req: Request, res: Response) => Promise<void>;
export declare const viderPanier: (req: Request, res: Response) => Promise<void>;
export declare const obtenirPanier: (req: Request, res: Response) => Promise<void>;
