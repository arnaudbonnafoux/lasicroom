const express = require('express');
const routeur = express.Router();
const concertConnexion = require('../controleurs/connexion_controleur');

routeur.post('/', concertConnexion.connecterUtilisateur);

module.exports = routeur;
