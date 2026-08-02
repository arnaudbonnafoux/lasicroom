// Importation des modules
import express, { Express } from "express"; // Framework web pour créer l'API
import path from "path"; // Module Node pour gérer les chemins de fichiers
import helmet from "helmet"; // Sécurité HTTP (headers)
import morgan from "morgan"; // Middleware pour logging des requêtes HTTP
import dotenv from "dotenv"; // Chargement des variables d'environnement depuis .env

// Chargement des variables d'environnement
dotenv.config();

// Importation des rate limiters
import {
  generalLimiter,
  loginLimiter,
  stripeLimiter,
  formLimiter,
} from "./middlewares/rateLimitMiddleware";

// Importation des middlewares CSRF
import {
  cookieMiddleware,
  csrfProtectionSelective,
  attachCsrfToken,
} from "./middlewares/csrfMiddleware";

// Importation des routes de l'API
// Chaque route gère un type de ressource
import artisteRoutes from "./routes/artistes";
import concertRoutes from "./routes/concerts";
import utilisateurRoutes from "./routes/utilisateurs";
import reservationRoutes from "./routes/reservations";
import accompagnementRoutes from "./routes/accompagnements";
import connexionRoutes from "./routes/connexions";
import liveRoutes from "./routes/live";
import panierRoutes from "./routes/panier";
import stripeRoutes from "./routes/stripe";

// Instanciation de l'application Express
const app: Express = express();

// Middleware généraux
app.use(morgan("dev")); // Logs => lasicroom_back/back.log

app.use(express.json()); // Parser automatique du JSON dans le corps des requêtes POST/PUT

// 🔐 Middleware CSRF
app.use(cookieMiddleware); // Parser les cookies (nécessaire pour CSRF)
app.use(csrfProtectionSelective); // Protection CSRF sélective (exempts routes publiques)
app.use(attachCsrfToken); // Attacher le token CSRF aux réponses

// Sécurité HTTP avec Helmet
app.use(
  helmet({
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
  }),
);

// Dossier statique pour les photos d'artistes
app.use(
  "/photos_artistes",
  express.static(path.join(__dirname, "photos_artistes")),
); // __dirname => variable qui définit le chemin absolu du dossier

// 🚨 Appliquer les rate limiters
// Rate limiting général sur /api
app.use("/api/", generalLimiter);

// Définition des préfixes d'URL pour chaque groupe de routes
app.use("/api/artistes", artisteRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/accompagnements", accompagnementRoutes);
app.use("/api/connexions", loginLimiter, connexionRoutes); // ⚠️ Rate limiting strict sur login
app.use("/api/live", liveRoutes);
app.use("/api/panier", panierRoutes);
app.use("/api/stripe", stripeLimiter, stripeRoutes); // 💳 Rate limiting pour Stripe

// Configuration du port et de l'hôte
const PORT = parseInt(process.env.PORT || "3001", 10); // Port par défaut : 3001
const HOST = process.env.HOST || "0.0.0.0"; // Écoute toutes les interfaces réseau

// Démarrage du serveur
app.listen(PORT, HOST, () => {
  console.log(`http://localhost:${PORT}`); // Message console pour indiquer l'adresse du serveur
});

export default app;
