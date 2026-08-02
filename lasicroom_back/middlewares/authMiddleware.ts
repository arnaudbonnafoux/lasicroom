import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface pour typer les données du JWT
interface JWTPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extension de Request pour ajouter utilisateur
declare global {
  namespace Express {
    interface Request {
      utilisateur?: JWTPayload;
    }
  }
}

const CLE_SECRETE = process.env.CLE_SECRETE || "";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Récupère l'en-tête Authorization de la requête
  const authHeader = req.headers.authorization;

  // Vérifie que le header existe et commence par "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou invalide" });
    return;
  }

  // Récupère le token après "Bearer "
  const token = authHeader.split(" ")[1];
  try {
    // Vérifie et décode le token avec la clé secrète
    const decoded = jwt.verify(token, CLE_SECRETE) as JWTPayload;

    // Ajoute les infos du token décodé à la requête (ex : id, rôle)
    req.utilisateur = decoded;

    next(); // Passe au middleware ou contrôleur suivant
  } catch (err) {
    // Si le token est invalide ou expiré, renvoie une erreur 401
    res.status(401).json({ message: "Token invalide" });
  }
};

export default authMiddleware;
