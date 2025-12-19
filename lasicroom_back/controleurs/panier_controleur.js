const baseDeDonnees = require('../db');

/**
 * 🛒 AJOUTER UN ARTICLE AU PANIER
 * POST /api/panier
 * Ajoute un concert au panier de l'utilisateur connecté
 * Si le concert existe déjà avec le même tarif → met à jour la quantité
 */
exports.ajouterAuPanier = async (req, res) => {
    const { id_concert, type_tarif, quantite } = req.body;
    const id_utilisateur = req.utilisateur.id;

    try {
        // Validation des paramètres
        if (!id_concert || !type_tarif || !quantite) {
            return res.status(400).json({ erreur: "Paramètres manquants" });
        }

        if (quantite <= 0) {
            return res.status(400).json({ erreur: "La quantité doit être > 0" });
        }

        if (!['plein', 'abonne'].includes(type_tarif)) {
            return res.status(400).json({ erreur: "Type de tarif invalide" });
        }

        // Vérifier que le concert existe et récupérer ses infos
        const resultConcert = await baseDeDonnees.query(
            `SELECT id_concert, titre, nb_places_restantes, tarif_plein, tarif_abonne 
             FROM concert WHERE id_concert = $1`,
            [id_concert]
        );

        if (resultConcert.rowCount === 0) {
            return res.status(404).json({ erreur: "Concert non trouvé" });
        }

        const concert = resultConcert.rows[0];

        // Vérifier qu'il y a assez de places disponibles
        if (concert.nb_places_restantes < quantite) {
            return res.status(409).json({ 
                erreur: `Pas assez de places. Places disponibles: ${concert.nb_places_restantes}` 
            });
        }

        // Récupérer le prix unitaire en fonction du tarif
        const prix_unitaire = type_tarif === 'plein' ? concert.tarif_plein : concert.tarif_abonne;

        // Vérifier si l'article existe déjà dans le panier (même concert + même tarif)
        const resultExistant = await baseDeDonnees.query(
            `SELECT id_panier, quantite FROM panier 
             WHERE id_utilisateur = $1 AND id_concert = $2 AND type_tarif = $3`,
            [id_utilisateur, id_concert, type_tarif]
        );

        let resultat;

        if (resultExistant.rowCount > 0) {
            // Article existe : mettre à jour la quantité
            const quantiteActuelle = resultExistant.rows[0].quantite;
            const nouvelleQuantite = quantiteActuelle + quantite;

            // Vérifier que la nouvelle quantité ne dépasse pas les places dispo
            if (nouvelleQuantite > concert.nb_places_restantes) {
                return res.status(409).json({
                    erreur: `Quantité totale trop élevée. Places restantes: ${concert.nb_places_restantes}`
                });
            }

            resultat = await baseDeDonnees.query(
                `UPDATE panier 
                 SET quantite = $1 
                 WHERE id_panier = $2 
                 RETURNING *`,
                [nouvelleQuantite, resultExistant.rows[0].id_panier]
            );
        } else {
            // Article n'existe pas : créer une nouvelle ligne
            resultat = await baseDeDonnees.query(
                `INSERT INTO panier (id_utilisateur, id_concert, type_tarif, quantite, prix_unitaire)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [id_utilisateur, id_concert, type_tarif, quantite, prix_unitaire]
            );
        }

        const article = resultat.rows[0];

        res.status(201).json({
            message: "Article ajouté au panier",
            article: {
                id_panier: article.id_panier,
                id_concert: article.id_concert,
                titre: concert.titre,
                type_tarif: article.type_tarif,
                quantite: article.quantite,
                prix_unitaire: article.prix_unitaire,
                sous_total: article.quantite * article.prix_unitaire
            }
        });

    } catch (erreur) {
        console.error("Erreur dans ajouterAuPanier :", erreur);
        res.status(500).json({ erreur: "Erreur lors de l'ajout au panier" });
    }
};

/**
 * 🛒 RÉCUPÉRER LE PANIER COMPLET
 * GET /api/panier
 * Retourne tous les articles du panier de l'utilisateur connecté
 */
exports.obtenirPanier = async (req, res) => {
    const id_utilisateur = req.utilisateur.id;

    try {
        const resultat = await baseDeDonnees.query(
            `SELECT 
                p.id_panier,
                p.id_concert,
                c.titre,
                c.date_concert,
                p.type_tarif,
                p.quantite,
                p.prix_unitaire,
                (p.quantite * p.prix_unitaire) as sous_total,
                c.nb_places_restantes
             FROM panier p
             JOIN concert c ON p.id_concert = c.id_concert
             WHERE p.id_utilisateur = $1
             ORDER BY p.date_ajout DESC`,
            [id_utilisateur]
        );

        // Calculer le total du panier
        const articles = resultat.rows;
        const total = articles.reduce((sum, article) => sum + parseFloat(article.sous_total), 0);

        res.json({
            nombre_articles: articles.length,
            total: parseFloat(total.toFixed(2)),
            articles: articles
        });

    } catch (erreur) {
        console.error("Erreur dans obtenirPanier :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la récupération du panier" });
    }
};

/**
 * 🛒 MODIFIER LA QUANTITÉ D'UN ARTICLE
 * PUT /api/panier/:id
 * Modifie la quantité de billets pour un article du panier
 */
exports.modifierQuantite = async (req, res) => {
    const { id } = req.params;
    const { quantite } = req.body;
    const id_utilisateur = req.utilisateur.id;

    try {
        if (!quantite) {
            return res.status(400).json({ erreur: "Quantité manquante" });
        }

        if (quantite <= 0) {
            return res.status(400).json({ erreur: "La quantité doit être > 0" });
        }

        // Vérifier que l'article appartient à l'utilisateur
        const resultArticle = await baseDeDonnees.query(
            `SELECT p.*, c.nb_places_restantes 
             FROM panier p
             JOIN concert c ON p.id_concert = c.id_concert
             WHERE p.id_panier = $1 AND p.id_utilisateur = $2`,
            [id, id_utilisateur]
        );

        if (resultArticle.rowCount === 0) {
            return res.status(404).json({ erreur: "Article du panier non trouvé" });
        }

        const article = resultArticle.rows[0];

        // Vérifier que la nouvelle quantité ne dépasse pas les places disponibles
        if (quantite > article.nb_places_restantes) {
            return res.status(409).json({
                erreur: `Pas assez de places. Places disponibles: ${article.nb_places_restantes}`
            });
        }

        // Mettre à jour la quantité
        const resultat = await baseDeDonnees.query(
            `UPDATE panier 
             SET quantite = $1 
             WHERE id_panier = $2 
             RETURNING *`,
            [quantite, id]
        );

        const articleMaj = resultat.rows[0];

        res.json({
            message: "Quantité mise à jour",
            article: {
                id_panier: articleMaj.id_panier,
                quantite: articleMaj.quantite,
                sous_total: articleMaj.quantite * articleMaj.prix_unitaire
            }
        });

    } catch (erreur) {
        console.error("Erreur dans modifierQuantite :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la modification de la quantité" });
    }
};

/**
 * 🛒 SUPPRIMER UN ARTICLE DU PANIER
 * DELETE /api/panier/:id
 * Supprime un article du panier de l'utilisateur
 */
exports.supprimerArticle = async (req, res) => {
    const { id } = req.params;
    const id_utilisateur = req.utilisateur.id;

    try {
        // Vérifier que l'article appartient à l'utilisateur
        const resultArticle = await baseDeDonnees.query(
            `SELECT id_panier FROM panier 
             WHERE id_panier = $1 AND id_utilisateur = $2`,
            [id, id_utilisateur]
        );

        if (resultArticle.rowCount === 0) {
            return res.status(404).json({ erreur: "Article du panier non trouvé" });
        }

        // Supprimer l'article
        await baseDeDonnees.query(
            `DELETE FROM panier WHERE id_panier = $1`,
            [id]
        );

        res.json({ message: "Article supprimé du panier" });

    } catch (erreur) {
        console.error("Erreur dans supprimerArticle :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la suppression de l'article" });
    }
};

/**
 * 💳 CHECKOUT : VALIDER LE PANIER ET CRÉER LES RÉSERVATIONS
 * POST /api/panier/checkout
 * ⚠️ NE CRÉE PLUS LES RÉSERVATIONS DIRECTEMENT
 * Crée une commande Stripe à la place (workflow: Panier → Commande → Paiement Stripe → Réservations)
 */
exports.checkout = async (req, res) => {
    const id_utilisateur = req.utilisateur.id;

    try {
        // Récupérer le panier complet de l'utilisateur
        const resultPanier = await baseDeDonnees.query(
            `SELECT 
                p.id_panier,
                p.id_concert,
                p.type_tarif,
                p.quantite,
                p.prix_unitaire,
                c.titre,
                c.nb_places_restantes
             FROM panier p
             JOIN concert c ON p.id_concert = c.id_concert
             WHERE p.id_utilisateur = $1
             ORDER BY p.date_ajout`,
            [id_utilisateur]
        );

        if (resultPanier.rowCount === 0) {
            return res.status(400).json({ erreur: "Le panier est vide" });
        }

        const articles = resultPanier.rows;
        let montantTotal = 0;

        // Vérifier qu'il y a assez de places pour tous les articles
        for (const article of articles) {
            if (article.quantite > article.nb_places_restantes) {
                return res.status(409).json({
                    erreur: `Plus assez de places pour ${article.titre}. Places restantes: ${article.nb_places_restantes}`
                });
            }
            montantTotal += article.quantite * article.prix_unitaire;
        }

        // Retourner les infos pour que le frontend appelle l'API Stripe
        res.json({
            message: "Panier validé. Procédez au paiement.",
            montant_total: parseFloat(montantTotal.toFixed(2)),
            nombre_articles: articles.length,
            articles: articles.map(a => ({
                concert: a.titre,
                type_tarif: a.type_tarif,
                quantite: a.quantite,
                prix_unitaire: a.prix_unitaire
            }))
        });

    } catch (erreur) {
        console.error("Erreur dans checkout :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la validation du panier" });

    } finally {
        client.release();
    }
};

/**
 * 🗑️ VIDER LE PANIER
 * DELETE /api/panier
 * Supprime tous les articles du panier de l'utilisateur
 */
exports.viderPanier = async (req, res) => {
    const id_utilisateur = req.utilisateur.id;

    try {
        await baseDeDonnees.query(
            `DELETE FROM panier WHERE id_utilisateur = $1`,
            [id_utilisateur]
        );

        res.json({ message: "Panier vidé" });

    } catch (erreur) {
        console.error("Erreur dans viderPanier :", erreur);
        res.status(500).json({ erreur: "Erreur lors du vidage du panier" });
    }
};
