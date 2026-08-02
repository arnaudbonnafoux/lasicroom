import { Request, Response } from "express";
interface StripeRequest extends Request {
    utilisateur?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare const creerSessionPaiement: (req: StripeRequest, res: Response) => Promise<void>;
export declare const handleStripeWebhook: (req: Request, res: Response) => Promise<void>;
export {};
