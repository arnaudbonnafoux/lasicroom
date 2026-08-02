import express from "express";
import * as reservationControleur from "../controleurs/reservation_controleur";
import authMiddleware from "../middlewares/authMiddleware";

const routeur = express.Router();

// Routes protégées
routeur.post("/", authMiddleware, reservationControleur.creerReservation);
routeur.get(
  "/mes-reservations",
  authMiddleware,
  reservationControleur.obtenirMesReservations,
);
routeur.delete(
  "/:id",
  authMiddleware,
  reservationControleur.supprimerReservation,
);

export default routeur;
