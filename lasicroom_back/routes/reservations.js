const express = require('express');
const routeur = express.Router();
const reservationControleur = require('../controleurs/reservation_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

// Route publique
routeur.post('/', reservationControleur.creerReservation);

// Routes protégées
routeur.get('/', authMiddleware, reservationControleur.obtenirReservations);
routeur.delete('/:id', authMiddleware, reservationControleur.supprimerReservation);

module.exports = routeur;
