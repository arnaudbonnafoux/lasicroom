const express = require('express');
const routeur = express.Router();
const utilisateurControleur = require('../controleurs/utilisateur_controleur');

routeur.get('/', utilisateurControleur.obtenirUtilisateur);
routeur.get('/:id', utilisateurControleur.obtenirIdUtilisateur);
routeur.post('/', utilisateurControleur.creerUtilisateur);
routeur.put('/:id', utilisateurControleur.modifierUtilisateur);
routeur.delete('/:id', utilisateurControleur.supprimerUtilisateur);

module.exports = routeur;

/*
Test route get :
curl -X GET http://localhost:3001/api/utilisateurs | jq

Test route get_id :
curl -X GET http://localhost:3001/api/utilisateurs/4 | jq

curl -X POST http://localhost:3001/api/utilisateurs \
  -H "Content-Type: application/json" \
  -d '{"nom": "Giom", "email": "giom.admin@gmail.com", "mot_de_passe": "147258", "role": "admin"}' | jq

Test route put :
curl -X PUT http://localhost:3001/api/utilisateurs/7 \
  -H "Content-Type: application/json" \
  -d '{"nom": "Nom Modifié", "email": "nouvel@email.com", "mot_de_passe": "newpass123", "role": "utilisateur"}' | jq

test route :
curl -s -X DELETE http://localhost:3001/api/utilisateurs/7 | jq
remplacer 7 par l'id souhaité.
*/
