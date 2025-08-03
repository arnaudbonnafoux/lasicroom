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


/*const express = require('express');
const routeur = express.Router();
const accompagnementControleur = require('../controleurs/accompagnement_controleur');

routeur.get('/', accompagnementControleur.listerDemandes);
routeur.post('/', accompagnementControleur.creerDemande);
routeur.delete('/:id', accompagnementControleur.supprimerDemande);

module.exports = routeur;*/

/*
Test route get :
curl -X GET http://localhost:3000/api/accompagnements | jq

Test route post :
curl -X POST http://localhost:3000/api/accompagnements \
-H "Content-Type: application/json" \
-d '{
  "nom_artiste": "Groupe Test",
  "email_artiste": "groupe@test.com",
  "style_musical": "Rock",
  "message": "Nous souhaitons être accompagnés."
}' | jq
*/