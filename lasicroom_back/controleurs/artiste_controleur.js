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
exports.creerArtiste = async (requete, reponse) => {
  const {
    nom_artiste,
    style_musical,
    description,
    photo,
    lien_video
  } = requete.body;

  try {
    const resultat = await baseDeDonnees.query(
      `INSERT INTO artiste (
        nom_artiste, style_musical, description, photo, lien_video
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        nom_artiste,
        style_musical,
        description,
        photo,
        lien_video
      ]
    );

    reponse.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans creerArtiste :", erreur);
    reponse.status(500).json({ erreur: "Erreur lors de l'ajout de l'artiste." });
  }
};

//put
exports.mettreAJourArtiste = async (requete, reponse) => {
  const { id } = requete.params;
  const { nom_artiste, style_musical, description, photo, lien_video } = requete.body;
  try {
    const resultat = await baseDeDonnees.query(
      `UPDATE artiste
       SET nom_artiste = $1, style_musical = $2, description = $3, photo = $4, lien_video = $5
       WHERE id_artiste = $6 RETURNING *`,
      [nom_artiste, style_musical, description, photo, lien_video, id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Artiste non trouvé." });
    }
    reponse.json({
      message: "Artiste mis à jour avec succès",
      artiste: resultat.rows[0]
    });
  } catch (erreur) {
    console.error(erreur);
    reponse.status(500).json({ erreur: "Erreur lors de la mise à jour de l'artiste." });
  }
};

//delete
exports.supprimerArtiste = async (requete, reponse) => {
  const { id } = requete.params;
  try {
    const resultat = await baseDeDonnees.query(
      'DELETE FROM artiste WHERE id_artiste = $1 RETURNING *',
      [id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Artiste non trouvé." });
    }
    reponse.json({ message: "Artiste supprimé avec succès." });
  } catch (erreur) {
    console.error(erreur);
    reponse.status(500).json({ erreur: "Erreur lors de la suppression de l'artiste." });
  }
};
