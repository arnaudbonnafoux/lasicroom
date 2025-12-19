const express = require('express');
const routeur = express.Router();
const stripeControleur = require('../controleurs/stripe_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * 💳 ROUTES STRIPE
 */

// POST /api/stripe/create-payment-intent
// Créer une intent de paiement (avant affichage du formulaire Stripe)
routeur.post('/create-payment-intent', authMiddleware, stripeControleur.createPaymentIntent);

// POST /api/stripe/confirm-payment
// Confirmer le paiement (après succès du formulaire Stripe côté frontend)
routeur.post('/confirm-payment', authMiddleware, stripeControleur.confirmPayment);

// POST /api/stripe/webhook
// Webhook Stripe (sans authMiddleware, signature Stripe vérifiée à la place)
// ⚠️ IMPORTANT : Utiliser rawBody, pas le body parsé JSON standard
routeur.post('/webhook', express.raw({type: 'application/json'}), stripeControleur.handleWebhook);

module.exports = routeur;
