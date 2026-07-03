const express = require("express");
const routeur = express.Router();
const concertConnexion = require("../controleurs/connexion_controleur");
const { validateConnexion } = require("../middlewares/validationMiddleware");

// Route POST pour la connexion d'un utilisateur (authentification)
routeur.post("/", validateConnexion, concertConnexion.connecterUtilisateur);

module.exports = routeur;
