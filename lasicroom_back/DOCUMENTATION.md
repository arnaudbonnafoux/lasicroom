# Documentation technique de l'application La sicRoom

---

## Sommaire

1. Présentation  
2. Architecture générale  
3. Technologies utilisées  
4. Installation & Configuration  
5. Structure des dossiers  
6. Fonctionnalités principales  
7. API (si applicable)  
8. Sécurité  
9. Tests  
10. Déploiement  
11. Annexes  

---

## 1. Présentation

Le projet consiste à développer une application web pour une salle de concert S.M.A.C., spécialisée dans les musiques actuelles : La sicRoom. Cette plateforme doit permettre de présenter la programmation musicale, vendre des billets en ligne, proposer un espace d’accompagnement pour les artistes, et rendre accessible du contenu multimédia (vidéos, live stream, ressources pédagogiques).  
Le site s’adresse à plusieurs types d’utilisateurs : le grand public, les artistes locaux, et les administrateurs de la salle.

**Licence**

Ce projet est sous licence libre **Non-Commercial - ShareAlike**.  
Voir le fichier [LICENSE](./LICENSE) pour les détails.  
L’usage commercial est strictement interdit sans l’accord explicite de l’auteur (duanrA).

---

## 2. Architecture générale

### 2.1 Front-end (React)

- **Technologie** : ReactJS (create-react-app)  
- **Port en développement** : `3000`  
- **Production** : build statique déployé dans `/lasicroom_front/build`  
- **Rôle** :  
  - Interface utilisateur (pages, formulaires, affichages)  
  - Communication avec le backend via des appels API (`fetch` vers `/api/*`)  
- **Gestion des routes** : React Router  
- **Statique servie via Nginx** (build React dans `/build`)  

### 2.2 Back-end (Node.js + Express)

- **Technologie** : Node.js avec Express  
- **Port** : `3001`  
- **Rôle** :  
  - API REST : `/api/artistes`, `/api/concerts`, `/api/utilisateurs`, `/api/reservations`, `/api/accompagnements`, `/api/connexions`  
  - Authentification et gestion des sessions  
  - Accès aux fichiers statiques (exemple : photos via `/photos_artistes`)  
- **Middleware utilisés** :  
  - `express.json()` pour parser les requêtes JSON  
  - Routes modularisées dans `/routes/*`  
- **Dossier statique** : `/photos_artistes` (servi par Express)  

### 2.3 Nginx (serveur web en frontal)

- **Rôle** :  
  - Sert les fichiers statiques du front (React build)  
  - Fait du reverse proxy pour la partie API (redirige `/api/*` vers `localhost:3001`)  
  - Fait du reverse proxy pour les images statiques `/photos_artistes/*` vers Express backend  
  - Gère la SPA React avec `try_files` pour la navigation côté client  
- **Configuration** :  
  - Écoute sur le port 80  
  - Proxy_pass vers backend Node.js (localhost:3001)  
  - Sert le React build à la racine  

### 2.4 Communication Front ↔ Back

- En production, le front appelle l’API via des URLs relatives (`/api/*`).  
- Nginx fait le proxy vers le backend Node.js.  
- En développement, le front est sur `localhost:3000` et le backend sur `localhost:3001`.   
- En production, front et back sont servis sur le même domaine via Nginx, donc CORS n’est pas nécessaire.

### 2.5 Déploiement

- L’application est déployée sur un serveur personnel accessible via une adresse IP publique (exemple : `ip publique`).  
- Nginx expose l’application React et l’API via la même adresse/IP.  
- Backend Node.js écoute localement sur le port 3001, non exposé directement à l’extérieur.  
- Le front et le back communiquent via proxy Nginx pour éviter les problèmes CORS.  

---

## 3. Technologies utilisées

### Nginx

Dans ce projet, Nginx agit comme un point d’entrée unique pour toutes les requêtes qui arrivent sur le serveur. Son rôle principal est de rediriger ces requêtes vers la bonne partie de l’application, selon leur type :  

- Pour les requêtes qui concernent les données et fonctionnalités (comme les concerts, artistes, réservations), Nginx les envoie au serveur Node.js qui gère le backend.  
- Pour les images des artistes, Nginx transmet aussi les demandes au serveur Node.js qui les sert directement.  
- Pour tout ce qui concerne l’interface utilisateur (le site web React), Nginx sert directement les fichiers statiques du frontend, sans passer par Node.js.  

Cette organisation permet de centraliser la gestion des requêtes, d’optimiser les performances en servant directement les fichiers statiques, et de faciliter la maintenance en séparant clairement le frontend et le backend.

### Node.js

Node.js sert de serveur backend dans ce projet. C’est lui qui gère la logique métier, les échanges avec la base de données, et fournit les données nécessaires à l’application web via des APIs.  
Il traite les requêtes liées aux concerts, artistes, utilisateurs, réservations, et autres fonctionnalités.  
Node.js s’occupe aussi de servir les fichiers statiques des photos d’artistes, permettant ainsi à l’application frontend d’afficher les images correctement.  
Grâce à Node.js, le backend peut répondre rapidement aux demandes du frontend et gérer efficacement toutes les opérations côté serveur.

---

## 4. Installation & Configuration

...

---

## 5. Structure des dossiers

Structure des dossiers accessibles via les fichiers structure généré par un script Bash. 


---

## 6. Fonctionnalités principales

...

---

## 7. API (si applicable)

...

---

## 8. Sécurité

...

---

## 9. Tests

...

---

## 10. Déploiement

L’application est déployée sur un serveur où elle est accessible à la fois en réseau local et depuis l’extérieur via une adresse IP publique.  

- En réseau local, tu peux accéder à l’application en utilisant l’adresse IP locale du serveur ou un nom de domaine local configuré (par exemple lasicroom.local).  
- Depuis l’extérieur, l’application est accessible via l’adresse IP publique du serveur, ce qui permet de la consulter depuis n’importe quel appareil connecté à Internet, comme un smartphone ou un ordinateur distant.  

Cette double accessibilité est possible grâce à la configuration du serveur et du routeur, notamment avec la redirection des ports appropriée, et à l’utilisation de Nginx qui centralise les requêtes entrantes.  
Cela facilite les phases de tests, de démonstration, mais aussi l’utilisation en production.

---

## 11. Annexes

...

