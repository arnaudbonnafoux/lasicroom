import express from "express";
import * as accompagnementControleur from "../controleurs/accompagnement_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Routes publiques
routeur.get("/", accompagnementControleur.obtenirAccompagnements);

// Routes admin
routeur.post(
  "/",
  authMiddleware,
  isAdmin,
  accompagnementControleur.creerAccompagnement,
);
routeur.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  accompagnementControleur.supprimerAccompagnement,
);

export default routeur;
