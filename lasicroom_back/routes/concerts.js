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
curl -X GET http://localhost:3000/api/concerts | jq

Test route post :
curl -X POST http://localhost:3000/api/concerts \
-H "Content-Type: application/json" \
-d '{
  "titre": "Concert Test",
  "description": "Un concert test",
  "date_concert": "2025-07-10T20:00:00.000Z",
  "nb_places_total": 100,
  "nb_places_restantes": 100,
  "lien_video": "https://youtu.be/example",
  "tarif_plein": 25.00,
  "tarif_abonne": 15.00
}' | jq

Test route put :
curl -X PUT http://localhost:3000/api/concerts/8 \
-H "Content-Type: application/json" \
-d '{
  "titre": "Concert Modifié",
  "description": "Description mise à jour",
  "date_concert": "2025-07-11T20:30:00.000Z",
  "nb_places_total": 150,
  "nb_places_restantes": 130,
  "lien_video": "https://youtu.be/updated",
  "tarif_plein": 30.00,
  "tarif_abonne": 20.00
}' | jq

Test route delete :
curl -X DELETE http://localhost:3000/api/concerts/8 | jq

*/