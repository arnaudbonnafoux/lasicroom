import express from "express";
import * as reservationControleur from "../controleurs/reservation_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Création de réservation (utilisateur connecté)
routeur.post("/", authMiddleware, reservationControleur.creerReservation);

// GET toutes les réservations (admin only)
routeur.get(
  "/",
  authMiddleware,
  isAdmin,
  reservationControleur.obtenirReservations,
);

// GET réservations de l'utilisateur connecté
routeur.get(
  "/mine",
  authMiddleware,
  reservationControleur.obtenirMesReservations,
);

// DELETE une réservation (admin only)
routeur.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  reservationControleur.supprimerReservation,
);

export default routeur;
