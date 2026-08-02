"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des modules
const express_1 = __importDefault(require("express")); // Framework web pour créer l'API
const path_1 = __importDefault(require("path")); // Module Node pour gérer les chemins de fichiers
const helmet_1 = __importDefault(require("helmet")); // Sécurité HTTP (headers)
const morgan_1 = __importDefault(require("morgan")); // Middleware pour logging des requêtes HTTP
const dotenv_1 = __importDefault(require("dotenv")); // Chargement des variables d'environnement depuis .env
// Chargement des variables d'environnement
dotenv_1.default.config();
// Importation des rate limiters
const rateLimitMiddleware_1 = require("./middlewares/rateLimitMiddleware");
// Importation des middlewares CSRF
const csrfMiddleware_1 = require("./middlewares/csrfMiddleware");
// Importation des routes de l'API
// Chaque route gère un type de ressource
const artistes_1 = __importDefault(require("./routes/artistes"));
const concerts_1 = __importDefault(require("./routes/concerts"));
const utilisateurs_1 = __importDefault(require("./routes/utilisateurs"));
const reservations_1 = __importDefault(require("./routes/reservations"));
const accompagnements_1 = __importDefault(require("./routes/accompagnements"));
const connexions_1 = __importDefault(require("./routes/connexions"));
const live_1 = __importDefault(require("./routes/live"));
const panier_1 = __importDefault(require("./routes/panier"));
const stripe_1 = __importDefault(require("./routes/stripe"));
// Instanciation de l'application Express
const app = (0, express_1.default)();
// Middleware généraux
app.use((0, morgan_1.default)("dev")); // Logs => lasicroom_back/back.log
app.use(express_1.default.json()); // Parser automatique du JSON dans le corps des requêtes POST/PUT
// 🔐 Middleware CSRF
app.use(csrfMiddleware_1.cookieMiddleware); // Parser les cookies (nécessaire pour CSRF)
app.use(csrfMiddleware_1.csrfProtectionSelective); // Protection CSRF sélective (exempts routes publiques)
app.use(csrfMiddleware_1.attachCsrfToken); // Attacher le token CSRF aux réponses
// Sécurité HTTP avec Helmet
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://js.stripe.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://api.stripe.com"],
            frameSrc: ["https://js.stripe.com"],
        },
    },
    hsts: true,
}));
// Dossier statique pour les photos d'artistes
app.use("/photos_artistes", express_1.default.static(path_1.default.join(__dirname, "photos_artistes"))); // __dirname => variable qui définit le chemin absolu du dossier
// 🚨 Appliquer les rate limiters
// Rate limiting général sur /api
app.use("/api/", rateLimitMiddleware_1.generalLimiter);
// Définition des préfixes d'URL pour chaque groupe de routes
app.use("/api/artistes", artistes_1.default);
app.use("/api/concerts", concerts_1.default);
app.use("/api/utilisateurs", utilisateurs_1.default);
app.use("/api/reservations", reservations_1.default);
app.use("/api/accompagnements", accompagnements_1.default);
app.use("/api/connexions", rateLimitMiddleware_1.loginLimiter, connexions_1.default); // ⚠️ Rate limiting strict sur login
app.use("/api/live", live_1.default);
app.use("/api/panier", panier_1.default);
app.use("/api/stripe", rateLimitMiddleware_1.stripeLimiter, stripe_1.default); // 💳 Rate limiting pour Stripe
// Configuration du port et de l'hôte
const PORT = parseInt(process.env.PORT || "3001", 10); // Port par défaut : 3001
const HOST = process.env.HOST || "0.0.0.0"; // Écoute toutes les interfaces réseau
// Démarrage du serveur
app.listen(PORT, HOST, () => {
    console.log(`http://localhost:${PORT}`); // Message console pour indiquer l'adresse du serveur
});
exports.default = app;
//# sourceMappingURL=app.js.map