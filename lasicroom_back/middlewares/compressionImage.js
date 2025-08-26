const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const compresserImage = async (req, res, next) => {
  if (!req.file) return next();

  const inputPath = req.file.path;
  const outputName = path.basename(req.file.filename, path.extname(req.file.filename)) + '.webp';
  const outputPath = path.join(path.dirname(inputPath), outputName);

  try {
    await sharp(inputPath)
      .resize(800)
      .webp({ quality: 70 })
      .toFile(outputPath);

    fs.unlinkSync(inputPath); // supprime l'image originale

    req.file.filename = outputName;
    req.file.path = outputPath;

    next();
  } catch (err) {
    console.error("Erreur compression image :", err);
    next(err);
  }
};

module.exports = compresserImage;


