// import
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Instanciation de l'application Express
const app = express();

// Configuration serveur
app.use(cors());
app.use(express.json()); // Pour traiter les requêtes JSON

// Routes API (bd)
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

// React 
app.use(express.static(path.join(__dirname, '../lasicroom_front/build')));

/* Fallback à définir
app.get('*', (requete, reponse) => {
  reponse.sendFile(path.join(__dirname, '../lasicroom_front/build', 'index.html'));
});*/

// Gérer uniquement les requêtes GET qui ne commencent PAS par /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../lasicroom_front/build', 'index.html'));
});

// Serveur lancé sur le port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
