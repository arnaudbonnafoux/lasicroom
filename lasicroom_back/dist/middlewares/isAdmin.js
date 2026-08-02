"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware pour restreindre l'accès aux routes aux seuls administrateurs
const isAdmin = (req, res, next) => {
    // Récupère le token JWT depuis l'en-tête Authorization (format "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token manquant" });
        return;
    }
    try {
        // Vérifie et décode le token avec la clé secrète
        const utilisateur = jsonwebtoken_1.default.verify(token, process.env.CLE_SECRETE || "");
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
    }
    catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map