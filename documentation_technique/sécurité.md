# 🔒 Sécurisation du projet LASICROOM

## 1. Sécurisation Backend (Express / Node.js)

* **Validation des entrées**

  * Toutes les données reçues (nom, email, texte libre, style musical, etc.) sont validées par des fonctions de validation.
  * Regex et règles strictes pour limiter les caractères autorisés.
  * Blocage des caractères `<` et `>` dans les champs texte pour réduire les risques de XSS.

* **Requêtes SQL paramétrées**

  * Utilisation de placeholders (`$1, $2, ...`) dans toutes les requêtes PostgreSQL.
  * Protection contre les injections SQL.

* **Helmet**

  * Ajout automatique d’en-têtes HTTP de sécurité.
  * Exemples : `X-DNS-Prefetch-Control`, `X-Content-Type-Options`, `Referrer-Policy`.

* **Authentification JWT et sécurisation des routes REST**

  * Authentification basée sur **JSON Web Tokens (JWT)**.
  * Jetons stockés côté client dans **`sessionStorage`** (non persistants après fermeture du navigateur).
  * Risques XSS limités grâce à la validation stricte des entrées et la CSP côté Nginx.

* **Hachage des mots de passe (bcrypt)**

  * Les mots de passe sont **hachés avec bcrypt** avant insertion en base.

  [Table utilisateur](/La%20sicRoom.session.sql)

  * Vérification par `bcrypt.compare` lors de la connexion.

  [connexion_controleur.js](/lasicroom_back/controleurs/connexion_controleur.js)

  * Protection contre la fuite de mots de passe en clair.

---

## 2. Sécurisation Frontend (React)

* **Protection contre les XSS**

  * Validation côté front avant envoi au backend.
  * Les champs sensibles (email, mot de passe, nom, style musical) passent par des regex.
  * Nettoyage des textes libres pour interdire les balises HTML `< >`.

  [validation.js](/lasicroom_front/src/utils/validation.js)

* **Utilisation de `sessionStorage` pour le JWT**

  * Moins persistant que `localStorage` → limite les risques d’exploitation.
  * Pas d’exposition via `document.cookie`.

* **Composant `PrivateRoute`**

  * Toutes les pages réservées aux utilisateurs connectés (ex. `/billetterie`, `/accueil_user`, `/dashboard`) sont encapsulées dans un composant `PrivateRoute`.
  * Ce composant vérifie la présence du JWT dans le `sessionStorage`.
  * En cas d’absence → redirection automatique vers `/connexion`.

  ```jsx
  import { Navigate } from 'react-router-dom';

  function PrivateRoute({ children }) {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/connexion" replace />;
  }

  export default PrivateRoute;
  ```
---

[App.js](../lasicroom_front/src/App.js)

## 3. Sécurisation Reverse Proxy (Nginx)

### 🔁 Redirection HTTPS

* Redirection forcée de HTTP vers HTTPS (port 80 → 443).
* Certificat SSL via Let's Encrypt

### 🔐 Content Security Policy (CSP)

* Politique stricte pour contrôler les sources de ressources :

  * `default-src 'self'` → uniquement depuis le serveur local.
  * `script-src 'self'` → aucun script externe autorisé.
  * `style-src 'self' 'unsafe-inline'` → uniquement styles internes.
  * `img-src 'self' data:` → images locales et encodées en base64.
  * `frame-src` → uniquement YouTube et Deezer.
  * `object-src 'none'` → empêche les objets Flash/Java/ActiveX.
  * `form-action 'self'` → pas de soumission de formulaire externe.
  * `frame-ancestors 'none'` → bloque le clickjacking.

### 🔒 En-têtes de sécurité généraux

* `X-Content-Type-Options: nosniff` → empêche le mime-sniffing.
* `X-Frame-Options: DENY` → interdit l’intégration du site dans un `<iframe>`.
* `X-XSS-Protection: 1; mode=block` → protection contre XSS basiques.
* `Referrer-Policy: strict-origin-when-cross-origin` → limite les fuites d’URL dans les headers Referer.
* `Permissions-Policy` → désactive géolocalisation, micro, caméra.

### 📦 Proxy vers le backend

* L’API Node.js (port 3001) est accessible uniquement via `/api/` avec Nginx en frontal.
* Les images (`/photos_artistes/`) sont également servies via proxy.
* Le frontend React est servi statiquement via Nginx.

---

## 4. Journalisation et gestion des erreurs

