# 📡 Configuration du serveur Nginx – LasicRoom

Ce document décrit la configuration Nginx utilisée pour le projet **LasicRoom**. Elle inclut la redirection HTTP → HTTPS, la sécurité via headers, et la communication avec le backend Node.js et le frontend React.

[Fichier de configuration Nginx](./configuration_nginx)

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


---

## 📄 Surveillance des logs Nginx

Pour suivre l’activité du serveur et diagnostiquer les problèmes, un **script bash** a été ajouté à la racine du projet pour générer un fichier centralisant les logs Nginx.

### 🔹 Script `generer_logs_nginx.sh`

* **Objectif** : récupérer les logs d’accès (`access.log`) et d’erreur (`error.log`) de Nginx dans un seul fichier.
* **Sortie** : `nginx_logs.txt` ou un autre fichier spécifié.
* **Fonctionnalités** :

  * Récupère les logs complets ou filtrés par période.
  * Sépare les logs d’accès et les logs d’erreur avec des en-têtes clairs :

    ```
    === Nginx Access Log ===
    === Nginx Error Log ===
    ```
  * Permet un suivi rapide de l’activité et des erreurs du serveur.

### 🔹 Exemple d’utilisation

```bash
sudo ./generer_logs_nginx.sh
```

* Le fichier généré contiendra l’ensemble des requêtes et erreurs traitées par Nginx.
* Possibilité de filtrer par période pour analyser uniquement une semaine ou un jour précis.

### 🔹 Avantages

* Permet de **surveiller le serveur** sans accéder directement aux fichiers Nginx.
* Utile pour le **debug** et la **maintenance**.
* Complète la journalisation côté backend (`back.log`) pour une vue complète du trafic et du traitement des requêtes.
