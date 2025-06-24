const express = require('express');
const cors = require('cors'); // Module non nécessaire pour l'instant
require('dotenv').config();

// Instanciation d'une d'application Express(Framework)
const app = express();

app.use(cors());
app.use(express.json()); // Permet de traiter des données au format json

//Importation de 4 modules de routes
const concertRoutes = require('./routes/concerts');
const utilisateurRoutes = require('./routes/utilisateurs');
const reservationRoutes = require('./routes/reservations');
const accompagnementRoutes = require('./routes/accompagnements');

app.use('/api/concerts', concertRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accompagnements', accompagnementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});