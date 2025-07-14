const baseDeDonnees = require('../db');

// get
exports.obtenirReservations = async (requete, reponse) => {
    try {
        const resultat = await baseDeDonnees.query('SELECT * FROM reservation ORDER BY date_reservation DESC');
        reponse.status(200).json(resultat.rows);
    } catch (erreur) {
        console.error('Erreur lors de la récupération des réservations :', erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la récupération des réservations" });
    }
};

//post
/*exports.creerReservation = async (requete, reponse) => {
    const {
        date_reservation,
        id_utilisateur,
        id_concert,
        type_tarif,
        montant
    } = requete.body;

    try {
        const verificationConcert = await baseDeDonnees.query(
            `SELECT nb_places_restantes FROM concert WHERE id_concert = $1`,
            [id_concert]
        );

        if (verificationConcert.rowCount === 0) {
            return reponse.status(404).json({ erreur: "Concert non trouvé." });
        }

        const placesRestantes = verificationConcert.rows[0].nb_places_restantes;

        if (placesRestantes <= 0) {
            return reponse.status(409).json({ erreur: "Aucune place restante pour ce concert." });
        }

        const resultat = await baseDeDonnees.query(
            `INSERT INTO reservation (
                date_reservation, id_utilisateur, id_concert, type_tarif, montant)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                date_reservation,
                id_utilisateur,
                id_concert,
                type_tarif,
                montant
            ]
        );

        await baseDeDonnees.query(
            `UPDATE concert
             SET nb_places_restantes = nb_places_restantes - 1
             WHERE id_concert = $1`,
            [id_concert]
        );

        reponse.status(201).json(resultat.rows[0]);

    } catch (erreur) {
        console.error("Erreur dans creerReservation :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la création de la réservation." });
    }
};*/

// delete
exports.supprimerReservation = async (requete, reponse) => {
    const { id } = requete.params;

    try {
        // Vérifier que la réservation existe
        const resultat = await baseDeDonnees.query(
            `SELECT * FROM reservation WHERE id_reservation = $1`, [id]
        );

        if (resultat.rowCount === 0) {
            return reponse.status(404).json({ message: "Réservation non trouvée" });
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
        reponse.json({ message: "Réservation supprimée avec succès." });

    } catch (erreur) {
        console.error("Erreur lors de la suppression :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la suppression de la réservation" });
    }
};



exports.creerReservation = async (requete, reponse) => {
    

    const {
        id_utilisateur,
        id_concert,
        type_tarif,
        montant
    } = requete.body;
console.log(`Réservation reçue pour id_concert=${id_concert}, id_utilisateur=${id_utilisateur}`);
    try {
        const verificationConcert = await baseDeDonnees.query(
            `SELECT nb_places_restantes FROM concert WHERE id_concert = $1`,
            [id_concert]
        );

        if (verificationConcert.rowCount === 0) {
            return reponse.status(404).json({ erreur: "Concert non trouvé." });
        }

        const placesRestantes = verificationConcert.rows[0].nb_places_restantes;

        if (placesRestantes <= 0) {
            return reponse.status(409).json({ erreur: "Aucune place restante pour ce concert." });
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

        /*await baseDeDonnees.query(
            `UPDATE concert
             SET nb_places_restantes = nb_places_restantes - 1
             WHERE id_concert = $1`,
            [id_concert]
        );*/

        reponse.status(201).json(resultat.rows[0]);

    } catch (erreur) {
        console.error("Erreur dans creerReservation :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la création de la réservation." });
    }
};
