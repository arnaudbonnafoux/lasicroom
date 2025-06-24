const baseDeDonnees = require('../db');

//post
exports.creerConcert = async (requete, reponse) => {
  const {
    titre,
    description,
    date_concert,
    nb_places_total,
    lien_video,
    tarif_plein,
    tarif_abonne
  } = requete.body;

  try {
    const resultat = await baseDeDonnees.query(
      `INSERT INTO concert (
        titre, description, date_concert,
        nb_places_total, nb_places_restantes,
        lien_video, tarif_plein, tarif_abonne
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        titre,
        description,
        date_concert,
        nb_places_total,
        nb_places_total, // Initialise les places restantes au total
        lien_video,
        tarif_plein,
        tarif_abonne
      ]
    );

    reponse.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans creerConcert :", erreur);
    reponse.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
  }
};

// put
exports.mettreAJourConcert = async (requete, reponse) => {
  const { id } = requete.params;
  const { titre, description, date_concert, nb_places_total, lien_video, tarif_plein, tarif_abonne } = requete.body;
  try {
    const resultat = await baseDeDonnees.query(
      `UPDATE concert
       SET titre = $1, description = $2, date_concert = $3, nb_places_total = $4,
           lien_video = $5, tarif_plein = $6, tarif_abonne = $7
       WHERE id_concert = $8 RETURNING *`,
      [titre, description, date_concert, nb_places_total, lien_video, tarif_plein, tarif_abonne, id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Concert non trouvé." });
    }
    reponse.json(resultat.rows[0]);
  } catch (erreur) {
    reponse.status(500).json({ erreur: "Erreur lors de la mise à jour du concert." });
  }
};

//delete
exports.supprimerConcert = async (requete, reponse) => {
  const { id } = requete.params;
  try {
    const resultat = await baseDeDonnees.query(
      'DELETE FROM concert WHERE id_concert = $1 RETURNING *',
      [id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Concert non trouvé." });
    }
    reponse.json({ message: "Concert supprimé avec succès." });
  } catch (erreur) {
    reponse.status(500).json({ erreur: "Erreur lors de la suppression du concert." });
  }
};

//get
exports.obtenirConcerts = async (requete, reponse) => {
  try {
    const resultat = await baseDeDonnees.query('SELECT * FROM concert ORDER BY id_concert');
    reponse.json(resultat.rows); 
  } catch (erreur) {
    console.error("Erreur dans obtenirConcerts :", erreur);
    reponse.status(500).json({ erreur: "Erreur lors de la récupération des concerts." });
  }
};
