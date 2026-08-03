# Intégration d’un Live Streaming YouTube

## 1. Objectif

Permettre aux utilisateurs connectés de visionner un live streaming depuis la chaîne YouTube de la salle de concert (données publiques) via une API externe (YouTube Data API v3).

---

## 2. Architecture

### Backend (Node.js / Express)

- Endpoint : `/api/live`
- Fonction : récupérer la vidéo live active de la chaîne.
- Modules utilisés :
  - `express` pour le serveur
  - `node-fetch` pour interroger l’API YouTube
  - `dotenv` pour stocker les clés
  - `helmet`, `morgan` pour la sécurité et les logs
  - [`live_controleur.js`](/lasicroom_back/controleurs/live_controleur.js)
  - [`live.js`](/lasicroom_back/routes/live.js)

### Frontend (React)

- Composant `LiveStream.js` :
  - fetch `/api/live`
  - affiche iframe YouTube si live
  - sinon affiche “Aucun live en cours”
- Page `AccueilUser.js` :
  - Page protégée (accessible uniquement aux utilisateurs connectés)
  - Intègre le composant `LiveStream` dans la section live streaming
  - [`LiveStream.js`](/lasicroom_front/src/composants/LiveStream.js)

---

## 3. Configuration

### Variables d’environnement

````env
YOUTUBE_API_KEY=<ta_clé_api>
YOUTUBE_CHANNEL_ID=UCSJ4gkVC6NrvII8umztf0Ow```

---

## 4. Comment obtenir la clé API YouTube ?

### Étapes :

1. **Accéder à Google Cloud Console**
   - URL : https://console.cloud.google.com
   - Connectez-vous avec votre compte Google

2. **Créer un nouveau projet**
   - Cliquer sur le sélecteur de projet (en haut à gauche)
   - Cliquer sur "+ Nouveau projet"
   - Donner un nom (ex: "lasicroom")
   - Cliquer sur "Créer"

3. **Activer l'API YouTube Data API v3**
   - Dans la barre de recherche du tableau de bord, chercher "YouTube Data API v3"
   - Cliquer sur le résultat
   - Cliquer sur le bouton "Activer"

4. **Créer les identifiants (Credentials)**
   - Aller dans le menu "Identifiants" (gauche)
   - Cliquer sur "+ Créer des identifiants"
   - Sélectionner "Clé API"
   - Une clé est générée automatiquement
   - **Copier la clé**

5. **Configurer la clé dans le `.env` du backend**
   ```bash
   # lasicroom_back/.env
   YOUTUBE_API_KEY=AIzaSyD_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   YOUTUBE_CHANNEL_ID=UCSJ4gkVC6NrvII8umztf0Ow
````

6. **Redémarrer le serveur backend**
   ```bash
   npm run build
   npm start
   ```

### Restrictions et sécurité :

- ⚠️ **Ne pas committer la clé** dans Git (déjà dans `.gitignore`)
- 🔒 La clé doit rester privée (stockée dans `.env` uniquement)
- 📊 Google Cloud limite les appels API gratuits à 10 000 par jour
- 🛡️ Considérer les restrictions de clé API si usage en production

---

## 5. Playlist Deezer

La playlist Deezer est intégrée via un widget statique dans les pages `accueil` et `accueil_user` :

```jsx
<iframe
  src="https://widget.deezer.com/widget/dark/playlist/1973876342"
  title="Playlist Deezer"
  width="560"
  height="315"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  allowFullScreen
/>
```

Pour changer la playlist, modifier l'ID dans le `src` (le numéro à la fin).
