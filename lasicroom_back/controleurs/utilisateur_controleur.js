const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// post
exports.creerUtilisateur = async (requete, reponse) => {
  const { nom, email, mot_de_passe, role } = requete.body;

  try {
    const motDePasseHashe = await bcrypt.hash(mot_de_passe, 10);

    const resultatRequete = await baseDeDonnees.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nom, email, motDePasseHashe, role]
    );

    const utilisateur = resultatRequete.rows[0];
    delete utilisateur.mot_de_passe;

    // 🔐 Générer un token JWT
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET || 'votre_cle_secrete',
      { expiresIn: '2h' }
    );

    return reponse.status(201).json({ utilisateur, token });

  } catch (erreur) {
    console.error("Erreur dans la création de l'utilisateur :", erreur);
    if (!reponse.headersSent) {
      return reponse.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
    }
  }
};







