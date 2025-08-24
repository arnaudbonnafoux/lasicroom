## ⚡ Optimisation

### 1. Optimisation des images
- Compression et conversion en **WebP** via middleware `compressionImage` (Sharp) lors de l’upload.
  - Largeur max : 800px
  - Qualité : 70%
- Nom des fichiers : `nom_artiste_timestamp.webp`  
  Exemple : `artiste_test_1756031269642.webp`

### 2. Lazy Loading
- Attribut `loading="lazy"` sur les images dynamiques de la page Agenda pour différer le chargement.
```jsx
<img
  className='image_card'
  src={`/${concert.photo}`}
  alt={concert.nom_artiste}
  loading="lazy"
/>
