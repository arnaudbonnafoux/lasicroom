"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CLE_SECRETE = process.env.CLE_SECRETE || "";
const authMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, CLE_SECRETE);
        // Ajoute les infos du token décodé à la requête (ex : id, rôle)
        req.utilisateur = decoded;
        next(); // Passe au middleware ou contrôleur suivant
    }
    catch (err) {
        // Si le token est invalide ou expiré, renvoie une erreur 401
        res.status(401).json({ message: "Token invalide" });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map