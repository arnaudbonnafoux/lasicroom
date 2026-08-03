-- =====================================
-- Migration : Ajouter colonne QUANTITE à la table RESERVATION
-- =====================================
-- Cette colonne stocke le nombre de billets pour chaque réservation
-- Par défaut : 1 billet (réservations existantes)
-- Peut être > 1 avec le nouveau système de panier

-- Ajouter la colonne si elle n'existe pas
ALTER TABLE reservation
ADD COLUMN IF NOT EXISTS quantite INTEGER DEFAULT 1 CHECK (quantite > 0);

-- =====================================
-- Commentaires
-- =====================================
/*
IMPORTANT : 
- Cette colonne stocke le nombre de billets réservés pour un concert
- Par défaut : 1 (garde la compatibilité avec les réservations existantes)
- Avec le panier : peut être 2, 3, 5, etc.

Exemple :
  réservation.id = 100
  réservation.id_concert = 5 (Concert Rock)
  réservation.quantite = 3 (3 billets pour ce concert)
  
Validation :
  - CHECK (quantite > 0) : impossible d'avoir 0 ou des négatifs
  - DEFAULT 1 : les anciennes réservations sans quantité = 1 billet
*/
