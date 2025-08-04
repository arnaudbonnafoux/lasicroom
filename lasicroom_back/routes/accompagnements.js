const express = require('express');
const routeur = express.Router();
const accompagnementControleur = require('../controleurs/accompagnement_controleur');
const isAdmin = require('../middlewares/isAdmin');

// Route publique
routeur.post('/', accompagnementControleur.creerDemande);

// Routes protégées
routeur.get('/', isAdmin, accompagnementControleur.listerDemandes);
routeur.delete('/:id', isAdmin, accompagnementControleur.supprimerDemande);

module.exports = routeur;
