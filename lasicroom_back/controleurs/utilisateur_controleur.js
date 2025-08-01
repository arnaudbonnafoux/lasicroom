const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');

// get
exports.obtenirUtilisateur = async (requete, reponse) => {
    try {
        const resultatRequete = await baseDeDonnees.query(`SELECT * FROM utilisateur`);
        reponse.status(200).json(resultatRequete.rows);
    } catch (erreur) {
        console.error("Erreur dans obtenirUtilisateur :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la récupération de l'utilisateur." });
    }
};

// getID
exports.obtenirIdUtilisateur = async (requete, reponse) => {
    const { id } = requete.params;
    try {
        const resultatRequete = await baseDeDonnees.query(
            `SELECT * FROM utilisateur WHERE id_utilisateur = $1`, [id]
        );

        if (resultatRequete.rowCount === 0) {
            return reponse.status(404).json({ message: "Identifiant non trouvé" });
        }

        reponse.status(200).json(resultatRequete.rows[0]);

    } catch (erreur) {
        console.error("Erreur dans obtenirIdUtilisateur :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la récupération de l'utilisateur." });
    }
};

// put
exports.modifierUtilisateur = async (requete, reponse) => {
    const { id } = requete.params;
    const { nom, email, mot_de_passe } = requete.body;

    try {
        const resultatRequete = await baseDeDonnees.query(
            `UPDATE utilisateur
       SET nom = $1, email = $2, mot_de_passe = $3
       WHERE id_utilisateur = $4
       RETURNING *`,
            [nom, email, mot_de_passe, id]
        );

        if (resultatRequete.rowCount === 0) {
            return reponse.status(404).json({ message: "Utilisateur non trouvé." });
        }

        reponse.status(200).json(resultatRequete.rows[0]);
    } catch (erreur) {
        console.error("Erreur dans modifierUtilisateur :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la mise à jour de l'utilisateur." });
    }
};

// delete
exports.supprimerUtilisateur = async (requete, reponse) => {
    const { id } = requete.params;

    try {
        const resultatRequete = await baseDeDonnees.query(
            'DELETE FROM utilisateur WHERE id_utilisateur = $1 RETURNING *',
            [id]
        );

        if (resultatRequete.rowCount === 0) {
            return reponse.status(404).json({ message: "Utilisateur non trouvé." });
        }

        reponse.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (erreur) {
        console.error("Erreur dans supprimerUtilisateur :", erreur);
        reponse.status(500).json({ erreur: "Erreur lors de la suppression de l'utilisateur." });
    }
};

//post
exports.creerUtilisateur = async (requete, reponse) => {
  const { nom, email, mot_de_passe, role } = requete.body;

  try {
    // Hachage du mot de passe avant insertion
    const motDePasseHashe = await bcrypt.hash(mot_de_passe, 10);

    const resultatRequete = await baseDeDonnees.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nom, email, motDePasseHashe, role]
    );

    // Ne retourne pas le mot de passe dans la réponse
    const utilisateur = resultatRequete.rows[0];
    delete utilisateur.mot_de_passe;

    reponse.status(201).json(utilisateur);
    //res.status(201).json({ utilisateur }); //modif 01/08/2025

  } catch (erreur) {
    console.error("Erreur dans la création de l'utilisateur :", erreur);
    reponse.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
};
