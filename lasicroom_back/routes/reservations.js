const express = require('express');
const routeur = express.Router();
const reservationControleur = require('../controleurs/reservation_controleur');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); 

// Création de réservation accessible à tout utilisateur connecté (pas seulement admin)
routeur.post('/', authMiddleware, reservationControleur.creerReservation); //modif

// Les routes GET et DELETE restent protégées par admin, si tu souhaites que seules les admins puissent voir/supprimer toutes les réservations
routeur.get('/', authMiddleware, isAdmin, reservationControleur.obtenirReservations);
routeur.delete('/:id', authMiddleware, isAdmin, reservationControleur.supprimerReservation);


// Route pour le dashboard
routeur.get('/mine', authMiddleware, reservationControleur.getReservationsByUser);

module.exports = routeur;
