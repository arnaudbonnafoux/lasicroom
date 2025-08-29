const express = require('express');
const routeur = express.Router(); // Création d'un routeur Express
const accompagnementControleur = require('../controleurs/accompagnement_controleur');
const isAdmin = require('../middlewares/isAdmin'); // Import du middleware de vérification admin

// Route publique : permet à tout utilisateur de créer une demande d'accompagnement
routeur.post('/', accompagnementControleur.creerDemande);

// Routes protégées : accessibles uniquement aux administrateurs
routeur.get('/', isAdmin, accompagnementControleur.listerDemandes); // Liste toutes les demandes
routeur.delete('/:id', isAdmin, accompagnementControleur.supprimerDemande); // Supprime une demande par son id

module.exports = routeur; // Exporte le routeur pour l'utiliser dans l'application principale
