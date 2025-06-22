const express = require('express');
const routeur = express.Router();
const concertControleur = require('../controleurs/concert_controleur');

// Route de test
routeur.get('/', concertControleur.obtenirConcerts);

routeur.post('/', concertControleur.creerConcert);

routeur.put('/:id', concertControleur.mettreAJourConcert);

routeur.delete('/:id', concertControleur.supprimerConcert);


module.exports = routeur;
