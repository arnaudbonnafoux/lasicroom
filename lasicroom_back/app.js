// import
const express = require('express');
const path = require('path');
require('dotenv').config();

// Instanciation de l'application Express
const app = express();

app.use(express.json()); // Pour traiter les requêtes JSON

// Dossier statique pour les photos
app.use('/photos_artistes', express.static(path.join(__dirname, 'photos_artistes')));

// Routes API
const artisteRoutes = require('./routes/artistes');
const concertRoutes = require('./routes/concerts');
const utilisateurRoutes = require('./routes/utilisateurs');
const reservationRoutes = require('./routes/reservations');
const accompagnementRoutes = require('./routes/accompagnements');
const connexionRoutes = require('./routes/connexions');

app.use('/api/artistes', artisteRoutes);
app.use('/api/concerts', concertRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accompagnements', accompagnementRoutes);
app.use('/api/connexions', connexionRoutes);

// Serveur lancé sur le port 3001
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('https://lasicroom.local/');
  console.log('https://ip_publique/');
});
// Protocole hhtps => certificat auto-signé