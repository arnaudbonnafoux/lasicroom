## ⚡ Optimisation

### 1. Optimisation des images

- Compression et conversion en **WebP** via middleware `compressionImage` (Sharp) lors de l’upload.
  - Largeur max : 800px
  - Qualité : 70%
- Nom des fichiers : `nom_artiste_timestamp.webp`  
  Exemple : `artiste_test_1756031269642.webp`

### 2. Lazy Loading

- Attribut `loading="lazy"` sur les images dynamiques de la page Agenda pour différer le chargement.

````jsx
<img
  className='image_card'
  src={`/${concert.photo}`}
  alt={concert.nom_artiste}
  loading="lazy"
/>```

### 3. HTTP Caching (Phase 6)
Configuration Nginx pour optimiser cache côté navigateur:

**Cache-Control headers:**
- **Assets statiques** (`.js`, `.css`, `.woff2`): `Cache-Control: public, max-age=31536000` (1 an)
  - Les assets construits incluent hash dans le nom (ex: `main.abc123.js`)
  - Mise à jour forcée au nouveau build
- **HTML**: `Cache-Control: public, max-age=3600` (1 heure)
  - Revalidation régulière pour détecter mises à jour
  - Header `ETag` pour validation efficace
- **Photos artistes** (`/photos_artistes/`): `Cache-Control: public, max-age=2592000` (30 jours)
  - Les photos changent rarement
  - Économise bande passante pour visiteurs réguliers

**Bénéfices:**
- ⚡ Chargement page 2-3x plus rapide pour utilisateurs retours
- 📉 Réduction bande passante Nginx
- ♻️ Moins de requêtes backend
- 🌍 Meilleure expérience utilisateur sur connexions lentes

### 4. API Pagination (Phase 6)
Pagination standardisée sur tous les endpoints GET:
- Réduit la charge réseau et base de données
- Défault: 20 items/page, max 100 items
- Headers RFC 5988 pour navigation hypermedia (first, prev, next, last)
- Example: `GET /api/concerts?page=2&limit=10` retourne 10 items offset 10
````
