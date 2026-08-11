import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      utilisateur?: JWTPayload;
    }
  }
}

// Middleware pour restreindre l'accès aux routes aux seuls administrateurs
const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Récupère le token JWT depuis l'en-tête Authorization (format "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token manquant" });
    return;
  }

  try {
    // Vérifie et décode le token avec la clé secrète
    const utilisateur = jwt.verify(
      token,
      process.env.CLE_SECRETE || "",
    ) as JWTPayload;

    // Vérifie que l'utilisateur a bien le rôle "admin"
    if (utilisateur.role !== "admin") {
      res
        .status(403)
        .json({ message: "Accès interdit : réservé aux administrateurs." });
      return;
    }

    // Ajoute l'utilisateur décodé à la requête (optionnel)
    // => permet aux contrôleurs ou middlewares suivants de ne pas redécoder le token à chaque fois.
    req.utilisateur = utilisateur;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export default isAdmin;
