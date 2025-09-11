# 🎨 Frontend (React)

[Structure du frontend](./structure_frontend.md)

L’interface utilisateur a été conçue avec **Figma**.
Le graphisme se veut **sobre et minimaliste**, en cohérence avec l’identité des structures représentées (associations, S.M.A.C. de petite taille, etc.).

[Lien Figma](https://www.figma.com/design/21mbJ6Gl9JzeO94yXeLHBs/La-sicRoom?node-id=0-1&m=dev&t=rjSt70oPayWD6ntw-1)

Du point de vue **expérience utilisateur (UX)**, l’objectif est d’éviter toute complexité inutile.
Le site a été pensé pour être **simple d’utilisation**, afin de rester accessible à un public parfois éloigné du numérique, comme les séniors.

---

## ⚛️ React

Le frontend repose sur **React**, permettant de développer une **SPA** (Single Page Application) robuste et sécurisée.
Les principaux concepts fondamentaux y sont utilisés :

* **JSX**
* **Hooks** : `useState`, `useEffect`, `useNavigate`, etc.
* **Props**
* **Routing** avec `react-router-dom` (voir `App.js`)
* **Appels API** avec Axios et Fetch pour communiquer avec le backend
* Rendu dynamique via `.map()`
* Gestion du token via `sessionStorage()`
* Build React servi par **Nginx** : `lasicroom_front/build/index.html`

---

## 🎨 CSS

Aucun framework CSS externe n’a été retenu : le style est entièrement codé à la main.
Les techniques principales utilisées sont :

* **Flexbox**
* **Media Queries** (responsive design)
* **Pseudo-classes**
* **Transitions et animations** avec `@keyframes`

---

## ⚙️ App.js (Point d’entrée de l’application React)

Le fichier **`App.js`** est le **point central du frontend**.
Il définit la structure globale de la **SPA** et configure le système de navigation grâce à **`react-router-dom`**.

[app.js](../lasicroom_front/src/App.js)

### 📑 Rôle principal

1. **Imports et configuration**

   * Importation de React, `BrowserRouter`, `Routes` et `Route`.
   * Importation du fichier de style global (`App.css`).
   * Importation de toutes les pages (utilisateur, admin, authentification, cadre légal).

2. **Routing**

   * Chaque route correspond à une page de l’application.
   * `BrowserRouter` gère l’historique et la navigation sans rechargement complet.
   * `Routes` et `Route` définissent les correspondances **URL → composant**.

3. **Organisation des sections**

   * **Utilisateurs** : accueil, agenda, billetterie, accompagnement, options, tableau de bord.
   * **Authentification** : inscription, connexion utilisateurs, connexion admin.
   * **Admin** : gestion des concerts, réservations, accompagnements, artistes.
   * **Cadre légal** : mentions légales, conditions d’utilisation.

4. **Exportation**

   * Le composant principal `App` est exporté et rendu dans `index.js`.

### 🌐 Exemple de routes définies

* `/` → **Accueil**
* `/agenda` → **Agenda**
* `/billetterie` → **Billetterie**
* `/dashboard` → **Dashboard utilisateur**
* `/admin/concerts` → **Gestion des concerts (admin)**
* `/mentions_legales` → **Mentions légales**

---

## 📦 Dossier `build/` (préparation à la production)

Le dossier **`build/`** est généré automatiquement lors de l’exécution de :

```bash
npm run build
```

Il contient la version **optimisée et prête à déployer** de l’application, servie dans ce projet par **Nginx** via `lasicroom_front/build/index.html`.

### 🧰 Ce que fait le build

* **Minification** du JavaScript et du CSS.
* **Tree-shaking & bundle** : élimination du code mort, regroupement des modules.
* **Hashing des fichiers** (ex. `main.93a8505a.js`) pour un **cache long terme** côté navigateur.
* **Source maps** (`.map`) pour faciliter le débogage en production.
* **Inlining des variables d’environnement** (préfixées `REACT_APP_`).

### 📂 Contenu typique

```
build/
│── index.html                # Point d’entrée unique de la SPA
│── asset-manifest.json       # Référentiel des ressources générées
│── manifest.json             # Métadonnées PWA
│── robots.txt                # Directives SEO
│── favicon.ico, logo192.png, logo512.png
│── site.xml                  # Sitemap (si présent dans public/)
│── images/                   # Médias copiés depuis public/images (si utilisés)
└── static/
    ├── css/                  # CSS minifiés (+ .map)
    ├── js/                   # JS minifiés, hashés (+ .LICENSE.txt, .map)
    └── media/                # Images/polices optimisées
```

### 🔒 Bonnes pratiques de diffusion (Nginx)

* **Faire pointer toutes les routes** applicatives vers `index.html` (SPA fallback).
* **Mettre en cache agressivement** `static/*` (car hashés) et **peu** `index.html` (pour récupérer les nouvelles versions).

> Exemple (indicatif) :

```nginx
location / {
  try_files $uri /index.html;
}
location /static/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### ⚠️ À noter

* Le dossier `build/` **ne doit pas être modifié à la main** : il est régénéré à chaque `npm run build`.
* En développement (`npm start`), ce dossier **n’est pas utilisé** : le serveur de dev sert les fichiers en mémoire.
* Pour publier, **déployez** uniquement le contenu de `build/` sur votre serveur web.
