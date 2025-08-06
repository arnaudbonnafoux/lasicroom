const baseDeDonnees = require('../db');

//get
exports.obtenirArtiste = async (req, res) => {
  try {
    const { nom } = req.query;

    if (nom) {
      const resultat = await baseDeDonnees.query(
        'SELECT * FROM artiste WHERE LOWER(nom_artiste) = LOWER($1)',
        [nom]
      );
      return res.json(resultat.rows);
    }

    const tousLesArtistes = await baseDeDonnees.query('SELECT * FROM artiste');
    res.json(tousLesArtistes.rows);

  } catch (err) {
    console.error("Erreur dans obtenirArtiste :", err);
    res.status(500).json({ erreur: "Erreur lors de la récupération des artistes." });
  }
};

//post
exports.creerArtiste = async (req, res) => {
  const { nom_artiste, style_musical, description, lien_video } = req.body;
  const photo = req.file ? `photos_artistes/${req.file.filename}` : null;

  try {
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

//put
exports.mettreAJourArtiste = async (req, res) => {
  const { id } = req.params;
  const { nom_artiste, style_musical, description, lien_video } = req.body;
  const photo = req.file ? 'photos_artistes/' + req.file.filename : req.body.photo; // garder ancienne si pas de nouvelle (condition ternaire)

  try {
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

//delete
exports.supprimerArtiste = async (req, res) => {
  const { id } = req.params;
  try {
    const resultat = await baseDeDonnees.query(
      'DELETE FROM artiste WHERE id_artiste = $1 RETURNING *',
      [id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Artiste non trouvé." });
    }
    res.json({ message: "Artiste supprimé avec succès." });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "Erreur lors de la suppression de l'artiste." });
  }
};
