const express = require('express');
const routeur = express.Router();
const reservationControleur = require('../controleurs/reservation_controleur');

routeur.get('/', reservationControleur.obtenirReservations);
routeur.post('/', reservationControleur.creerReservation);
routeur.delete('/:id', reservationControleur.supprimerReservation);

module.exports = routeur;

/*
Test route get :
curl -X GET http://localhost:3000/api/reservations | jq

Test route post :
curl -X POST http://localhost:3000/api/reservations \
-H "Content-Type: application/json" \
-d '{
  "date_reservation": "2025-07-01",
  "id_utilisateur": 4,
  "id_concert": 10,
  "type_tarif": "plein",
  "montant": 25.00
}' | jq

Test route delete
curl -X DELETE http://localhost:3000/api/reservations/4 | jq

*/