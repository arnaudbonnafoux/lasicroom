# Backend (Node.js / Express)

[Structure du backend](structure_backend.md)

## 📌 Présentation

Le backend se compose d'une **API RESTful** conçue avec le framework **Express**, permettant la gestion des données entre la base de données et l'interface utilisateur.  
La communication avec le frontend s'effectue via **Nginx**, configuré en proxy, ce qui empêche l’exposition directe du backend au public.  

À chaque réservation, un email de confirmation est envoyé à la plateforme **Mailtrap** via le module interne `email.js` situé à la racine du backend.

---

## 🛠 Middleware

Le backend utilise quatre middlewares principaux :  

- **authMiddleware** : gère l’authentification des routes privées via JWT.  
- **isAdmin** : contrôle les rôles des utilisateurs (*admin* ou *utilisateur*).  
- **compressionImage** : convertit et compresse les images au format WebP.  
- **multerConfig** : permet le téléversement des images depuis l’interface admin.

---

## 📦 Modules externes

- `pg` : connexion PostgreSQL  
- `dotenv` : gestion du fichier `.env`  
- `path` : gestion des chemins  
- `bcrypt` : hashage des mots de passe  
- `jsonwebtoken` : authentification par token  
- `multer` : upload de fichiers  
- `sharp` : compression des images  
- `helmet` : sécurisation des headers HTTP  
- `morgan` : journalisation des requêtes  
- `express` : routage et gestion des middlewares  
- `nodemailer` : envoi d’emails

---


