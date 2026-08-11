import express from "express";
import * as artisteControleur from "../controleurs/artiste_controleur";
import compresserImage from "../middlewares/compressionImage";
import upload from "../middlewares/multerConfig";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Route publique : tout le monde peut voir la liste des artistes
routeur.get("/", artisteControleur.obtenirArtiste);

// Routes sécurisées : seul admin peut créer, modifier ou supprimer
routeur.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("photo"),
  compresserImage,
  artisteControleur.creerArtiste,
);
routeur.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.single("photo"),
  compresserImage,
  artisteControleur.mettreAJourArtiste,
);
routeur.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  artisteControleur.supprimerArtiste,
);

export default routeur;
