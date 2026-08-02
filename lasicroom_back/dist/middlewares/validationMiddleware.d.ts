import { Request, Response, NextFunction } from "express";
import PasswordValidator from "password-validator";
declare const passwordSchema: PasswordValidator;
declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
declare const validateInscription: (import("express-validator").ValidationChain | typeof handleValidationErrors)[];
declare const validateConnexion: (import("express-validator").ValidationChain | typeof handleValidationErrors)[];
declare const validateConcert: (import("express-validator").ValidationChain | typeof handleValidationErrors)[];
declare const validateReservation: (import("express-validator").ValidationChain | typeof handleValidationErrors)[];
export { validateInscription, validateConnexion, validateConcert, validateReservation, passwordSchema, handleValidationErrors, };
