# 🔒 Sécurisation du projet LASICROOM

## 1. Sécurisation Backend (Express / Node.js)

### 📋 Détection de vulnérabilités

- ✅ **npm audit**: 0 vulnérabilités (Phase 1: Node.js 20 upgrade)
- Version Node.js: **20.20.2** (compatible react-router-dom 7.6.2)
- npm: **10.8.2**

### 🔐 Rate Limiting (Phase 2)

Middleware centralisé `rateLimitMiddleware.js` avec express-rate-limit:

- **API générale** (`/api/`): 100 requêtes / 15 minutes
- **Login** (`/api/connexions`): 5 requêtes / 15 minutes (protection brute force)
- **Stripe** (`/api/stripe`): 10 requêtes / 5 minutes
- **Formulaires** (`/api/...`): 3 requêtes / heure

Headers retournés: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

### 🛡️ CSRF Protection (Phase 3)

Middleware `csrfMiddleware.js` avec **csurf**:

- Tokens CSRF générés pour toutes les réponses
- Validation obligatoire sur `POST/PUT/DELETE`
- **Routes exemptées** (routes publiques sans authentification):
  - `/api/connexions` (login)
  - `/api/utilisateurs` (inscription)
  - `/api/panier/ajouter` (panier public)
- Le token est automatiquement attaché en header `X-CSRF-Token`
- Format: `application/x-www-form-urlencoded` ou `application/json` acceptés

Flux accompagnements:

- `GET /api/accompagnements/csrf-token` : route publique pour initialiser le cookie CSRF et récupérer `X-CSRF-Token`
- `POST /api/accompagnements` : route publique de soumission, CSRF obligatoire
- `GET /api/accompagnements` et `DELETE /api/accompagnements/:id` : routes admin (JWT requis), CSRF obligatoire sur `DELETE`

### ✅ Validation robuste des entrées (Phase 4)

Middleware `validationMiddleware.js` avec **express-validator + password-validator**:

**Endpoints validés:**

- `/api/utilisateurs/inscription` (inscription)
  - Email: format valide, unique en base
  - Mot de passe: **12+ caractères**, minuscule, majuscule, chiffre, symbole
  - Confirmation: doit correspondre
- `/api/connexions` (login)
  - Email: format valide
  - Mot de passe: présent (validation simple)
- `/api/concerts` (création/modification concerts - admin)
  - Titre: non vide
  - Description: non vide
  - Date: format ISO valide, future
- `/api/reservations` (réservation)
  - ID concert: valide
  - Quantité: 1-100 tickets

**Paramètres standardisés:**

- Tous les champs texte utilisent `.escape()` pour prévenir XSS
- Les erreurs de validation retournent **HTTP 400** avec détails

* **Validation des entrées**
  - Toutes les données reçues (nom, email, texte libre, style musical, etc.) sont validées par des fonctions de validation.
  - Regex et règles strictes pour limiter les caractères autorisés.
  - Blocage des caractères `<` et `>` dans les champs texte pour réduire les risques de XSS.

* **Requêtes SQL paramétrées**
  - Utilisation de placeholders (`$1, $2, ...`) dans toutes les requêtes PostgreSQL.
  - Protection contre les injections SQL.

* **Helmet (Phase 5)**

Helmet est un middleware pour Express.js (et frameworks similaires) qui ajoute automatiquement des en-têtes HTTP de sécurité aux réponses envoyées par ton serveur.

- Ajout automatique d'en-têtes HTTP de sécurité.
- Exemples : `X-DNS-Prefetch-Control`, `X-Content-Type-Options`, `Referrer-Policy`.
- Configuration: CSP intégrée avec directives strictes pour les ressources externes (Stripe, YouTube, Deezer)

referrer : Le terme referrer ou “referer”, désigne l’adresse de la page web d’où provient la requête.

- **Authentification JWT et sécurisation des routes REST**
  - Authentification basée sur **JSON Web Tokens (JWT)**.
  - Jetons stockés côté client dans **`sessionStorage`** (non persistants après fermeture du navigateur).
  - Risques XSS limités grâce à la validation stricte des entrées et la CSP côté Nginx.

- **Hachage des mots de passe (bcrypt)**
  - Les mots de passe sont **hachés avec bcrypt** avant insertion en base.

  [Table utilisateur](/La%20sicRoom.session.sql)
  - Vérification par `bcrypt.compare` lors de la connexion.

  [connexion_controleur.js](/lasicroom_back/controleurs/connexion_controleur.js)
  - Protection contre la fuite de mots de passe en clair.

### 📊 API Pagination (Phase 6)

Middleware `paginationMiddleware.js` pour les endpoints GET:

- **Paramètres de query**: `page=1` et `limit=20` (défaut)
- **Limites**: maximum 100 items par page, offset = (page-1) \* limit
- **Headers retournés**:
  - `X-Total-Count`: nombre total d'items
  - `X-Total-Pages`: nombre total de pages
  - `X-Current-Page`: page actuelle
  - `X-Page-Size`: taille de page
  - `Link`: RFC 5988 pour navigation (first, prev, next, last)
