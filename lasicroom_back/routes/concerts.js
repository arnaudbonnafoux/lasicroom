const express = require('express');
const routeur = express.Router();
const concertControleur = require('../controleurs/concert_controleur');

// Import de tes deux middlewares :
const authMiddleware = require('../middlewares/authMiddleware'); // Vérifie le token et définit req.utilisateur
const isAdmin = require('../middlewares/isAdmin');               // Vérifie que req.utilisateur.role === 'admin'

// La route GET est publique : accessible à tout le monde.
routeur.get('/', concertControleur.obtenirConcerts);

// Pour les routes qui modifient des données, on applique d'abord authMiddleware, puis isAdmin
routeur.post('/', authMiddleware, isAdmin, concertControleur.creerConcert);
routeur.put('/:id', authMiddleware, isAdmin, concertControleur.mettreAJourConcert);
routeur.delete('/:id', authMiddleware, isAdmin, concertControleur.supprimerConcert);

module.exports = routeur;
