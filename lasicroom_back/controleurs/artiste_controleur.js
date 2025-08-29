const baseDeDonnees = require('../db');
const xss = require('xss');
//const validator = require('validator');

// Récupérer un ou plusieurs artistes
exports.obtenirArtiste = async (req, res) => {
  try {
    const { nom } = req.query; // Récupère le nom dans les paramètres de requête (optionnel)

    // Si un nom est fourni, on le nettoie et on cherche l'artiste correspondant (LOWER => insensible à la casse)
    if (nom) {
      const nomNettoye = xss(nom.trim());
      const resultat = await baseDeDonnees.query(
        'SELECT * FROM artiste WHERE LOWER(nom_artiste) = LOWER($1)',
        [nomNettoye]
      );
      return res.json(resultat.rows);
    }

    // Sinon, on renvoie tous les artistes
    const tousLesArtistes = await baseDeDonnees.query('SELECT * FROM artiste');
    res.json(tousLesArtistes.rows);

  } catch (err) {
    console.error("Erreur dans obtenirArtiste :", err);
    res.status(500).json({ erreur: "Erreur lors de la récupération des artistes." });
  }
};

// Créer un nouvel artiste
exports.creerArtiste = async (req, res) => {
  try {
    // Récupère et nettoie les champs du corps de la requête
    let { nom_artiste, style_musical, description, lien_video } = req.body;
    nom_artiste = xss(nom_artiste.trim());
    style_musical = xss(style_musical.trim());
    description = xss(description.trim());
    lien_video = lien_video ? xss(lien_video.trim()) : null;
    // Récupère le chemin de la photo uploadée si présente
    const photo = req.file ? `photos_artistes/${req.file.filename}` : null;

    // validation simple
    if (!nom_artiste || !description) {
      return res.status(400).json({ message: "Nom et description obligatoires." });
    }

    // Insertion de l'artiste en base de données
    const resultat = await baseDeDonnees.query(
      `INSERT INTO artiste (nom_artiste, style_musical, description, photo, lien_video)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nom_artiste, style_musical, description, photo, lien_video]
    );

    res.status(201).json(resultat.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de l\'artiste :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Mettre à jour un artiste existant
exports.mettreAJourArtiste = async (req, res) => {
  try {
    const { id } = req.params;
    let { nom_artiste, style_musical, description, lien_video } = req.body;

    nom_artiste = xss(nom_artiste.trim());
    style_musical = xss(style_musical.trim());
    description = xss(description.trim());
    lien_video = lien_video ? xss(lien_video.trim()) : null;
    // Prend la nouvelle photo si uploadée, sinon garde l'ancienne
    const photo = req.file ? `photos_artistes/${req.file.filename}` : req.body.photo;

    const resultat = await baseDeDonnees.query(
      `UPDATE artiste
       SET nom_artiste = $1, style_musical = $2, description = $3, photo = $4, lien_video = $5
       WHERE id_artiste = $6 RETURNING *`,
      [nom_artiste, style_musical, description, photo, lien_video, id]
    );

    if (resultat.rowCount === 0) {
      return res.status(404).json({ message: "Artiste non trouvé." });
    }

    res.json({
      message: "Artiste mis à jour avec succès",
      artiste: resultat.rows[0]
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ erreur: "Erreur serveur." });
  }
};

// Supprimer un artiste
exports.supprimerArtiste = async (req, res) => {
  try {
    const { id } = req.params;
    const resultat = await baseDeDonnees.query(
      'DELETE FROM artiste WHERE id_artiste = $1 RETURNING *',
      [id]
    );
    if (resultat.rowCount === 0) {
      return res.status(404).json({ message: "Artiste non trouvé." });
    }
    res.json({ message: "Artiste supprimé avec succès." });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "Erreur lors de la suppression de l'artiste." });
  }
};
