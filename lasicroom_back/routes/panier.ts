import express from "express";
import * as panierControleur from "../controleurs/panier_controleur";

const routeur = express.Router();

// Routes publiques du panier
routeur.post("/ajouter", panierControleur.ajouterAuPanier);
routeur.get("/", panierControleur.obtenirPanier);
routeur.post("/vider", panierControleur.viderPanier);

export default routeur;
