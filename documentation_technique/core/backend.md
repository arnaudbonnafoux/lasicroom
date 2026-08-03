# Backend (Node.js / Express)

[Structure du backend](/lasicroom_back/structure_backend.md)

## 📌 Présentation

Le backend se compose d'une **API RESTful** conçue avec le framework **Express**, permettant la gestion des données entre la base de données et l'interface utilisateur.
La communication avec le frontend s'effectue via **Nginx**, configuré en proxy, ce qui empêche l’exposition directe du backend au public.

À chaque réservation, un email de confirmation est envoyé à la plateforme [Mailtrap](https://mailtrap.io/inboxes/3967029/messages) via le module interne [`email.js`](/lasicroom_back/email.js) situé à la racine du backend.

---

## 🛠 Middleware

Les middlewares sont des fonctions intermédiaires qui interceptent les requêtes HTTP entre le client et le serveur pour analyser, modifier ou compléter ces requêtes avant qu'elles atteignent la route finale (ou avant que la réponse soit renvoyée).

### Middlewares de sécurité (Production-Ready)

**Nouveaux en Phase 1-6:**

1. **rateLimitMiddleware.js** (Phase 2)
   - Limite le nombre de requêtes par période
   - Exports: `generalLimiter` (100/15min), `loginLimiter` (5/15min), `stripeLimiter` (10/5min), `formLimiter` (3/h)
   - Appliqué globalement sur `/api/` et routes sensibles

2. **csrfMiddleware.js** (Phase 3)
   - Protection CSRF avec tokens
   - `csrfProtectionSelective`: Exemption automatique des routes publiques
   - Routes exemptées: `/api/connexions`, `/api/utilisateurs`, `/api/panier/ajouter`
   - Token attaché en `X-CSRF-Token` dans les réponses
   - Validation obligatoire sur `POST/PUT/DELETE`

3. **validationMiddleware.js** (Phase 4)
   - Validation robuste des entrées avec express-validator
   - Password enforcement: 12+ chars, uppercase, lowercase, digit, symbol
   - Endpoints validés: inscription, login, concerts, reservations
   - `.escape()` sur les champs texte pour prévenir XSS

4. **paginationMiddleware.js** (Phase 6)
   - Centralise la pagination pour tous les endpoints GET
   - Défaut: `page=1`, `limit=20`, maximum 100 items
   - Headers retournés: `X-Total-Count`, `X-Total-Pages`, `X-Current-Page`, `X-Page-Size`, `Link`
   - RFC 5988 pour navigation hypermedia

### Middlewares historiques

**Maintenant gérés au niveau global:**

- **authMiddleware** : gère l’authentification des routes privées via JWT.
- **isAdmin** : contrôle les rôles des utilisateurs (_admin_ ou _utilisateur_).
- **compressionImage** : convertit et compresse les images au format WebP.
- **multerConfig** : permet le téléversement des images depuis l’interface admin.

---

## 📦 Modules externes

### Dépendances principales (Production-Ready)

**Runtime:**

- `express` (^5.1.0) : framework web et routage
- `pg` (^8.11.3) : PostgreSQL client avec queries paramétrées
- `jsonwebtoken` (^9.1.2) : authentification JWT (tokens 2h)
- `bcrypt` (^5.1.1) : hachage sécurisé des mots de passe
- `helmet` (^7.1.0) : headers de sécurité automatiques (CSP, HSTS, etc.)
- `morgan` (^1.10.0) : journalisation HTTP (back.log)
- `express-rate-limit` (^7.1.5) : limitation de requêtes par IP
- `csurf` (^1.11.0) : protection CSRF avec tokens
- `express-validator` (^7.0.0) : validation robuste des entrées
- `password-validator` (^5.3.0) : vérification complexité passwords
- `cookie-parser` (^1.4.6) : parsing des cookies HTTP
- `dotenv` (^16.3.1) : gestion variables d'environnement
- `nodemailer` (^6.9.7) : envoi emails (confirmations réservation)
- `multer` (^1.4.5) : upload fichiers (photos artistes)
- `sharp` (^0.33.1) : compression images → WebP
- `stripe` (^14.7.0) : intégration paiement Stripe

**Dev:**

- `react-scripts` (5.0.1) : build React

### Versions critiques

- **Node.js**: 20.20.2 (Phase 1 upgrade - requis pour react-router-dom 7.6.2)
- **npm**: 10.8.2
- **Audit**: 0 vulnérabilités

---

## ⚙️ app.js (Point d’entrée de l’application)

Le fichier **`app.js`** constitue le **cœur du backend**.
Il initialise l’application Express, configure les middlewares globaux, et charge les routes principales de l’API.

[app.js](/lasicroom_back/app.js)

### 📑 Contenu et rôle principal :

1. **Imports & configuration**
   - Chargement des modules nécessaires (`express`, `helmet`, `morgan`, `dotenv`, etc.).
   - Chargement des variables d’environnement via `.env`.

2. **Initialisation d’Express**
   - Création de l’instance de l’application.
   - Activation du parsing JSON pour recevoir et traiter les requêtes.
   - Sécurisation avec `helmet`.
   - Journalisation des requêtes via `morgan`.

3. **Gestion des fichiers statiques**
   - Mise à disposition des images des artistes via `/photos_artistes`.

4. **Déclaration des routes API**
   - `/api/artistes` → routes liées aux artistes
   - `/api/concerts` → routes liées aux concerts
   - `/api/utilisateurs` → gestion des utilisateurs
   - `/api/reservations` → gestion des réservations
   - `/api/accompagnements` → gestion des accompagnements
   - `/api/connexions` → authentification et connexions utilisateurs

5. **Démarrage du serveur**
   - Le serveur écoute par défaut sur **`http://localhost:3001`**.
   - Le port et l’hôte peuvent être personnalisés via les variables d’environnement `PORT` et `HOST`.

---

## 📄 back.log (Journalisation des requêtes)

Le backend utilise le module **Morgan** pour **journaliser toutes les requêtes HTTP** traitées par Express. Ces informations sont précieuses pour suivre le fonctionnement du serveur et diagnostiquer d’éventuelles erreurs.

### Format des logs

Le fichier [**`back.log`**](../lasicroom_back/back.log) contient, pour chaque requête :

- **Méthode HTTP** : `GET`, `POST`, `PUT`, `DELETE`, etc.
- **URL demandée** : le chemin de la requête, par exemple `/api/concerts`.
- **Code de réponse HTTP** : `200`, `400`, `429` (rate limit), `403` (CSRF), `500`, etc.
- **Temps de réponse** : durée en millisecondes pour traiter la requête.
- **Taille de la réponse** : en octets, si disponible.

### Format example

```
GET /api/concerts?page=1&limit=20 200 45.234 ms - 2456
POST /api/connexions 200 123.456 ms - 1234
POST /api/utilisateurs/inscription 429 1.234 ms - 98 (rate limited)
DELETE /api/concerts/5 403 2.100 ms - 45 (CSRF protection)
```

### Monitoring

- Vérifier les erreurs 5xx (serveur)
- Identifier les patterns de rate-limiting (429)
- Repérer les tentatives CSRF (403)
- Analyser les temps de réponse lents

```
GET /api/concerts 200 45.154 ms - 4749
GET /photos_artistes/the_rockers_1756037311848.webp 304 3.134 ms - -
```

### 🔹 Utilité

- **Surveillance du backend** : savoir quelles routes sont utilisées et comment le serveur y répond.
- **Analyse des performances** : identifier les requêtes longues ou lentes.
- **Debugging** : repérer les erreurs ou comportements inattendus côté serveur.

### 🔹 Remarques

- Le fichier `back.log` est généré par **Morgan** et peut être consulté ou filtré avec des outils comme `tail`, `grep` ou `less`.
- Bien que Nginx logue également toutes les requêtes, `back.log` fournit une vue **interne côté backend**, montrant exactement comment Express traite chaque requête.
- Pour l’instant, le fichier est suffisant pour surveiller le backend sans analyser les logs Nginx.
