import express from "express";
import * as liveControleur from "../controleurs/live_controleur";

const routeur = express.Router();

// Route GET racine pour obtenir le status du live
routeur.get("/", liveControleur.obtenirLiveStatus);

export default routeur;
