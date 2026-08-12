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
- Utilise un **certificat SSL valide** généré par **Let’s Encrypt** pour sécuriser les connexions.
- Le certificat est associé à un **nom de domaine gratuit** configuré via **DuckDNS** (ex. `lasicroom.duckdns.org`).
- La racine du serveur est le dossier `build` du frontend React.
- Pour le développement local, un certificat auto-signé peut être utilisé, mais en production, il est recommandé d’utiliser le certificat Let’s Encrypt.

---

## 🔐 Sécurité (Phases 3, 4, 5, 6)

### Headers de sécurité

**Content Security Policy (CSP)** et Headers complémentaires configurés dans Nginx:

| Header              | Protection                                           |
| ------------------- | ---------------------------------------------------- |
| **HSTS**            | Force HTTPS pendant 1 an                             |
| **CSP**             | Limite XSS/Injection (script-src 'self' strictement) |
| **X-Content-Type**  | Prévention MIME sniffing                             |
| **X-Frame**         | Prévention Clickjacking (DENY)                       |
| **Referrer-Policy** | Confidentialité références                           |
| **Permissions**     | Accès mic/caméra refusé                              |
| **COOP/CORP**       | Isolation contexte sécurisée                         |

### Backend Rate Limiting (Phase 2)

Appliqué par routes:

- API générale: 100 req/15min
- Login: 5 req/15min (protection brute force)
- Stripe webhooks: 10 req/5min
- Formulaires: 3 req/heure

### CSRF Protection (Phase 3)

- Routes publiques exemptées: `/api/connexions`, `/api/utilisateurs`, `/api/panier/ajouter`
- Autres routes: tokens obligatoires
- Token attaché automatiquement en `X-CSRF-Token` header

---

## 📦 Proxy vers le backend Node.js

- Les requêtes vers `/api/` sont transmises au backend Node.js (port 3001).
- Headers: `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto` conservés pour IP client.
- **Timeout**: Par défaut Nginx, ajustable pour requêtes longues (uploads, Stripe).

### Accès aux photos artistes

- Le chemin `/photos_artistes/` est servie directement depuis `/lasicroom_back/photos_artistes/`
- Format: WebP (compressé)
- Cache: 30 jours (2592000 sec)
- Erreur 404 si artiste n'existe pas

---

## 🌐 Frontend React

- Toutes les routes non gérées par Nginx sont redirigées vers `index.html` pour permettre le **routing côté client** (React Router).
- Les erreurs 404 sont gérées par React pour afficher les pages existantes.

### Cache des assets (Phase 6)

- **JavaScript/CSS buildés** (avec hashes): **1 an** (31536000 sec)
- **HTML** (index.html): **1 heure** (3600 sec)
- Permet revalidation efficace des mises à jour

---

## 🛠️ Scripts de démarrage

### `ouvrir_serveur.sh`

Lance Nginx, Node.js backend et PostgreSQL:

```bash
./ouvrir_serveur.sh
```

Serveur accessible: **https://lasicroom.duckdns.org**

### `fermeture_serveur.sh`

Arrête tous les services proprement:

```bash
./fermeture_serveur.sh
```

---

## 📊 Monitoring et Logs

Pour suivre l’activité du serveur et diagnostiquer les problèmes, un **script Bash** a été ajouté à la racine du projet pour générer un fichier centralisant les logs Nginx.

### 🔹 Script `generer_logs_nginx.sh`

**Objectif** : récupérer les logs d’accès (`access.log`) et d’erreur (`error.log`) de Nginx dans un seul fichier.
**Sortie** : `nginx_logs.txt` (ou un fichier spécifié).

**Fonctionnalités** :

- Récupère les logs complets ou filtrés par période.

- Sépare les logs d’accès et les logs d’erreur avec des en-têtes clairs :

  ```
  === Nginx Access Log ===
  === Nginx Error Log ===
  ```

- Permet un suivi rapide de l’activité et des erreurs du serveur.

---

### 🔹 Exemple d’utilisation

```bash
sudo ./generer_logs_nginx.sh
```

- Le fichier généré contiendra l’ensemble des requêtes et erreurs traitées par Nginx.
- Possibilité de filtrer par période pour analyser uniquement une semaine ou un jour précis.

---

### 🔹 Avantages

- Permet de **surveiller le serveur** sans accéder directement aux fichiers Nginx.
- Utile pour le **debug** et la **maintenance**.
- Complète la journalisation côté backend (`back.log`) pour une vue complète du trafic et du traitement des requêtes.
