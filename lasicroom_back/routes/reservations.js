const express = require('express');
const routeur = express.Router();
const reservationControleur = require('../controleurs/reservation_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

// Route publique
routeur.post('/', reservationControleur.creerReservation);

// Routes protégées
routeur.get('/', authMiddleware, reservationControleur.obtenirReservations);
routeur.delete('/:id', authMiddleware, reservationControleur.supprimerReservation);

module.exports = routeur;

/*const express = require('express');
const routeur = express.Router();
const reservationControleur = require('../controleurs/reservation_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

routeur.get('/', reservationControleur.obtenirReservations);
routeur.post('/', reservationControleur.creerReservation);
routeur.delete('/:id', reservationControleur.supprimerReservation);

// Routes sécurisées
routeur.post('/', authMiddleware, reservationControleur.creerReservation);
routeur.get('/', authMiddleware, reservationControleur.obtenirReservations);

module.exports = routeur;*/

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

test route get avec authentification token JWT
curl -X GET http://localhost:3001/api/reservations \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJ1dGlsaXNhdGV1ciIsImlhdCI6MTc1MTcyMzU4MiwiZXhwIjoxNzUxNzMwNzgyfQ.xcOdubWTtSsHPbAW55KplrGIRMXLhVHa9LV5AKhX5nI" | jq
  */