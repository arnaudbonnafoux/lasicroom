-- =====================================
-- Migration : Création de la table PANIER
-- =====================================
-- Cette table stocke les articles du panier de chaque utilisateur
-- Un article = 1 concert + 1 tarif + quantité de billets

-- Supprimer la table si elle existe (optionnel, pour reset)
-- DROP TABLE IF EXISTS panier CASCADE;

-- Créer la table panier
CREATE TABLE IF NOT EXISTS panier (
    id_panier SERIAL PRIMARY KEY,
    id_utilisateur INTEGER NOT NULL REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    id_concert INTEGER NOT NULL REFERENCES concert(id_concert) ON DELETE CASCADE,
    type_tarif VARCHAR(20) NOT NULL CHECK (type_tarif IN ('plein', 'abonne')),
    quantite INTEGER NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Contrainte unique : un concert + tarif par utilisateur (pas de doublons)
    UNIQUE(id_utilisateur, id_concert, type_tarif)
);

-- Créer un index sur id_utilisateur pour les requêtes fréquentes
CREATE INDEX idx_panier_utilisateur ON panier(id_utilisateur);

-- Créer un index sur id_concert pour les requêtes de vérification de stock
CREATE INDEX idx_panier_concert ON panier(id_concert);

-- =====================================
-- Commentaires explicatifs
-- =====================================
/*
IMPORTANT : Contrainte UNIQUE(id_utilisateur, id_concert, type_tarif)
- Empêche l'utilisateur d'ajouter 2 fois le même concert avec le même tarif
- Si user1 ajoute Concert A plein tarif × 2 puis veut l'ajouter à nouveau :
  → UPDATE quantité = 4 (au lieu de créer un nouvel article)

Champs :
- id_panier : identifiant unique de l'article du panier
- id_utilisateur : FK vers l'utilisateur (suppression en cascade)
- id_concert : FK vers le concert (suppression en cascade)
- type_tarif : 'plein' ou 'abonne' (CHECK)
- quantite : nombre de billets (> 0)
- prix_unitaire : prix d'une place (copié du concert pour stabilité)
- date_ajout : timestamp de création pour suivi

Exemple :
User 1 ajoute Concert Rock (plein tarif) × 2 billets
→ INSERT panier (id_utilisateur=1, id_concert=5, type_tarif='plein', quantite=2, prix_unitaire=50.00)

Utilisateur augmente à 4 billets
→ UPDATE panier SET quantite=4 (pas nouvel article)
*/
