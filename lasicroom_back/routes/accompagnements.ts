import express from "express";
import * as accompagnementControleur from "../controleurs/accompagnement_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Route publique pour récupérer un token CSRF avant soumission du formulaire.
routeur.get("/csrf-token", (_req, res) => {
  res.json({ ok: true });
});

// Route publique (formulaire site)
routeur.post("/", accompagnementControleur.creerAccompagnement);

// Routes admin
routeur.get(
  "/",
  authMiddleware,
  isAdmin,
  accompagnementControleur.obtenirAccompagnements,
);
routeur.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  accompagnementControleur.supprimerAccompagnement,
);

export default routeur;
