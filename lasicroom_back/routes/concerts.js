//Routes vérifiées
const express = require('express');
const routeur = express.Router();
const concertControleur = require('../controleurs/concert_controleur');

routeur.get('/', concertControleur.obtenirConcerts);
routeur.post('/', concertControleur.creerConcert);
routeur.put('/:id', concertControleur.mettreAJourConcert);
routeur.delete('/:id', concertControleur.supprimerConcert);

module.exports = routeur;

/* 
Test route get :
curl -X GET http://localhost:3001/api/concerts | jq

Test route post :
curl -X POST http://localhost:3001/api/concerts \
-H "Content-Type: application/json" \
-d '{
  "titre": "Concert Test2",
  "description": "Un concert test2",
  "date_concert": "2025-08-10T20:00:00.000Z",
  "nb_places_total": 100,
  "nb_places_restantes": 100,
  "tarif_plein": 25.00,
  "tarif_abonne": 15.00,
  "id_artiste": 4
}' | jq

Test route put : Attention de bien choisir l'id.
curl -X PUT http://localhost:3001/api/concerts/10 \
-H "Content-Type: application/json" \
-d '{
  "titre": "Concert Modifié avec artiste_4",
  "description": "Description mise à jour",
  "date_concert": "2025-07-11T20:30:00.000Z",
  "nb_places_total": 150,
  "nb_places_restantes": 130,
  "tarif_plein": 30.00,
  "tarif_abonne": 20.00,
  "id_artiste": 4
}' | jq

Test route delete :
curl -X DELETE http://localhost:3001/api/concerts/8 | jq
*/