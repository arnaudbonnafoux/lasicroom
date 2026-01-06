# Parcours utilisateur complet

## 1️⃣ **Première visite - Inscription**

### Accueil + Agenda

1. **Page d'accueil** → Découvrir les concerts
   - [https://lasicroom.local/agenda](https://lasicroom.local/agenda)
   - Voir tous les concerts programmés
   - Bouton "Réserver" pour chaque concert

2. **Clic "Réserver"** 
   - ✅ Si connecté → Ajoute au panier
   - ❌ Si pas connecté → Redirige vers inscription

3. **Page inscription** (si nécessaire)
   - [https://lasicroom.local/inscription](https://lasicroom.local/inscription)
   - Créer compte avec email + mot de passe
   - Redirection vers agenda après création

---

## 2️⃣ **Sélection concerts - Panier**

### Billetterie + Ajout au panier

1. **Page Billetterie** (Espace personnel)
   - [https://lasicroom.local/billetterie](https://lasicroom.local/billetterie)
   - Voir tous les concerts à réserver
   - Sélectionner tarif (Plein/Abonné)
   - Choisir quantité de places
   - ✅ Clic "Ajouter au panier" → Article ajouté

2. **Consulter le panier**
   - [https://lasicroom.local/panier](https://lasicroom.local/panier)
   - Voir tous les articles sélectionnés
   - Modifier quantités
   - Supprimer articles si besoin
   - **Total calculé automatiquement**

---

## 3️⃣ **Paiement - Stripe**

### Page de paiement sécurisée

1. **Clic "Passer la commande"**
   - Validation du panier (vérifier stock, prix)
   - Création `commande` en base de données
   - Affichage **Page de paiement dédiée**

2. **Formulaire de paiement** (`PaymentElement`)
   - [https://lasicroom.local/panier → modal paiement]
   - Affiche **toutes options disponibles**:
     - 💳 **Carte bancaire** (champs séparés)
     - 🔗 **Stripe Link** (email + paiement rapide)
     - 📱 **Portefeuilles numériques** (si configurés)
   - Design responsive + sécurisé

3. **Saisie du paiement**
   - User saisit ses informations
   - Stripe gère la sécurité (aucune donnée sensible ne passe par notre serveur)
   - Clic "Payer"

4. **Confirmation Stripe**
   - ✅ Paiement approuvé → Réservations créées automatiquement
   - ❌ Paiement refusé → Message d'erreur, possibilité de réessayer

---

## 4️⃣ **Confirmation - Réservations + Email**

### Après paiement réussi

1. **Réservations créées** (automatiquement pour chaque article du panier)
   - Une ligne `reservation` par concert acheté
   - Avec quantité, tarif, montant

2. **Email de confirmation** 📧
   - **Immédiatement après paiement**
   - Envoyé via Mailtrap
   - Contient:
     - 👤 Nom du client
     - 🎤 Titre du concert
     - 🎟️ Nombre de places
     - 💰 Tarif (Plein/Abonné)
     - 💵 Montant payé
     - 📋 Numéro de commande

3. **Panier vidé** 
   - Tous les articles supprimés
   - Prêt pour nouvelles réservations

---

## 5️⃣ **Dashboard - Réservations**

### Consultation des réservations confirmées

1. **Page Dashboard** (Espace personnel)
   - [https://lasicroom.local/dashboard](https://lasicroom.local/dashboard)
   - **Tableau complet des réservations**
   - Colonnes: Numéro, Concert, Date, Tarif, Quantité, Montant, Date réservation
   - Réservations les plus récentes en haut

2. **Vérification**
   - Voir tous les concerts réservés
   - Vérifier quantités et tarifs
   - Tracer montants payés

---

## 6️⃣ **Accueil utilisateur + Déconnexion**

1. **Page d'accueil personalisée**
   - [https://lasicroom.local/accueil_user](https://lasicroom.local/accueil_user)
   - Bienvenue user
   - Accès rapide aux fonctionnalités
   - Bouton **"Déconnexion"** (en haut à droite)

2. **Déconnexion**
   - Clic bouton → Token supprimé de sessionStorage
   - Redirection vers accueil public
   - Session fermée

---

## 🎬 **Live Streaming (Bonus)**

- **Intégration YouTube Data API v3**
- [Code Backend](../lasicroom_back/controleurs/live_controleur.js)
- Affiche les streams en direct
- [GoogleCloud Console](https://console.cloud.google.com/apis/api/youtube.googleapis.com/metrics?project=basic-formula-471511-r2)

---

## 📊 **Schéma workflow complet**

```
┌─────────────────────────────────────────────────────────────────┐
│                      ACCUEIL PUBLIC                             │
├─────────────────────────────────────────────────────────────────┤
│ [Page d'accueil] → [Voir agenda] → [Voir concerts]             │
│                                        ↓                         │
│                                    [Cliquer "Réserver"]          │
│                                        ↓                         │
│                        ┌───────────────┴────────────────┐        │
│                        ↓                                ↓        │
│                    Connecté?                      Pas connecté  │
│                        ↓                                ↓        │
│                        ✅                          [Inscription] │
│                        ↓                                ↓        │
└────────────────────────┼────────────────────────────────┼─────────┘
                         │                                │
                         ↓                                ↓
            ┌────────────────────────────────────────────────────┐
            │        ESPACE PERSONNEL - CONNECTÉ                │
            ├────────────────────────────────────────────────────┤
            │ [Billetterie] → Sélectionner concerts              │
            │               → Modifier quantités                 │
            │               → Ajouter au [PANIER]               │
            │                    ↓                               │
            │ [Panier]        → Voir articles                    │
            │                → Modifier/Supprimer               │
            │                → CLIC "Passer commande"            │
            │                    ↓                               │
            │ [Paiement]      → Affiche PaymentElement           │
            │                → Choix: Carte/Link/Wallet         │
            │                → Saisir paiement                  │
            │                → Clic "Payer"                      │
            │                    ↓                               │
            │            ┌──────────────┴────────────────┐       │
            │            ↓                               ↓       │
            │        ✅ Succès                      ❌ Échec     │
            │            ↓                               ↓       │
            │      [Email ✉️]                    [Erreur + Retry]
            │      [Réservations créées]                │        │
            │            ↓                               │        │
            │ [Dashboard] → Voir réservations          │        │
            │             → Tracer commandes ◄─────────┘        │
            │                    ↓                               │
            │        [Accueil user] → [Déconnexion]            │
            │                    ↓                               │
            └────────────────────┼───────────────────────────────┘
                                 ↓
                        ┌─────────────────────┐
                        │ ACCUEIL PUBLIC      │
                        │ (Reconnexion possible)
                        └─────────────────────┘
```

---

## 📚 **Ressources**

- [Page inscription](../lasicroom_front/src/pages/inscription.js)
- [Page billetterie](../lasicroom_front/src/pages/billetterie.js)
- [Page panier](../lasicroom_front/src/pages/panier.js)
- [Page paiement](../lasicroom_front/src/pages/paiementpage.js)
- [Page dashboard](../lasicroom_front/src/pages/dashboard.js)
- [PanierContext](../lasicroom_front/src/contexts/PanierContext.js)
- [StripeContext](../lasicroom_front/src/contexts/StripeContext.js)
- [Backend Stripe](../lasicroom_back/controleurs/stripe_controleur.js)
- [Mailtrap (emails)](https://mailtrap.io/inboxes/3967029/messages)

