import multer, { StorageEngine } from "multer";
import path from "path";

// Fonction pour "nettoyer" le nom de l'artiste
const sanitizeFileName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD") // Décompose accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime accents
    .replace(/\s+/g, "_") // Remplace espaces par "_"
    .replace(/[^a-z0-9_-]/g, ""); // Supprime caractères spéciaux
};

// Configuration du stockage des fichiers avec multer
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos_artistes");
  },
  // Génère un nom de fichier unique et propre pour chaque upload
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    // Nettoie le nom de l'artiste ou utilise "artiste" par défaut
    const nomArtiste = req.body.nom_artiste
      ? sanitizeFileName(req.body.nom_artiste)
      : "artiste";
    const timestamp = Date.now(); // Ajoute un timestamp pour éviter les doublons
    cb(null, `${nomArtiste}_${timestamp}${ext}`); // Construit le nom final du fichier
  },
});

const upload = multer({ storage }); // Instanciation de multer

export default upload; // Exportation du module vers les routes Express
