const express = require('express');
const routeur = express.Router();
const accompagnementControleur = require('../controleurs/accompagnement_controleur');

routeur.get('/', accompagnementControleur.listerDemandes);
routeur.post('/', accompagnementControleur.creerDemande);
routeur.put('/:id', accompagnementControleur.traiterDemande);

module.exports = routeur;
