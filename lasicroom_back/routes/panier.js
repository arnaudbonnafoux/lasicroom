const express = require('express');
const router = express.Router();
const panierControleur = require('../controleurs/panier_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware d'authentification obligatoire pour tous les endpoints panier
router.use(authMiddleware);

/**
 * @route   POST /api/panier
 * @desc    Ajouter un article au panier
 * @access  Privé (authentifiés uniquement)
 * @body    { id_concert, type_tarif, quantite }
 */
router.post('/', panierControleur.ajouterAuPanier);

/**
 * @route   GET /api/panier
 * @desc    Récupérer le panier complet de l'utilisateur connecté
 * @access  Privé (authentifiés uniquement)
 */
router.get('/', panierControleur.obtenirPanier);

/**
 * @route   PUT /api/panier/:id
 * @desc    Modifier la quantité d'un article du panier
 * @access  Privé (authentifiés uniquement)
 * @body    { quantite }
 */
router.put('/:id', panierControleur.modifierQuantite);

/**
 * @route   DELETE /api/panier/:id
 * @desc    Supprimer un article du panier
 * @access  Privé (authentifiés uniquement)
 */
router.delete('/:id', panierControleur.supprimerArticle);

/**
 * @route   DELETE /api/panier
 * @desc    Vider complètement le panier
 * @access  Privé (authentifiés uniquement)
 */
router.delete('/', panierControleur.viderPanier);

/**
 * @route   POST /api/panier/checkout
 * @desc    Valider le panier et créer les réservations
 * @access  Privé (authentifiés uniquement)
 * @body    { paiement_id } (optionnel)
 */
router.post('/checkout', panierControleur.checkout);

module.exports = router;
