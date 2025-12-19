const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const baseDeDonnees = require('../db');
const envoyerEmailReservation = require('../email');

/**
 * 💳 CRÉER UNE INTENT DE PAIEMENT STRIPE
 * POST /api/stripe/create-payment-intent
 */
exports.createPaymentIntent = async (req, res) => {
    try {
        const { id } = req.utilisateur;
        const { montant_total, nombre_articles } = req.body;

        if (!montant_total || montant_total <= 0) {
            return res.status(400).json({ message: 'Montant invalide' });
        }

        // Créer la commande en attente de paiement
        const commandeQuery = `
            INSERT INTO commande (id_utilisateur, montant_total, paiement_statut, nombre_articles)
            VALUES ($1, $2, 'pending', $3)
            RETURNING id_commande, montant_total;
        `;
        const commandeResult = await baseDeDonnees.query(commandeQuery, [id, montant_total, nombre_articles]);
        const commande = commandeResult.rows[0];

        // Créer un Payment Intent chez Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(montant_total * 100), // Stripe utilise les centimes
            currency: 'eur',
            metadata: {
                id_commande: commande.id_commande,
                id_utilisateur: id,
                nombre_articles: nombre_articles
            }
        });

        // Mettre à jour la commande avec le paiement_id Stripe
        const updateQuery = `
            UPDATE commande 
            SET paiement_id = $1 
            WHERE id_commande = $2;
        `;
        await baseDeDonnees.query(updateQuery, [paymentIntent.id, commande.id_commande]);

        // Retourner le clientSecret pour le frontend
        res.json({
            clientSecret: paymentIntent.client_secret,
            id_commande: commande.id_commande,
            montant: commande.montant_total
        });
    } catch (err) {
        console.error('Erreur createPaymentIntent :', err);
        res.status(500).json({ message: 'Erreur lors de la création du paiement' });
    }
};

/**
 * ✅ CONFIRMER LE PAIEMENT (appelé après succès côté frontend)
 * POST /api/stripe/confirm-payment
 */
exports.confirmPayment = async (req, res) => {
    try {
        const { id } = req.utilisateur;
        const { paiement_id } = req.body;

        if (!paiement_id) {
            return res.status(400).json({ message: 'ID de paiement manquant' });
        }

        // Récupérer la commande
        const commandeQuery = `
            SELECT id_commande, montant_total, id_utilisateur 
            FROM commande 
            WHERE paiement_id = $1;
        `;
        const commandeResult = await baseDeDonnees.query(commandeQuery, [paiement_id]);
        
        if (commandeResult.rows.length === 0) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        const commande = commandeResult.rows[0];

        // Vérifier que c'est bien l'utilisateur de cette commande
        if (commande.id_utilisateur !== id) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        // Récupérer le Payment Intent auprès de Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paiement_id);

        if (paymentIntent.status === 'succeeded') {
            // Créer les réservations à partir du panier
            await creerReservationsDepuisPanier(id, commande.id_commande, commande.montant_total);

            // Mettre à jour la commande
            const updateQuery = `
                UPDATE commande 
                SET paiement_statut = 'success', date_paiement = NOW() 
                WHERE id_commande = $1;
            `;
            await baseDeDonnees.query(updateQuery, [commande.id_commande]);

            res.json({
                message: 'Paiement confirmé',
                id_commande: commande.id_commande
            });
        } else {
            // Marquer comme failed
            const updateQuery = `
                UPDATE commande 
                SET paiement_statut = 'failed' 
                WHERE id_commande = $1;
            `;
            await baseDeDonnees.query(updateQuery, [commande.id_commande]);

            res.status(400).json({ message: 'Paiement non confirmé par Stripe' });
        }
    } catch (err) {
        console.error('Erreur confirmPayment :', err);
        res.status(500).json({ message: 'Erreur lors de la confirmation du paiement' });
    }
};

/**
 * 🔄 CRÉER LES RÉSERVATIONS À PARTIR DU PANIER
 */
