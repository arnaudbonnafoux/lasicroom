// Importation des modules
const express = require('express'); // Framework web pour créer l'API
const path = require('path'); // Module Node pour gérer les chemins de fichiers
const helmet = require('helmet'); // Sécurité HTTP (headers)
const morgan = require('morgan'); // Middleware pour logging des requêtes HTTP
require('dotenv').config(); // Chargement des variables d'environnement depuis .env

// Instanciation de l'application Express
const app = express();

// Middleware généraux
app.use(morgan('dev')); // Logs => lasicroom_back/back.log

app.use(express.json()); // Parser automatique du JSON dans le corps des requêtes POST/PUT


// Sécurité HTTP avec Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Activer plus tard si besoin
    hsts: false                  // Désactive HSTS car HTTPS pas en prod
  })
);

// Dossier statique pour les photos d'artistes
app.use('/photos_artistes', express.static(path.join(__dirname, 'photos_artistes'))); // __dirname => variable qui définit le chenmin absolue du dossier

// Importation des routes de l'API
// Chaque route gère un type de ressource
const artisteRoutes = require('./routes/artistes');
const concertRoutes = require('./routes/concerts');
const utilisateurRoutes = require('./routes/utilisateurs');
const reservationRoutes = require('./routes/reservations');
const accompagnementRoutes = require('./routes/accompagnements');
const connexionRoutes = require('./routes/connexions');
const liveRoutes = require('./routes/live');

// Définition des préfixes d'URL pour chaque groupe de routes
app.use('/api/artistes', artisteRoutes);
app.use('/api/concerts', concertRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accompagnements', accompagnementRoutes);
app.use('/api/connexions', connexionRoutes);
app.use('/api/live', liveRoutes);


// Configuration du port et de l'hôte
const PORT = process.env.PORT || 3001; // Port par défaut : 3001
const HOST = process.env.HOST || '0.0.0.0'; // Écoute toutes les interfaces réseau

// Démarrage du serveur
app.listen(PORT, HOST, () => {
  console.log('http://localhost:3001'); // Message console pour indiquer l'adresse du serveur
}); 
