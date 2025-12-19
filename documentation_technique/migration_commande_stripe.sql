-- =====================================
-- Migration : Création de la table COMMANDE
-- =====================================
-- Cette table stocke les commandes et le statut des paiements Stripe
-- Une commande = 1 utilisateur + 1 paiement + N réservations

CREATE TABLE IF NOT EXISTS commande (
    id_commande SERIAL PRIMARY KEY,
    id_utilisateur INTEGER NOT NULL REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    montant_total DECIMAL(10, 2) NOT NULL,
    paiement_id VARCHAR(255) UNIQUE,
    paiement_statut VARCHAR(20) DEFAULT 'pending' CHECK (paiement_statut IN ('pending', 'success', 'failed', 'refunded')),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_paiement TIMESTAMP,
    nombre_articles INTEGER NOT NULL DEFAULT 0,
    notes TEXT
);

-- Créer des indices pour les requêtes fréquentes
CREATE INDEX idx_commande_utilisateur ON commande(id_utilisateur);
CREATE INDEX idx_commande_paiement_id ON commande(paiement_id);
CREATE INDEX idx_commande_statut ON commande(paiement_statut);
CREATE INDEX idx_commande_date ON commande(date_commande);

-- =====================================
-- Commentaires explicatifs
-- =====================================
/*
Champs :
- id_commande : identifiant unique de la commande
- id_utilisateur : FK vers l'utilisateur (suppression en cascade)
- montant_total : montant total du panier converti en commande
- paiement_id : token Stripe (ex: pi_1A2B3C4D5E6F) - UNIQUE car 1 paiement = 1 ID Stripe
- paiement_statut : statut du paiement (pending → success → réservations créées)
- date_commande : timestamp de création de la commande
- date_paiement : timestamp de confirmation du paiement Stripe
- nombre_articles : nombre de billets/articles pour traçabilité
- notes : notes optionnelles

Workflow :
1. User clique "Finaliser l'achat" → INSERT commande (statut='pending')
2. Frontend affiche formulaire Stripe → récupère paiement_id
3. Stripe confirme paiement → webhook reçu
4. Webhook UPDATE commande SET paiement_statut='success', date_paiement=NOW()
5. Backend crée les N réservations
6. Panier vidé

Exemple :
INSERT INTO commande (id_utilisateur, montant_total, paiement_id, paiement_statut, nombre_articles)
VALUES (42, 150.00, 'pi_1A2B3C4D5E6F', 'pending', 2);

UPDATE commande SET paiement_statut='success', date_paiement=NOW()
WHERE paiement_id='pi_1A2B3C4D5E6F';
*/
