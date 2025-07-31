const express = require('express');
const routeur = express.Router();
const artisteControleur = require('../controleurs/artiste_controleur');
const upload = require('../middlewares/multerConfig');

routeur.get('/', artisteControleur.obtenirArtiste);
routeur.post('/', upload.single('photo'), artisteControleur.creerArtiste); // <-- ici
routeur.put('/:id', upload.single('photo'), artisteControleur.mettreAJourArtiste);
routeur.delete('/:id', artisteControleur.supprimerArtiste);

module.exports = routeur;

/*
const express = require('express');
const routeur = express.Router();
const concertControleur = require('../controleurs/artiste_controleur');

routeur.get('/', concertControleur.obtenirArtiste);
routeur.post('/', concertControleur.creerArtiste);
routeur.put('/:id', concertControleur.mettreAJourArtiste);
routeur.delete('/:id', concertControleur.supprimerArtiste);

module.exports = routeur;*/

/*
Test route get :
curl -X GET http://localhost:3001/api/artistes | jq

Test route post :
curl -X POST http://localhost:3001/api/artistes \
-H "Content-Type: application/json" \
-d '{
  "nom_artiste": "Jessica",
  "style_musical": "rock indé",
  "description": "musique sombre",
  "photo": "https://example.com/photo.jpg",
  "lien_video": "https://example.com/video.mp4"
}' | jq


Test route put : Attention de bien choisir l'id (celui du test post)
curl -X PUT http://localhost:3001/api/artistes/7 \
-H "Content-Type: application/json" \
-d '{
  "nom_artiste": "Jessica Redux",
  "style_musical": "rock expérimental",
  "description": "musique sombre revisitée",
  "photo": "https://example.com/photo-redux.jpg",
  "lien_video": "https://example.com/video-redux.mp4"
}' | jq


Test route delete :
curl -X DELETE http://localhost:3001/api/artistes/1 | jq
*/