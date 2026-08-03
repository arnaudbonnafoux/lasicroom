## 🛠️ Configuration Stripe - Setup Guide

Pour finaliser l'intégration Stripe, tu dois configurer les clés API.

### Étape 1: Créer un compte Stripe
1. Va sur https://dashboard.stripe.com
2. Inscris-toi ou connecte-toi
3. Tu entreras en mode test par défaut (parfait pour développement)

### Étape 2: Récupérer tes clés API
1. Va dans **Developers** (menu de gauche)
2. Clique sur **API keys**
3. Tu trouveras :
   - **Publishable key** : commence par `pk_test_` (mode test)
   - **Secret key** : commence par `sk_test_` (mode test) ⚠️ JAMAIS publier cette clé!

### Étape 3: Configurer les variables d'environnement

#### Backend (Node.js)
Crée ou modifie le fichier `.env` à la racine de `lasicroom_back/` :

```
STRIPE_SECRET_KEY=sk_test_XXX...
STRIPE_WEBHOOK_SECRET=whsec_test_XXX...
PORT=3001
```

⚠️ **IMPORTANT** : Le `STRIPE_WEBHOOK_SECRET` est différent ! Tu le trouveras dans :
- **Developers** → **Webhooks** → **Ajouter un endpoint**
- Pour développement local : utilise Stripe CLI (voir ci-dessous)

#### Frontend (React)
Crée un fichier `.env` à la racine de `lasicroom_front/` :

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXX...
```

### Étape 4: Webhook (Important!)

Stripe envoie des confirmations de paiement via webhook. Pour développement local :

1. **Installe Stripe CLI** : https://stripe.com/docs/stripe-cli
2. **Lance Stripe CLI** :
   ```bash
   stripe login  # La première fois
   stripe listen --forward-to localhost:3001/api/stripe/webhook
   ```
   Cette commande affichera : `whsec_test_...` → ajoute ça à ton `.env`
3. Stripe CLI redirige les webhooks Stripe vers ton serveur local

### Étape 5: Tester

1. **Redémarre ton backend** :
   ```bash
   npm start
   ```

2. **Redémarre ton frontend** :
   ```bash
   npm start
   ```

3. **Teste le workflow** :
   - Ajoute des concerts au panier
   - Clique "Finaliser l'achat"
   - Remplis le formulaire Stripe avec une **carte de test**

### 🧪 Cartes de test Stripe (Mode Test)

```
Succès : 4242 4242 4242 4242
Échec : 4000 0000 0000 0002
Any future date pour expiration
Any 3-digit number pour CVC
```

Source: https://stripe.com/docs/testing

### Mode Production (Plus tard!)

Quand tu veux passer en production :
1. Crée un compte Stripe Production
2. Récupère les clés `pk_live_...` et `sk_live_...`
3. Met à jour `.env` avec les clés live
4. ⚠️ Récupère le nouveau `STRIPE_WEBHOOK_SECRET` live

---

## Architecture du flux de paiement (Version finale)

```
1. User → Ajouter au panier → Table `panier`
2. User → Consulter panier → Page `/panier`
3. User → Cliquer "Passer la commande"
4. Backend → POST /api/stripe/create-payment-intent
   - Valide le panier
   - Crée commande (statut='pending')
   - Retourne clientSecret
5. Frontend → Affiche PaiementPage avec PaymentElement
   - Mode: 'payment'
   - Affiche toutes options (Carte, Stripe Link, etc.)
6. User → Saisit paiement (Carte / Link / etc.) → Clique "Payer"
7. Frontend → stripe.confirmPayment() avec PaymentElement
8. Stripe → Traite le paiement → Retourne paymentIntent
9. Frontend → Appel POST /api/stripe/confirm-payment
10. Backend → Crée N réservations (une par article du panier)
    - Envoie email de confirmation pour chaque réservation
    - UPDATE commande (statut='success')
    - Vide la table `panier`
11. Frontend → Redirect vers `/dashboard`
12. (Async) Webhook Stripe arrive pour confirmation ultérieure
```

---

## Fichiers modifiés / créés

### Backend
* ✅ `controleurs/stripe_controleur.js` (nouveau)
  - `createPaymentIntent()` - Crée commande + intent
  - `confirmPayment()` - Confirme paiement et crée réservations
  - `creerReservationsDepuisPanier()` - Crée réservations + envoie emails
  - `handleWebhook()` - Traite événements Stripe asynchrones

* ✅ `routes/stripe.js` (nouveau)
  - POST `/api/stripe/create-payment-intent`
  - POST `/api/stripe/confirm-payment`
  - POST `/api/stripe/webhook`

* ✅ `app.js` (modifié)
  - Import et configuration routes Stripe
  - Configuration Helmet CSP pour Stripe

* ✅ `controleurs/panier_controleur.js` (modifié)
  - `checkout()` valide maintenant SANS créer les réservations
  - Réservations créées après paiement confirmé

* ✅ `email.js` (existant, utilisé pour confirmations)
  - Envoie confirmation réservation via Mailtrap

### Frontend
* ✅ `pages/paiementpage.js` (nouveau)
  - Page dédiée avec wrapper Elements propre
  - Utilise PaymentElement (flexible, affiche toutes options)
  - Configuration appearance personnalisée

* ✅ `contexts/StripeContext.js` (existant, amélioré)
  - Gère état du paiement
  - Fonctions créerPaymentIntent() et confirmPayment()

* ✅ `styles/paiement_page.css` (nouveau)
  - Styling de la page de paiement
  - Layout responsive et mobile-friendly

* ✅ `pages/panier.js` (modifié)
  - Import PaiementPage au lieu de StripeFormulaire
  - Affichage conditionnel de PaiementPage
  - Handlers pour succès/annulation

* ✅ `App.js` (modifié)
  - Imports @stripe/stripe-js et @stripe/react-stripe-js
  - Création stripePromise
  - Wrapping avec Elements (sans options, cf. PaiementPage)

### Base de données
* ✅ `migration_panier.sql` - Table `panier`
* ✅ `migration_commande_stripe.sql` - Table `commande`
* ✅ `migration_quantite_reservation.sql` - Colonne `quantite` sur réservation

---

## Différences CardElement vs PaymentElement

| Aspect | CardElement | PaymentElement |
|--------|-------------|-----------------|
| Champs | Tous sur une ligne | Champs séparés, adaptatif |
| Options paiement | Carte uniquement | Carte + Link + Portefeuilles |
| Configuration | Basique | Riche (appearance, options) |
| Wrapper Elements | Global ou par page | Obligatoirement par page avec clientSecret |
| Cas d'usage | Simple, prototype | Production recommandé |

**→ Nous utilisons PaymentElement pour la production.**

---

## Prochaines étapes

1. ✅ Créer compte Stripe
2. ✅ Récupérer clés API
3. ✅ Configurer `.env` backend et frontend
4. ✅ Installer Stripe CLI et configurer webhooks
5. ✅ Implémenter flux complet (panier → paiement → réservations)
6. ✅ Tester avec cartes de test
7. ✅ Exécuter migrations SQL
8. ⏳ **Passer en production** : changer clés API (pk_live_ / sk_live_)

---

Questions ? Pose les moi ! 🚀
