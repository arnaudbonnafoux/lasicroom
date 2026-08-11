import rateLimit from "express-rate-limit";
import { Request } from "express";

// 🚨 Rate Limiter général - Tous les endpoints
// 100 requêtes par 15 minutes par IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite 100 requêtes par fenêtre
  message:
    "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.",
  standardHeaders: true, // retourne les info de rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // désactiver les headers `X-RateLimit-*`
  skip: (req: Request) => {
    // Ne pas limiter les requêtes GET (sauf si trop de traffic)
    return req.method === "GET";
  },
});

// 🔐 Rate Limiter strict pour les logins
// 5 tentatives par 15 minutes par IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives seulement
  message:
    "Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Ne compter que les requêtes échouées
});

// 💳 Rate Limiter pour Stripe (paiements)
// 10 requêtes par 5 minutes (prévenir fraude)
const stripeLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  message: "Trop de requêtes de paiement. Veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// 📝 Rate Limiter pour les formulaires (inscription, etc.)
// 3 par heure par IP
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3,
  message: "Trop de soumissions de formulaire. Veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

export { generalLimiter, loginLimiter, stripeLimiter, formLimiter };
