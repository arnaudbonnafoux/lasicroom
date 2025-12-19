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

## Architecture du flux de paiement

```
1. User → Ajouter au panier → Panier
2. User → Finaliser l'achat → Appel POST /api/stripe/create-payment-intent
3. Backend → Crée commande (statut='pending') → Retourne clientSecret
4. Frontend → Affiche formulaire Stripe (CardElement)
5. User → Saisit carte → Clique "Payer"
6. Frontend → stripe.confirmCardPayment() avec clientSecret
7. Stripe → Traite le paiement → Retourne paymentIntent
8. Frontend → Appel POST /api/stripe/confirm-payment avec paiement_id
9. Backend → Crée les réservations → UPDATE commande (statut='success')
10. Frontend → Redirect vers dashboard
```

---

## Fichiers modifiés

- **Backend** :
  - `controleurs/stripe_controleur.js` (nouveau)
  - `routes/stripe.js` (nouveau)
  - `app.js` (ajout route Stripe)
  - `controleurs/panier_controleur.js` (modification checkout)

- **Frontend** :
  - `contexts/StripeContext.js` (nouveau)
  - `composants/StripeFormulaire.js` (nouveau)
  - `styles/stripe_formulaire.css` (nouveau)
  - `App.js` (ajout providers Stripe)
  - `pages/panier.js` (intégration formulaire - À FAIRE)

- **Base de données** :
  - `migration_commande_stripe.sql` (À exécuter dans psql)

---

## Prochaines étapes

1. ✅ Créer compte Stripe
2. ✅ Récupérer clés API
3. ✅ Configurer `.env` backend et frontend
4. ✅ Installer Stripe CLI et configurer webhooks
5. ⏳ Modifier `pages/panier.js` pour afficher le formulaire Stripe
6. ⏳ Tester le flux complet
7. ⏳ Exécuter la migration SQL : `psql lasicroom2 < migration_commande_stripe.sql`

---

Questions ? Pose les moi ! 🚀
