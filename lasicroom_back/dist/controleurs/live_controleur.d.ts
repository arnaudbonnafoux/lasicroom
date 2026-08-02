import { Request, Response } from "express";
export declare const obtenirLiveStatus: (req: Request, res: Response) => Promise<void>;
export declare const demarrerLive: (req: Request, res: Response) => Promise<void>;
export declare const arreterLive: (req: Request, res: Response) => Promise<void>;
