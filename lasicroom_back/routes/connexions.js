const express = require('express');
const routeur = express.Router();
const concertConnexion = require('../controleurs/connexion_controleur');

routeur.post('/', concertConnexion.connecterUtilisateur);

module.exports = routeur;

/* Test route post :
curl -X POST http://localhost:3001/api/connexions \
-H "Content-Type: application/json" \
-d '{
  "email": "jean.dupont@example.com",
  "mot_de_passe": "mdp123"
}' | jq
 Attention, l'utilisateur doit exister dans la base. 
*/