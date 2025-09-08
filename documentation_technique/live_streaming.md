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

### Frontend (React)
- Composant `LiveStream.js` :
  - fetch `/api/live`
  - affiche iframe YouTube si live
  - sinon affiche “Aucun live en cours”
- Page `AccueilUser.js` :
  - Page protégée (accessible uniquement aux utilisateurs connectés)
  - Intègre le composant `LiveStream` dans la section live streaming

---

## 3. Configuration

### Variables d’environnement
```env
YOUTUBE_API_KEY=<ta_clé_api>
YOUTUBE_CHANNEL_ID=UCSJ4gkVC6NrvII8umztf0Ow
