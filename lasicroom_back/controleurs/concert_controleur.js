const baseDeDonnees = require('../db');
const xss = require('xss');
const { sendPaginatedResponse } = require('../middlewares/paginationMiddleware');

// Creer un nouveau concert
exports.creerConcert = async (req, res) => {
  let {
    titre,
    description,
    date_concert,
    nb_places_total,
    tarif_plein,
    tarif_abonne,
    id_artiste
  } = req.body;

  // Nettoyage XSS
  titre = xss(titre);
  description = xss(description);

  try {
    // Insere le concert en base de donnees, initialise nb_places_restantes au total
    const resultat = await baseDeDonnees.query(
      `INSERT INTO concert (
        titre, description, date_concert,
        nb_places_total, nb_places_restantes, tarif_plein, tarif_abonne, id_artiste
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        titre,
        description,
        date_concert,
        nb_places_total,
        nb_places_total, // Initialise les places restantes au total
        tarif_plein,
        tarif_abonne,
        id_artiste
      ]
    );

    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans creerConcert :", erreur);
    res.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
  }
};

// Mettre a jour un concert existant
exports.mettreAJourConcert = async (req, res) => {
  const { id } = req.params;
  let { titre, description, date_concert, nb_places_total, tarif_plein, tarif_abonne, id_artiste } = req.body;

  // Nettoyage XSS
  titre = xss(titre);
  description = xss(description);

  try {
    const resultat = await baseDeDonnees.query(
      `UPDATE concert
       SET titre = $1, description = $2, date_concert = $3, nb_places_total = $4, tarif_plein = $5, tarif_abonne = $6, id_artiste = $7
       WHERE id_concert = $8 RETURNING *`,
      [titre, description, date_concert, nb_places_total, tarif_plein, tarif_abonne, id_artiste, id]
    );
    if (resultat.rowCount === 0) {
      return res.status(404).json({ message: "Concert non trouve." });
    }
    res.json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans mettreAJourConcert :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la mise a jour du concert." });
  }
};

// Supprimer un concert
exports.supprimerConcert = async (req, res) => {
  const { id } = req.params;
  try {
    const resultat = await baseDeDonnees.query(
      'DELETE FROM concert WHERE id_concert = $1 RETURNING *',
      [id]
    );
    if (resultat.rowCount === 0) {
      return res.status(404).json({ message: "Concert non trouve." });
    }
    res.json({ message: "Concert supprime avec succes." });
  } catch (erreur) {
    console.error("Erreur dans supprimerConcert :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la suppression du concert." });
  }
};

// Recuperer tous les concerts (avec infos artiste associees + pagination)
exports.obtenirConcerts = async (req, res) => {
  try {
    const { pagination } = res.locals;

    // Recuperer le nombre total de concerts
    const countResult = await baseDeDonnees.query('SELECT COUNT(*) as total FROM concert');
    const totalCount = parseInt(countResult.rows[0].total);

    // Recuperer les concerts avec pagination
    const resultat = await baseDeDonnees.query(`
      SELECT 
        concert.id_concert,
        concert.titre,
        concert.description,
        concert.date_concert,
        concert.nb_places_total,
        concert.nb_places_restantes,
        concert.tarif_plein,
        concert.tarif_abonne,
        concert.id_artiste,
        artiste.nom_artiste,
        artiste.style_musical,
        artiste.description AS description_artiste,
        artiste.photo,
        artiste.lien_video
      FROM concert
      LEFT JOIN artiste ON concert.id_artiste = artiste.id_artiste 
      ORDER BY concert.date_concert ASC, concert.id_concert ASC
      LIMIT $1 OFFSET $2
    `, [pagination.limit, pagination.offset]);
    
    sendPaginatedResponse(res, resultat.rows, totalCount, pagination);
  } catch (erreur) {
    console.error("Erreur dans obtenirConcerts :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la recuperation des concerts." });
  }
};