- Endpoints implémentés:
  - `GET /api/concerts?page=1&limit=20`
  - `GET /api/artistes?page=1&limit=20`
  - `GET /api/reservations?page=1&limit=20`

---

## 2. Sécurisation Frontend (React)

- **Protection contre les XSS**
  - Validation côté front avant envoi au backend.
  - Les champs sensibles (email, mot de passe, nom, style musical) passent par des regex.
  - Nettoyage des textes libres pour interdire les balises HTML `< >`.

  [validation.js](/lasicroom_front/src/utils/validation.js)

- **Utilisation de `sessionStorage` pour le JWT**
  - Moins persistant que `localStorage` → limite les risques d’exploitation.
  - Pas d’exposition via `document.cookie`.

- **Composant `PrivateRoute`**
  - Toutes les pages réservées aux utilisateurs connectés (ex. `/billetterie`, `/accueil_user`, `/dashboard`) sont encapsulées dans un composant `PrivateRoute`.
  - Ce composant vérifie la présence du JWT dans le `sessionStorage`.
  - En cas d’absence → redirection automatique vers `/connexion`.

* Phase 5

### 🔁 Redirection HTTPS

- Redirection forcée de HTTP vers HTTPS (port 80 → 443) avec code **301 Moved Permanently**
- Certificat SSL: **auto-signé RSA 2048**, valide jusqu'au **3 juillet 2027**
- Protocoles: **TLSv1.2, TLSv1.3**
- Ciphers: **ECDHE** (Forward Secrecy)
- **HTTP/2** activé pour performances
- ℹ️ Pour production avec domaine public: migrer vers Let's Encrypt (voir [HTTPS_DEPLOYMENT.md](./HTTPS_DEPLOYMENT.md))etItem('token');
  return token ? children : <Navigate to="/connexion" replace />;
  }

  export default PrivateRoute;

  ```

  ```

---

[App.js](../lasicroom_front/src/App.js)

## 3. Sécurisation Reverse Proxy (Nginx)

### 🔁 Redirection HTTPS

- Phase 5

* Politique stricte pour contrôler les sources de ressources :
  - `default-src 'self'` → uniquement depuis le serveur local.
  - `script-src 'self'` → aucun script externe autorisé.
  - `style-src 'self' 'unsafe-inline'` → uniquement styles internes.
  - `img-src 'self' data: https://api.stripe.com` → images locales + Stripe webhook images.
  - `frame-src https://js.stripe.com https://www.youtube.com https://open.spotify.com` → iframes Stripe, YouTube, Spotify
  - `connect-src 'self' https://api.stripe.com` → appels API Stripe autorisés
  - `object-src 'none'` → empêche les objets Flash/Java/ActiveX.
  - `form-action 'self'` → pas de soumission de formulaire externe.
  - `frame-ancestors 'none'` → bloque le clickjacking.
  - `base-uri 'self'` → limite les URLs de basees en base64.
  - `frame-src` → uniquement YouTube et Deezer.
  - `object-src 'none'` → empêche les objets Flash/Java/ActiveX.
  - `form-action 'self'` → pas de soumission de formulaire externe.
  - `frame-ancestors 'none'` → bloqu - Phase 5

| Header                           | Valeur                                   | Effet                          |
| -------------------------------- | ---------------------------------------- | ------------------------------ |
| **HSTS**                         | max-age=31536000                         | Force HTTPS pendant 1 an       |
| **X-Content-Type-Options**       | nosniff                                  | Prévention MIME sniffing       |
| **X-Frame-Options**              | DENY                                     | Prévention Clickjacking        |
| **X-XSS-Protection**             | 1; mode=block                            | Protection XSS navigateur      |
| **Referrer-Policy**              | strict-origin-when-cross-origin          | Confidentialité des références |
| **Permissions-Policy**           | geolocation=(), microphone=(), camera=() | Accès périphériques refusé     |
| **Cross-Origin-Opener-Policy**   | same-origin                              | Isolation de contexte          |
| **Cross-Origin-Resource-Policy** | same-origin                              | Protection partage ressources  |

### 🗂️ Caching HTTP (Phase 6)

Configuration Nginx pour optimiser le caching côté client:

- **Assets statiques** (`.js`, `.css`, `.woff2`): **31536000 sec** (1 an)
- **HTML**: **3600 sec** (1 heure) - pour force revalidation des mises à jour
- **Photos** (`/photos_artistes/`): **2592000 sec** (30 jours)
- Headers: `Cache-Control: public, max-age=...`, `ETag` pour validatione le clickjacking.

### 🔒 En-têtes de sécurité généraux

- `X-Content-Type-Options: nosniff` → empêche le mime-sniffing.
- `X-Frame-Options: DENY` → interdit l’intégration du site dans un `<iframe>`.
- `X-XSS-Protection: 1; mode=block` → protection contre XSS basiques.
- `Referrer-Policy: strict-origin-when-cross-origin` → limite les fuites d’URL dans les headers Referer.
- `Permissions-Policy` → désactive géolocalisation, micro, caméra.

