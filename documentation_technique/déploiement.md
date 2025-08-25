# 📡 Configuration du serveur Nginx – LasicRoom

Ce document décrit la configuration Nginx utilisée pour le projet **LasicRoom**. Elle inclut la redirection HTTP → HTTPS, la sécurité via headers, et la communication avec le backend Node.js et le frontend React.

---

## 🔁 Redirection HTTP → HTTPS

- Toutes les requêtes sur le port 80 sont automatiquement redirigées vers HTTPS.
- Garantit que la communication est toujours sécurisée.

---

## 🔒 Serveur HTTPS

- Écoute sur le port 443 avec SSL.
- Utilise un certificat auto-signé pour le développement (en production, remplacer par un certificat valide).
- Racine du serveur : le dossier `build` du frontend React.

---

## 🔐 Sécurité

- **Content Security Policy (CSP)** : limite les sources de scripts, styles, images, médias et frames.  
- **Headers complémentaires** : protection contre le sniffing, clickjacking, XSS et restrictions des permissions navigateur.

---

## 📦 Proxy vers le backend Node.js

- Les requêtes vers `/api/` sont transmises au backend Node.js (port 3001).  
- Les headers sont configurés pour conserver l’IP client et le protocole original.  

### Accès aux images

- Le chemin `/photos_artistes/` est également proxifié vers le backend.

---

## 🌐 Frontend React

- Toutes les routes non gérées par Nginx sont redirigées vers `index.html` pour permettre le **routing côté client**.

---

> ✅ Cette configuration assure un serveur sécurisé, fonctionnel pour le frontend React et le backend Node.js, tout en respectant les bonnes pratiques de déploiement.
