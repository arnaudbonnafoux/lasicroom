import express from "express";
import * as utilisateurControleur from "../controleurs/utilisateur_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";
import { validateInscription } from "../middlewares/validationMiddleware";

const routeur = express.Router();

// Routes publiques - inscription avec validation
routeur.post("/", validateInscription, utilisateurControleur.creerUtilisateur);

// Routes protégées (admin only)
routeur.get(
  "/",
  authMiddleware,
  isAdmin,
  utilisateurControleur.obtenirUtilisateur,
);
routeur.get("/:id", authMiddleware, utilisateurControleur.obtenirIdUtilisateur);

export default routeur;