* **Journalisation des requêtes (morgan)**

  * Middleware `morgan` intégré dans l’API Express.
  * Suivi des requêtes HTTP (méthode, chemin, statut, temps de réponse).
  * Exemple de log en console :

    ```
    GET /api/concerts 200 35.421 ms - 512
    POST /api/utilisateurs 201 58.233 ms - 245
    ```

* **Gestion centralisée des erreurs**

  * Chaque erreur serveur est interceptée avec un `try/catch`.
  * Les erreurs critiques sont affichées via `console.error` pour faciliter le débogage.
  * Exemple :

    ```js
    catch (erreur) {
      console.error("❌ Erreur dans creerConcert :", erreur);
      res.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
    }
    ```

* **Avantages :**

  * Aide au débogage en développement.
  * Base pour mettre en place une solution plus avancée (ex. logs persistants, monitoring).

---

## 5. Architecture sécurisée

* **Nginx (frontal)**

  * Gère HTTPS, headers de sécurité, CSP, et redirection.
  * Sert le frontend React.
  * Agit comme proxy sécurisé vers l’API Node.js.

* **Backend Node.js (API Express)**

  * Gère la logique métier et l’accès à la base de données.
  * Protège les entrées et évite les injections SQL.
  * Utilise Helmet + Morgan + bcrypt.

* **Base de données PostgreSQL**

  * Protégée par requêtes paramétrées.
  * Aucune requête construite dynamiquement avec des chaînes.

---

## ✅ Résumé global des protections

* **XSS :** filtrage des entrées côté back et front + CSP via Nginx.
* **Injection SQL :** requêtes paramétrées avec placeholders.
* **CSRF :** réduit car API + JWT en sessionStorage.
* **Clickjacking :** bloqué (CSP + `X-Frame-Options`).
* **HTTPS :** activé via SSL
* **Fuites de données :** limitées via `Referrer-Policy` et `Permissions-Policy`.
* **Mots de passe :** hachés avec `bcrypt`.
* **Journalisation :** `morgan` pour les requêtes HTTP + `console.error` pour les erreurs.
* **Architecture en couches :**

  * Nginx sécurise le trafic client.
  * Express sécurise la logique et la base.

---

## ⚠️ Limites actuelles et améliorations futures


### 📜 HSTS (HTTP Strict Transport Security)

* **Actuel :** non activé.
* **Limite :** le navigateur peut encore tenter une connexion HTTP si l’utilisateur tape `http://`.
* **Amélioration :** activer HSTS (`Strict-Transport-Security`) en production avec certificat valide pour forcer HTTPS définitivement.

### 🔐 Stockage du JWT

* **Actuel :** JWT stocké dans `sessionStorage`.
* **Limite :** vulnérable si un XSS parvient malgré tout à s’exécuter.
* **Amélioration :** stocker le JWT dans un **cookie sécurisé HttpOnly** (inaccessible en JavaScript), avec `SameSite=Strict`.

### 🔒 Protection CSRF

* **Actuel :** dépend de l’architecture (API + JWT dans `sessionStorage`) → faible exposition.
* **Limite :** pas de mécanisme CSRF explicite.
* **Amélioration :** si JWT bascule en cookie HttpOnly, prévoir un **token CSRF** dédié pour sécuriser encore plus les requêtes sensibles.

### 📊 Journalisation et monitoring

* **Actuel :** journalisation basique (morgan + console.error).
* **Amélioration :** mettre en place un système avancé :

  * logs persistants (fichiers ou base dédiée),
  * rotation des logs,
  * monitoring (ex. ELK Stack, Grafana),
  * alertes automatiques en cas de tentative d’attaque.

---

### 🛡️ Protection contre les scans et attaques automatisées (Fail2Ban)

* **Actuel :** aucune défense active contre les scans de ports ou les tentatives d’accès anormales sur Nginx (ex. bots envoyant du trafic SMB sur le port 80/443).
* **Limite :** même si les requêtes sont refusées, l’attaquant peut savoir l'existence dus erveur et continuer ses tests.
* **Amélioration :** mise en place de **Fail2Ban** pour analyser les logs Nginx et bloquer automatiquement les IP malveillantes :

  * Blocage des IP qui envoient du trafic invalide (ex. SMB sur HTTP).
  * Réduction de la charge serveur en empêchant les bots insistants.
  * Intégration avec UFW pour bannir directement les IP au niveau firewall.
  * Paramétrage personnalisable (ex. `maxretry=1`, `bantime=3600` pour 1h de blocage).

[geoip_log.sh](/geoip_log.sh)