async function creerReservationsDepuisPanier(id_utilisateur, id_commande, montant_total) {
    try {
        // Récupérer tous les articles du panier
        const panierQuery = `
            SELECT id_panier, id_concert, type_tarif, quantite, prix_unitaire
            FROM panier
            WHERE id_utilisateur = $1;
        `;
        const panierResult = await baseDeDonnees.query(panierQuery, [id_utilisateur]);

        if (panierResult.rows.length === 0) {
            throw new Error('Panier vide');
        }

        // Récupérer l'info utilisateur (email, nom)
        const utilisateurQuery = `
            SELECT email, nom FROM utilisateur WHERE id_utilisateur = $1;
        `;
        const utilisateurResult = await baseDeDonnees.query(utilisateurQuery, [id_utilisateur]);
        const utilisateur = utilisateurResult.rows[0];

        // Créer une réservation pour chaque article du panier
        const reservations = [];
        for (const article of panierResult.rows) {
            const reservationQuery = `
                INSERT INTO reservation (id_utilisateur, id_concert, type_tarif, montant, quantite)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_reservation, id_concert;
            `;
            const resResult = await baseDeDonnees.query(reservationQuery, [
                id_utilisateur,
                article.id_concert,
                article.type_tarif,
                article.prix_unitaire * article.quantite,
                article.quantite
            ]);
            reservations.push(resResult.rows[0]);

            // Récupérer les infos du concert
            const concertQuery = `SELECT titre FROM concert WHERE id_concert = $1;`;
            const concertResult = await baseDeDonnees.query(concertQuery, [article.id_concert]);
            const concert = concertResult.rows[0];

            // Préparer les détails pour l'email
            const detailsEmail = {
                nom: utilisateur.nom,
                concert: concert.titre,
                places: article.quantite,
                tarif: article.type_tarif,
                prix: (article.prix_unitaire * article.quantite).toFixed(2),
                id_commande: id_commande
            };

            // Envoyer l'email de confirmation
            try {
                await envoyerEmailReservation(utilisateur.email, detailsEmail);
                console.log(`📧 Email de réservation envoyé à ${utilisateur.email}`);
            } catch (emailErr) {
                console.error(`⚠️ Erreur envoi email pour ${utilisateur.email} :`, emailErr.message);
                // Continuer même si l'email échoue
            }
        }

        // Vider le panier
        const viderQuery = `
            DELETE FROM panier 
            WHERE id_utilisateur = $1;
        `;
        await baseDeDonnees.query(viderQuery, [id_utilisateur]);

        console.log(`✅ Réservations créées pour commande ${id_commande}`);
    } catch (err) {
        console.error('Erreur lors de la création des réservations :', err);
        throw err;
    }
}

/**
 * 🪝 WEBHOOK STRIPE (pour gérer les paiements asynchrones)
 * POST /api/stripe/webhook
 */
exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody, // Buffer brut du body
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Erreur webhook signature :', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Traiter les événements de paiement
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const { id_commande, id_utilisateur } = paymentIntent.metadata;

        try {
            // Créer les réservations
            const commandeQuery = `
                SELECT montant_total FROM commande WHERE id_commande = $1;
            `;
            const commandeResult = await baseDeDonnees.query(commandeQuery, [id_commande]);
            const montant = commandeResult.rows[0].montant_total;

            await creerReservationsDepuisPanier(id_utilisateur, id_commande, montant);

            // Mettre à jour le statut
            const updateQuery = `
                UPDATE commande 
                SET paiement_statut = 'success', date_paiement = NOW() 
                WHERE id_commande = $1;
            `;
            await baseDeDonnees.query(updateQuery, [id_commande]);

            console.log(`✅ Webhook traité: Paiement réussi pour commande ${id_commande}`);
        } catch (err) {
            console.error('Erreur webhook processing :', err);
        }
    } else if (event.type === 'payment_intent.payment_failed') {
        const paymentIntent = event.data.object;
        const { id_commande } = paymentIntent.metadata;

        try {
            const updateQuery = `
                UPDATE commande 
                SET paiement_statut = 'failed' 
                WHERE id_commande = $1;
            `;
            await baseDeDonnees.query(updateQuery, [id_commande]);
            console.log(`❌ Paiement échoué pour commande ${id_commande}`);
        } catch (err) {
            console.error('Erreur webhook failed payment :', err);
        }
    }

    res.json({ received: true });
};
