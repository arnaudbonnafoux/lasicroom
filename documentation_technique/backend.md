# Backend (Node.js / Express)

[Structure du backend](/lasicroom_back/structure_backend.md)

## 📌 Présentation

Le backend se compose d'une **API RESTful** conçue avec le framework **Express**, permettant la gestion des données entre la base de données et l'interface utilisateur.
La communication avec le frontend s'effectue via **Nginx**, configuré en proxy, ce qui empêche l’exposition directe du backend au public.

À chaque réservation, un email de confirmation est envoyé à la plateforme [Mailtrap](https://mailtrap.io/inboxes/3967029/messages) via le module interne [`email.js`](/lasicroom_back/email.js) situé à la racine du backend.

---

## 🛠 Middleware

Le backend utilise quatre middlewares principaux :

* **authMiddleware** : gère l’authentification des routes privées via JWT.
* **isAdmin** : contrôle les rôles des utilisateurs (*admin* ou *utilisateur*).
* **compressionImage** : convertit et compresse les images au format WebP.
* **multerConfig** : permet le téléversement des images depuis l’interface admin.

---

## 📦 Modules externes

* `pg` : connexion PostgreSQL
* `dotenv` : gestion des variables d’environnement
* `path` : gestion des chemins
* `bcrypt` : hashage des mots de passe
* `jsonwebtoken` : authentification par token
* `multer` : upload de fichiers
* `sharp` : compression des images
* `helmet` : sécurisation des headers HTTP
* `morgan` : journalisation des requêtes
* `express` : routage et gestion des middlewares
* `nodemailer` : envoi d’emails
* `validator` : validation des entrées utilisateur
* `sanitize` : nettoyage des données entrantes
* `fs` : gestion des fichiers côté serveur
* `xss` : protection contre les attaques XSS

---

## ⚙️ app.js (Point d’entrée de l’application)

Le fichier **`app.js`** constitue le **cœur du backend**.
Il initialise l’application Express, configure les middlewares globaux, et charge les routes principales de l’API.

[app.js](/lasicroom_back/app.js)

### 📑 Contenu et rôle principal :

1. **Imports & configuration**

   * Chargement des modules nécessaires (`express`, `helmet`, `morgan`, `dotenv`, etc.).
   * Chargement des variables d’environnement via `.env`.

2. **Initialisation d’Express**

   * Création de l’instance de l’application.
   * Activation du parsing JSON pour recevoir et traiter les requêtes.
   * Sécurisation avec `helmet` (certaines règles comme `contentSecurityPolicy` et `hsts` sont désactivées en développement).
   * Journalisation des requêtes via `morgan`.

3. **Gestion des fichiers statiques**

   * Mise à disposition des images des artistes via `/photos_artistes`.

4. **Déclaration des routes API**

   * `/api/artistes` → routes liées aux artistes
   * `/api/concerts` → routes liées aux concerts
   * `/api/utilisateurs` → gestion des utilisateurs
   * `/api/reservations` → gestion des réservations
   * `/api/accompagnements` → gestion des accompagnements
   * `/api/connexions` → authentification et connexions utilisateurs

5. **Démarrage du serveur**

   * Le serveur écoute par défaut sur **`http://localhost:3001`**.
   * Le port et l’hôte peuvent être personnalisés via les variables d’environnement `PORT` et `HOST`.

---

## 📄 back.log (Journalisation des requêtes)

Le backend utilise le module **Morgan** pour **journaliser toutes les requêtes HTTP** traitées par Express. Ces informations sont précieuses pour suivre le fonctionnement du serveur et diagnostiquer d’éventuelles erreurs.

### 📑 Contenu

Le fichier [**`back.log`**](../lasicroom_back/back.log) contient, pour chaque requête :

* **Méthode HTTP** : `GET`, `POST`, `PUT`, `DELETE`, etc.
* **URL demandée** : le chemin de la requête, par exemple `/api/concerts`.
* **Code de réponse HTTP** : `200`, `404`, `500`, etc.
* **Temps de réponse** : durée en millisecondes pour traiter la requête.
* **Taille de la réponse** : en octets, si disponible.

Exemple d’extraits de `back.log` :

```
GET /api/concerts 200 45.154 ms - 4749
GET /photos_artistes/the_rockers_1756037311848.webp 304 3.134 ms - -
```

### 🔹 Utilité

* **Surveillance du backend** : savoir quelles routes sont utilisées et comment le serveur y répond.
* **Analyse des performances** : identifier les requêtes longues ou lentes.
* **Debugging** : repérer les erreurs ou comportements inattendus côté serveur.

### 🔹 Remarques

* Le fichier `back.log` est généré par **Morgan** et peut être consulté ou filtré avec des outils comme `tail`, `grep` ou `less`.
* Bien que Nginx logue également toutes les requêtes, `back.log` fournit une vue **interne côté backend**, montrant exactement comment Express traite chaque requête.
* Pour l’instant, le fichier est suffisant pour surveiller le backend sans analyser les logs Nginx.



