const multer = require('multer');
const path = require('path');

// Fonction pour "nettoyer" le nom de l'artiste
const sanitizeFileName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')                   // Décompose accents
    .replace(/[\u0300-\u036f]/g, '')   // Supprime accents
    .replace(/\s+/g, '_')              // Remplace espaces par "_"
    .replace(/[^a-z0-9_-]/g, '');      // Supprime caractères spéciaux
};

// Configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'photos_artistes');
  },
  // Génère un nom de fichier unique et propre pour chaque upload
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Utilisé temporairement

    // Nettoie le nom de l'artiste ou utilise "artiste" par défaut
    const nomArtiste = req.body.nom_artiste ? sanitizeFileName(req.body.nom_artiste) : 'artiste';
    const timestamp = Date.now();// Ajoute un timestamp pour éviter les doublons
    cb(null, `${nomArtiste}_${timestamp}${ext}`);// Construit le nom final du fichier
  }
});

const upload = multer({ storage }); // Instanciation de multer

module.exports = upload; //Exportation du modules vers les routes Express
