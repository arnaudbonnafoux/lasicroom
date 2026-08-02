import express from "express";
import * as stripeControleur from "../controleurs/stripe_controleur";
import authMiddleware from "../middlewares/authMiddleware";

const routeur = express.Router();

// Routes Stripe (paiements)
routeur.post("/session", authMiddleware, stripeControleur.creerSessionPaiement);
routeur.post("/webhook", stripeControleur.handleStripeWebhook);

export default routeur;
