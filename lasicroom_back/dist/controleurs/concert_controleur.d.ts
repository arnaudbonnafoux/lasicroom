import { Request, Response } from "express";
export declare const creerConcert: (req: Request, res: Response) => Promise<void>;
export declare const obtenirConcerts: (req: Request, res: Response) => Promise<void>;
export declare const obtenirConcertById: (req: Request, res: Response) => Promise<void>;
export declare const mettreAJourConcert: (req: Request, res: Response) => Promise<void>;
export declare const supprimerConcert: (req: Request, res: Response) => Promise<void>;
