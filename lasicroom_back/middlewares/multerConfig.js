const multer = require('multer');
const path = require('path');

// Fonction pour "nettoyer" le nom de l'artiste
const sanitizeFileName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')                   // décompose accents
    .replace(/[\u0300-\u036f]/g, '')   // supprime accents
    .replace(/\s+/g, '_')              // remplace espaces par "_"
    .replace(/[^a-z0-9_-]/g, '');      // supprime caractères spéciaux
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'photos_artistes');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // utilisé temporairement
    const nomArtiste = req.body.nom_artiste ? sanitizeFileName(req.body.nom_artiste) : 'artiste';
    const timestamp = Date.now();
    cb(null, `${nomArtiste}_${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;

