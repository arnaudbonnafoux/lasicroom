# Présentation
# Description générale
# Technologie
# Paradigme de programmation
# Base de données
# Back-end et API RESTful
# Front-end
# Optimisation
# SEO
# Déploiement 
# Installation depuis Github


---

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

* **Authentification JWT**

  * Authentification basée sur **JSON Web Tokens (JWT)**.
  * Jetons stockés côté client dans **`sessionStorage`** (non persistants après fermeture du navigateur).
  * Risques XSS limités grâce à la validation stricte des entrées et la CSP côté Nginx.

* **Hachage des mots de passe (bcrypt)**

  * Les mots de passe sont **hachés avec bcrypt** avant insertion en base.
  * Vérification par `bcrypt.compare` lors de la connexion.
  * Protection contre la fuite de mots de passe en clair.

---

## 2. Sécurisation Frontend (React)

* **Protection contre les XSS**

  * Validation côté front avant envoi au backend.
  * Les champs sensibles (email, mot de passe, nom, style musical) passent par des regex.
  * Nettoyage des textes libres pour interdire les balises HTML `< >`.

* **Utilisation de `sessionStorage` pour le JWT**

  * Moins persistant que `localStorage` → limite les risques d’exploitation.
  * Pas d’exposition via `document.cookie`.

---

## 3. Sécurisation Reverse Proxy (Nginx)

### 🔁 Redirection HTTPS

* Redirection forcée de HTTP vers HTTPS (port 80 → 443).
* Certificat SSL **auto-signé** utilisé en développement et en production (sans domaine).

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
* **HTTPS :** activé via SSL (auto-signé).
* **Fuites de données :** limitées via `Referrer-Policy` et `Permissions-Policy`.
* **Mots de passe :** hachés avec `bcrypt`.
* **Journalisation :** `morgan` pour les requêtes HTTP + `console.error` pour les erreurs.
* **Architecture en couches :**

  * Nginx sécurise le trafic client.
  * Express sécurise la logique et la base.

---

## ⚠️ Limites actuelles et améliorations futures

### 🔑 Certificat SSL

* **Actuel :** certificat auto-signé (nécessite d’ignorer un avertissement navigateur).
* **Limite :** pas de confiance par défaut → pas adapté à un site public.
* **Amélioration :** utiliser un certificat valide (ex. Let's Encrypt) dès qu’un nom de domaine ou sous-domaine est disponible.

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

Parfait 👍 Je vais te préparer un **compte-rendu d’accessibilité** en Markdown, dans le même style que ta section sécurité. Tu pourras l’intégrer directement dans ta documentation technique.

---

# ♿ Accessibilité du projet LASICROOM

## 1. Objectifs

* Garantir que l’application soit utilisable par tous, y compris les personnes ayant des handicaps visuels, auditifs ou moteurs.
* Respecter les bonnes pratiques des **WCAG 2.1** (Web Content Accessibility Guidelines).
* Améliorer l’expérience utilisateur grâce à une navigation claire et cohérente.

---

## 2. Audit automatisé (axe DevTools – Firefox)

Un audit complet a été réalisé avec **axe DevTools**.
Les principaux problèmes identifiés étaient :

* **Contraste insuffisant** sur certains textes (ex. #e994a9 sur #f4f9ff).
* **Absence d’association explicite entre `label` et `input`**.
* **Champs de formulaire sans description explicite pour les lecteurs d’écran**.
* **Attributs ARIA manquants ou inutilisés**.

---

## 3. Corrections apportées

* **Contraste des couleurs**

  * Les couleurs de texte et de fond ont été corrigées pour atteindre un ratio minimal de **4.5:1** (WCAG AA).
  * Exemple : le texte en rose clair (#e994a9) a été assombri pour garantir un meilleur contraste.

* **Formulaires accessibles**

  * Chaque champ `<input>` est désormais lié à un `<label>` via l’attribut `htmlFor` (React).
  * Exemple :

    ```jsx
    <label htmlFor="email_artiste">Email :</label>
    <input type="email" id="email_artiste" name="email_artiste" ... />
    ```

* **Attributs ARIA**

  * Ajout de rôles et d’`aria-label` pour mieux décrire les boutons et zones interactives si nécessaire.
  * Exemple : bouton d’envoi de formulaire → `<button type="submit" aria-label="Envoyer le formulaire">`.

* **Navigation clavier**

  * Vérification que tous les éléments interactifs sont accessibles avec **Tab / Entrée / Espace**.
  * Ordre logique de tabulation respecté.

* **Alternatives textuelles**

  * Ajout d’attributs `alt` pertinents pour toutes les images décoratives et illustratives.
  * Les images purement décoratives reçoivent `alt=""`.

---

## 4. Tests manuels

* **Navigation clavier** : tous les formulaires et boutons sont utilisables sans souris.
* **Compatibilité lecteurs d’écran** : test effectué avec **Orca (Linux)** → les champs et boutons sont correctement annoncés.
* **Responsive design** : lisibilité vérifiée sur mobile et desktop.

---

## 5. Limites et améliorations futures

* **Tests utilisateurs réels** non effectués → prévoir une phase avec des retours de personnes en situation de handicap.
* **Audit continu** : chaque nouvelle fonctionnalité devra être auditée avec axe DevTools.
* **Compatibilité ARIA avancée** : certains composants (modals, menus dynamiques) pourraient être enrichis avec des rôles ARIA plus précis.

---

✅ **Conclusion** :
Le projet **LASICROOM** respecte désormais les critères principaux d’accessibilité (contraste, navigation clavier, ARIA basique, formulaires accessibles).
Des améliorations futures sont prévues pour atteindre un niveau encore plus conforme aux WCAG 2.1.

---

Veux-tu que je t’aide aussi à **intégrer un test d’accessibilité automatique** (par exemple avec `jest-axe` ou `axe-core` dans ton projet React) pour garder une vérification continue en plus de l’audit manuel ?
