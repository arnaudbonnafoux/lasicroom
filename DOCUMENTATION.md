# Documentation technique – Projet "La sicRoom"

---

## 1. Présentation

Le projet consiste à développer une application web pour une salle de concert S.M.A.C., spécialisée dans les musiques actuelles : La sicRoom. Cette plateforme doit permettre de présenter la programmation musicale, vendre des billets en ligne, proposer un espace d’accompagnement pour les artistes, et rendre accessible du contenu multimédia (vidéos, live stream, ressources pédagogiques).
Le site s’adresse à plusieurs types d’utilisateurs : le grand public, les artistes locaux, et les administrateurs de la salle.

- C.F. Cahier des charges
- Maquette Figma
- Intégration de l’IA dans le workflow : rôle, apports et limites
- Accès local : [https://lasicroom.local/](https://lasicroom.local/)

---

## 2. Architecture générale

- Voir : `structure.txt` (organisation des dossiers et fichiers)
- Le plan de site est construit sur 3 espaces distincts :
                                  Espace libre pour découvir la salle et sa programmation.
                                  Espace personnel (la billeterie + page accueil + dashboard).
                                  Espace admin pour la gestion de la programmation de la salle. 

---

## 3. Technologies utilisées

- **Système** : Linux-GNU | Debien 12 
- **Serveur web** : Nginx  
- **Backend** : Node.js | Express  
- **Base de données** : PostgreSQL  
- **Frontend** : React (JSX)

---

## 4. Paradigmes de programmation

- **Programmation orientée objet (POO)**  
  Utilisée côté backend pour structurer les entités et la logique métier.

- **Programmation fonctionnelle**  
  Présente dans React : fonctions pures, hooks (`useState`, `useEffect`), composition de composants, etc.

- **Programmation événementielle (frontend)**  
  Le frontend réagit aux événements utilisateur (clics, soumissions de formulaires, navigation…).  
  Les appels API via `axios` ou `fetch` sont déclenchés dans ce contexte.  
  Bien qu'ils ne soient pas intrinsèquement événementiels, ils sont étroitement liés à ce paradigme lorsqu'ils sont utilisés en réponse à des événements.

- **Architecture MVC simplifiée**  
  - **Model** : gestion des données avec PostgreSQL  
  - **Controller** : logique métier avec Express  
  - **View** : interface utilisateur avec React (côté client)

---

## 5. Installation & Configuration

- Dépôt GitHub : [https://github.com/arnaudbonnafoux/projet_perso.git](https://github.com/arnaudbonnafoux/projet_perso.git)

---

## 6. Fonctionnalités principales *(en cours de développement)*

- **Réservation de billets en ligne**  
  → Connexion requise (sinon : inscription via formulaire)

- **Formulaire d’accompagnement**  
  → Accessible sans être connecté

- **Live Streaming via YouTube** *(fonctionnalité prévue)*

- Démo locale : [https://lasicroom.local/](https://lasicroom.local/)

---

## 7. Frontend (React)

- Interfaces utilisateur et administrateur
- Voir : `structure.txt` du frontend

### Technologies et concepts utilisés

- **React** :
  - JSX
  - Hooks : `useState`, `useEffect`, `useNavigate`, etc.
  - Props
  - `react-router-dom` (routing) – voir `App.js`
  - Axios & Fetch pour communiquer avec le backend
  - `.map()` pour le rendu dynamique
  - `sessionStorage()` pour stocker le token
  - Build React servi par Nginx : `lasicroom_front/build/index.html`

> React permet de créer ses propres balises HTML (composants), via des fonctions JS retournant du JSX (syntaxe proche du HTML).

- **CSS** :
  - Flexbox
  - Media Queries (responsive design)
  - Pseudo-classes
  - Transitions et animations (`@keyframes`)

---

## 8. Backend (Node.js / Express)

- Voir : `structure.txt` du backend
- Communication avec le frontend via Nginx en **proxy inversé**
- Le backend n'est **pas exposé publiquement**
- Voir : fichier de configuration Nginx

### Express : API RESTful (CRUD)

- Modules utilisés :
  - `pg` (connexion PostgreSQL)
  - `dotenv` (fichier `.env`)
  - `path` (gestion des chemins)
  - `bcrypt` (hashage de mot de passe)
  - `jsonwebtoken` (authentification par token)
  - `multer` (upload de fichiers)

- Dossier statique des photos artistes :  
  `lasicroom_back/photos_artistes` (servi par Nginx)

---

## 9. Sécurité, SEO, Optimisation & Accessibilité *(à faire)*

- Authentification renforcée
- Optimisation des performances (cache, minification…)
- Accessibilité (normes WCAG, navigation clavier, etc.)
- SEO (balises méta, titres, sitemap…)

---

## 10. Tests

- Tests manuels via **scripts Bash**
- Démonstrations fonctionnelles
- Tests automatisés avec **Jest** *(prévu)*

---

## 11. Déploiement & démonstration

- Déploiement local via **Nginx** (proxy inversé)
- **Certificat SSL** auto-signé (via OpenSSL)
- Hébergement local
- Démonstration disponible sur :  
  [https://IP/](https://IP/)

---

## 12. Annexes

- **Mentions légales** et **CGU** (conformité RGPD)
- **Licence** : fichier `LICENSE`  
  → Licence **Non-Commercial – ShareAlike**
- **Dépôt légal** : prévu à la **BNF**

---

## 13. À faire (roadmap)

- ✔️ Compression & optimisation des images
- ✔️ Sécurisation complète du backend
- ✔️ Accessibilité (normes, tests)
- ✔️ Référencement SEO (Google, balisage)
- ✔️ Intégration de Stripe pour les paiements
- ✔️ Mise en place du live streaming YouTube
- ✔️ Tests automatisés avec Jest
- ✔️ Rédaction complète de la documentation technique
- ✔️ Intégration de Sass et de Redux ?
- ✔️ Créer un espace personnel (menu, historique des réservaitons, ressources pédagogique) => créer un dashbord
- ✔️ Un envoi de mail pour confirmer une réservation.
- ✔️ Le bouton de connexion de l'admin à déplacer
- ✔️ Revoir le css et la responsivité pour les tableau côté admin.
- ✔️ Côté admin, insérer des modales pour les tableaux modification. 
- ✔️ Revoir le div info.

---
