"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formLimiter = exports.stripeLimiter = exports.loginLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// 🚨 Rate Limiter général - Tous les endpoints
// 100 requêtes par 15 minutes par IP
const generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite 100 requêtes par fenêtre
    message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.",
    standardHeaders: true, // retourne les info de rate limit dans les headers `RateLimit-*`
    legacyHeaders: false, // désactiver les headers `X-RateLimit-*`
    skip: (req) => {
        // Ne pas limiter les requêtes GET (sauf si trop de traffic)
        return req.method === "GET";
    },
});
exports.generalLimiter = generalLimiter;
// 🔐 Rate Limiter strict pour les logins
// 5 tentatives par 15 minutes par IP
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives seulement
    message: "Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Ne compter que les requêtes échouées
});
exports.loginLimiter = loginLimiter;
// 💳 Rate Limiter pour Stripe (paiements)
// 10 requêtes par 5 minutes (prévenir fraude)
const stripeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10,
    message: "Trop de requêtes de paiement. Veuillez réessayer plus tard.",
    standardHeaders: true,
    legacyHeaders: false,
});
exports.stripeLimiter = stripeLimiter;
// 📝 Rate Limiter pour les formulaires (inscription, etc.)
// 3 par heure par IP
const formLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 3,
    message: "Trop de soumissions de formulaire. Veuillez réessayer plus tard.",
    standardHeaders: true,
    legacyHeaders: false,
});
exports.formLimiter = formLimiter;
//# sourceMappingURL=rateLimitMiddleware.js.map