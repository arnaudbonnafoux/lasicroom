// Importation des modules
const express = require('express'); // Framework web principal
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Instanciation de l'application Express
const app = express();

app.use(morgan('dev')); // Logs => lasicroom_back/back.log

app.use(express.json()); // Parser le json dans les requêtes http

app.use(
  helmet({
    contentSecurityPolicy: false, // Activer plus tard si besoin
    hsts: false                  // Désactive HSTS car HTTPS pas en prod
  })
);

// Dossier statique pour les photos
app.use('/photos_artistes', express.static(path.join(__dirname, 'photos_artistes'))); // __dirname => variable qui définit le chenmin absolue du dossier

// Importation des modules de routes pour chaque ressource de l'API
const artisteRoutes = require('./routes/artistes');
const concertRoutes = require('./routes/concerts');
const utilisateurRoutes = require('./routes/utilisateurs');
const reservationRoutes = require('./routes/reservations');
const accompagnementRoutes = require('./routes/accompagnements');
const connexionRoutes = require('./routes/connexions');

// Définition des préfixes d'URL pour chaque groupe de routes
app.use('/api/artistes', artisteRoutes);
app.use('/api/concerts', concertRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accompagnements', accompagnementRoutes);
app.use('/api/connexions', connexionRoutes);

// Configuration du port et de l'hôte (par défaut : 3001 et 0.0.0.0)
const PORT = process.env.PORT || 3001; //.env non utilisée. 
const HOST = process.env.HOST || '0.0.0.0'; //. .env non utlisée

// Démarrage du serveur Express
app.listen(PORT, HOST, () => {
  console.log('http://localhost:3001'); // Le backend écoute Nginx en proxy à cette adresse : http://localhost:3001
});
