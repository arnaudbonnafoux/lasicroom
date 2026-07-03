const express = require("express");
const routeur = express.Router();
const concertControleur = require("../controleurs/concert_controleur");

// Import de tes deux middlewares :
const authMiddleware = require("../middlewares/authMiddleware"); // Verifie le token et definit req.utilisateur
const isAdmin = require("../middlewares/isAdmin"); // Verifie que req.utilisateur.role === 'admin'
const { paginationMiddleware } = require("../middlewares/paginationMiddleware"); // Pagination

// La route GET est publique : accessible a tout le monde (avec pagination)
routeur.get("/", paginationMiddleware, concertControleur.obtenirConcerts);

// Pour les routes qui modifient des donnees, on applique d'abord authMiddleware, puis isAdmin
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

module.exports = routeur;
