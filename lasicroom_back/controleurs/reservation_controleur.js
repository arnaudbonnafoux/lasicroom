const baseDeDonnees = require('../db');

// delete
exports.supprimerReservation = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier que la réservation existe
        const resultat = await baseDeDonnees.query(
            `SELECT * FROM reservation WHERE id_reservation = $1`, [id]
        );

        if (resultat.rowCount === 0) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        const reservation = resultat.rows[0];

        // Supprimer la réservation
        await baseDeDonnees.query(
            `DELETE FROM reservation WHERE id_reservation = $1 RETURNING *`, [id]
        );

        // Réattribuer une place pour le concert concerné
        await baseDeDonnees.query(
            `UPDATE concert SET nb_places_restantes = nb_places_restantes + 1 WHERE id_concert = $1`,
            [reservation.id_concert]
        );

        // Répondre au client
        res.json({ message: "Réservation supprimée avec succès." });

    } catch (erreur) {
        console.error("Erreur lors de la suppression :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la suppression de la réservation" });
    }
};


// post
exports.creerReservation = async (req, res) => {
    const {
        //id_utilisateur, modif
        id_concert,
        type_tarif,
        montant
    } = req.body;

    const id_utilisateur = req.utilisateur.id;
    // Test
    //console.log('Requête reçue pour créer une réservation:', req.body);

    

    try {
        const verificationConcert = await baseDeDonnees.query(
            `SELECT nb_places_restantes FROM concert WHERE id_concert = $1`,
            [id_concert]
        );

        if (verificationConcert.rowCount === 0) {
            return res.status(404).json({ erreur: "Concert non trouvé." });
        }

        const placesRestantes = verificationConcert.rows[0].nb_places_restantes;

        if (placesRestantes <= 0) {
            return res.status(409).json({ erreur: "Aucune place restante pour ce concert." });
        }

        const resultat = await baseDeDonnees.query(
            `INSERT INTO reservation (
                id_utilisateur, id_concert, type_tarif, montant)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                id_utilisateur,
                id_concert,
                type_tarif,
                montant
            ]
        );
        res.status(201).json(resultat.rows[0]);

    } catch (erreur) {
        console.error("Erreur dans creerReservation :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la création de la réservation." });
    }
};

// get
exports.obtenirReservations = async (req, res) => {
    try {
        const resultat = await baseDeDonnees.query(`
      SELECT 
        r.id_reservation,
        u.nom AS nom_utilisateur,
        u.email,
        c.titre AS titre_concert,
        r.type_tarif,
        r.montant
      FROM reservation r
      JOIN utilisateur u ON r.id_utilisateur = u.id_utilisateur
      JOIN concert c ON r.id_concert = c.id_concert
      ORDER BY r.id_reservation
    `);

        res.json(resultat.rows);
    } catch (erreur) {
        console.error("Erreur dans obtenirReservations :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la récupération des réservations." });
    }
};

/*
exports.getReservationsByUser = async (req, res) => {
  try {
    const id_utilisateur = req.utilisateur.id;

    const query = `
      SELECT r.id_reservation, r.date_reservation, r.type_tarif, r.montant,
             c.titre AS titre_concert,
             c.date_concert
      FROM reservation r
      JOIN concert c ON r.id_concert = c.id_concert
      WHERE r.id_utilisateur = $1
      ORDER BY r.date_reservation DESC
    `;

    const { rows } = await baseDeDonnees.query(query, [id_utilisateur]);
    res.json(rows);
  } catch (err) {
    console.error('Erreur getReservationsByUser:', err);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des réservations" });
  }
};*/

exports.getReservationsByUser = async (req, res) => {
  try {
    const { id } = req.utilisateur;

    const query = `
      SELECT r.id_reservation, r.date_reservation, r.type_tarif, r.montant,
             c.titre AS concert, c.date_concert
      FROM reservation r
      JOIN concert c ON r.id_concert = c.id_concert
      WHERE r.id_utilisateur = $1
      ORDER BY r.date_reservation DESC
    `;

    const { rows } = await baseDeDonnees.query(query, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


