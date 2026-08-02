import express from "express";
import * as connexionControleur from "../controleurs/connexion_controleur";

const routeur = express.Router();

// Route de connexion (publique)
routeur.post("/", connexionControleur.connecterUtilisateur);

export default routeur;
