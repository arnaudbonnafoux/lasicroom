import sharp from "sharp";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

// Middleware Express pour compresser et convertir une image uploadée en WebP
const compresserImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      next();
      return;
    }

    // Chemin du fichier image original uploadé
    const inputPath = req.file.path;

    // Génère le nom du fichier de sortie avec l'extension .webp
    const outputName =
      path.basename(req.file.filename, path.extname(req.file.filename)) +
      ".webp";

    // Chemin complet du fichier de sortie
    const outputPath = path.join(path.dirname(inputPath), outputName);

    // Utilise sharp pour redimensionner l'image à 800px de large et la convertir en WebP (qualité 70)
    await sharp(inputPath).resize(800).webp({ quality: 70 }).toFile(outputPath);

    // Supprime l'image originale après conversion
    fs.unlinkSync(inputPath);

    // Met à jour les infos du fichier dans la requête pour la suite du traitement
    req.file.filename = outputName;
    req.file.path = outputPath;

    next();
  } catch (err) {
    console.error("Erreur compression image :", err);
    next(err);
  }
};

export default compresserImage;
