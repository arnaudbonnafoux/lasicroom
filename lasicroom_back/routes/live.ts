import express from "express";
import * as liveControleur from "../controleurs/live_controleur";
import authMiddleware from "../middlewares/authMiddleware";
import isAdmin from "../middlewares/isAdmin";

const routeur = express.Router();

// Routes publiques
routeur.get("/status", liveControleur.obtenirLiveStatus);

// Routes admin
routeur.post("/start", authMiddleware, isAdmin, liveControleur.demarrerLive);
routeur.post("/stop", authMiddleware, isAdmin, liveControleur.arreterLive);

export default routeur;