### 📦 Proxy vers le backend

- L’API Node.js (port 3001) est accessible uniquement via `/api/` avec Nginx en frontal.
- Les images (`/photos_artistes/`) sont également servies via proxy.
- Le frontend React est servi statiquement via Nginx.

---

## 4. Journalisation et gestion des erreurs

- **Journalisation des requêtes (morgan)**
  - Middleware `morgan` intégré dans l’API Express.
  - Suivi des requêtes HTTP (méthode, chemin, statut, temps de réponse).
  - Exemple de log en console :

    ```
    GET /api/concerts 200 35.421 ms - 512
    POST /api/utilisateurs 201 58.233 ms - 245
    ```

- **Gestion centralisée des erreurs**
  - Chaque erreur serveur est interceptée avec un `try/catch`.
  - Les erreurs critiques sont affichées via `console.error` pour faciliter le débogage.
  - Exemple :

    ```js
    catch (erreur) {
      console.error("❌ Erreur dans creerConcert :", erreur);
      res.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
    }
    ```

- **Avantages :**
  - Aide au débogage en développement.
  - Base pour mettre en place une solution plus avancée (ex. logs persistants, monitoring).

---

## 5. Architecture sécurisée

- **Nginx (frontal)**
  - Gère HTTPS, headers de sécurité, CSP, et redirection.
  - Sert le frontend React.
  - Agit comme proxy sécurisé vers l’API Node.js.

- **Backend Node.js (API Express)**
  - Gère la logique métier et l’accès à la base de données.
  - Protège les entrées et évite les injections SQL.
  - Utilise Helmet + Morgan + bcrypt.

- **Base de données PostgreSQL**
  - Protégée par requêtes paramétrées.
  - Aucune requête construite dynamiquement avec des chaînes.

---

## ✅ Résumé global des protections

- **XSS :** filtrage des entrées côté back et front + CSP via Nginx.
- **Injection SQL :** requêtes paramétrées avec placeholders.
- **CSRF :** protection active via `csurf` + cookie + header `X-CSRF-Token`.
- **Clickjacking :** bloqué (CSP + `X-Frame-Options`).
- **HTTPS :** activé via SSL
- **Fuites de données :** limitées via `Referrer-Policy` et `Permissions-Policy`.
- **Mots de passe :** hachés avec `bcrypt`.
- **Journalisation :** `morgan` pour les requêtes HTTP + `console.error` pour les erreurs.
- **Architecture en couches :**
  - Nginx sécurise le trafic client.
  - Express sécurise la logique et la base.

---

## ⚠️ Limites actuelles et améliorations futures

### 📜 HSTS (HTTP Strict Transport Security)

- **Actuel :** activé (Helmet/Nginx).
- **Point d’attention :** vérifier régulièrement la validité du certificat TLS et la cohérence des directives HSTS en production.
- **Amélioration :** envisager le preload HSTS après validation complète du domaine et des sous-domaines.

### 🔐 Stockage du JWT

- **Actuel :** JWT stocké dans `sessionStorage`.
- **Limite :** vulnérable si un XSS parvient malgré tout à s’exécuter.
- **Amélioration :** stocker le JWT dans un **cookie sécurisé HttpOnly** (inaccessible en JavaScript), avec `SameSite=Strict`.

### 🔒 Protection CSRF

- **Actuel :** mécanisme explicite en place avec `csurf`.
- **Limite :** risque d’erreurs d’intégration front si le header `X-CSRF-Token` n’est pas envoyé sur les mutations.
- **Amélioration :** centraliser la récupération/envoi du token CSRF dans des utilitaires frontend communs pour éviter les régressions.

### 📊 Journalisation et monitoring

- **Actuel :** journalisation basique (morgan + console.error).
- **Amélioration :** mettre en place un système avancé :
  - logs persistants (fichiers ou base dédiée),
  - rotation des logs,
  - monitoring (ex. ELK Stack, Grafana),
  - alertes automatiques en cas de tentative d’attaque.

---

### 🛡️ Protection contre les scans et attaques automatisées (Fail2Ban)

- **Actuel :** aucune défense active contre les scans de ports ou les tentatives d’accès anormales sur Nginx (ex. bots envoyant du trafic SMB sur le port 80/443).
- **Limite :** même si les requêtes sont refusées, l’attaquant peut savoir l'existence dus erveur et continuer ses tests.
- **Amélioration :** mise en place de **Fail2Ban** pour analyser les logs Nginx et bloquer automatiquement les IP malveillantes :
  - Blocage des IP qui envoient du trafic invalide (ex. SMB sur HTTP).
  - Réduction de la charge serveur en empêchant les bots insistants.
  - Intégration avec UFW pour bannir directement les IP au niveau firewall.
  - Paramétrage personnalisable (ex. `maxretry=1`, `bantime=3600` pour 1h de blocage).

[geoip_log.sh](/geoip_log.sh)
