const express = require("express");
const routeur = express.Router();
const utilisateurControleur = require("../controleurs/utilisateur_controleur");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateInscription } = require("../middlewares/validationMiddleware");

// Routes sécurisées par le middleware
routeur.get("/", authMiddleware, utilisateurControleur.obtenirUtilisateur);
routeur.get("/:id", authMiddleware, utilisateurControleur.obtenirIdUtilisateur);

// Route publique pour inscription (avec validation)
routeur.post("/", validateInscription, utilisateurControleur.creerUtilisateur);

// Routes PUT/DELETE désactivées pour l'instant
// routeur.put('/:id', utilisateurControleur.modifierUtilisateur);
// routeur.delete('/:id', utilisateurControleur.supprimerUtilisateur);

module.exports = routeur;
