const express = require('express');
const routeur = express.Router();
const artisteControleur = require('../controleurs/artiste_controleur');
const upload = require('../middlewares/multerConfig');

const authMiddleware = require('../middlewares/authMiddleware');  // vérifie token JWT
const isAdmin = require('../middlewares/isAdmin');                // vérifie rôle admin

// Route publique : tout le monde peut voir la liste des artistes
routeur.get('/', artisteControleur.obtenirArtiste);

// Routes sécurisées : seul admin peut créer, modifier ou supprimer
routeur.post('/', authMiddleware, isAdmin, upload.single('photo'), artisteControleur.creerArtiste);
routeur.put('/:id', authMiddleware, isAdmin, upload.single('photo'), artisteControleur.mettreAJourArtiste);
routeur.delete('/:id', authMiddleware, isAdmin, artisteControleur.supprimerArtiste);

module.exports = routeur;
