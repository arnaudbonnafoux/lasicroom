"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Middleware Express pour compresser et convertir une image uploadée en WebP
const compresserImage = async (req, res, next) => {
    try {
        if (!req.file) {
            next();
            return;
        }
        // Chemin du fichier image original uploadé
        const inputPath = req.file.path;
        // Génère le nom du fichier de sortie avec l'extension .webp
        const outputName = path_1.default.basename(req.file.filename, path_1.default.extname(req.file.filename)) +
            ".webp";
        // Chemin complet du fichier de sortie
        const outputPath = path_1.default.join(path_1.default.dirname(inputPath), outputName);
        // Utilise sharp pour redimensionner l'image à 800px de large et la convertir en WebP (qualité 70)
        await (0, sharp_1.default)(inputPath).resize(800).webp({ quality: 70 }).toFile(outputPath);
        // Supprime l'image originale après conversion
        fs_1.default.unlinkSync(inputPath);
        // Met à jour les infos du fichier dans la requête pour la suite du traitement
        req.file.filename = outputName;
        req.file.path = outputPath;
        next();
    }
    catch (err) {
        console.error("Erreur compression image :", err);
        next(err);
    }
};
exports.default = compresserImage;
//# sourceMappingURL=compressionImage.js.map