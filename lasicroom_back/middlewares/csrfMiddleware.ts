import cookieParser from "cookie-parser";
import csrf from "csurf";
import { Request, Response, NextFunction } from "express";

// Middleware pour parser les cookies
const cookieMiddleware = cookieParser();

// Middleware CSRF - utilise les cookies pour stocker les tokens
// Le token CSRF est nécessaire pour toutes les requêtes POST, PUT, DELETE
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS en production
    sameSite: "strict",
  },
});

// Routes publiques exemptées du CSRF (connexion, inscription, GET public)
const publicRoutes = [
  /^\/api\/connexions$/, // POST connexion
  /^\/api\/utilisateurs$/, // POST inscription
  /^\/api\/panier\/ajouter$/, // POST public pour ajouter au panier (user non-authentifié)
];

// Middleware pour appliquer CSRF sélectivement
// Exempts les routes publiques, applique CSRF aux autres
const csrfProtectionSelective = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.some((pattern) => pattern.test(req.path));

  // Si c'est une route publique ET une méthode safe (GET, HEAD, OPTIONS), skip CSRF
  if (isPublicRoute && ["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    next();
    return;
  }

  // Si c'est une route POST/PUT/DELETE publique, skip CSRF (pour connexion/inscription)
  // Elles sont protégées par rate limiting et validation d'input
  if (isPublicRoute && ["POST", "PUT", "DELETE"].includes(req.method)) {
    next();
    return;
  }

  // Pour toutes les autres routes (protégées), appliquer CSRF
  csrfProtection(req, res, next);
};

// Middleware pour attacher le token CSRF à la réponse (en headers)
// Les clients récupèrent ce token et le renvoient dans les requêtes POST/PUT/DELETE
const attachCsrfToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken();
    res.set("X-CSRF-Token", req.csrfToken());
  }
  next();
};

export {
  cookieMiddleware,
  csrfProtection,
  csrfProtectionSelective,
  attachCsrfToken,
};
