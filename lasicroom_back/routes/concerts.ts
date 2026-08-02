import express from "express";
import * as concertControleur from "../controleurs/concert_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Routes publiques
routeur.get("/", concertControleur.obtenirConcerts);
routeur.get("/:id", concertControleur.obtenirConcertById);

// Routes admin
routeur.post("/", authMiddleware, isAdmin, concertControleur.creerConcert);
routeur.put(
  "/:id",
  authMiddleware,
  isAdmin,
  concertControleur.mettreAJourConcert,
);
routeur.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  concertControleur.supprimerConcert,
);

export default routeur;
