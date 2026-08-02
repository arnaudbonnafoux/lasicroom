import { Request, Response } from "express";
interface ReservationRequest extends Request {
    utilisateur?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare const creerReservation: (req: ReservationRequest, res: Response) => Promise<void>;
export declare const supprimerReservation: (req: Request, res: Response) => Promise<void>;
export declare const obtenirMesReservations: (req: ReservationRequest, res: Response) => Promise<void>;
export {};
