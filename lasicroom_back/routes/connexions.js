const express = require('express');
const routeur = express.Router();
const concertConnexion = require('../controleurs/connexion_controleur');

// Route POST pour la connexion d'un utilisateur (authentification)
routeur.post('/', concertConnexion.connecterUtilisateur);

module.exports = routeur;
