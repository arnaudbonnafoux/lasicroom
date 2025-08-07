const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const CLE_SECRETE = process.env.CLE_SECRETE;

// get
exports.obtenirUtilisateur = async (req, res) => {
  try {
    //const resultatRequete = await baseDeDonnees.query(`SELECT * FROM utilisateur`);
    const resultatRequete = await baseDeDonnees.query(`SELECT id_utilisateur, nom, email, role FROM utilisateur`);
    res.status(200).json(resultatRequete.rows);
  } catch (erreur) {
    console.error("Erreur dans obtenirUtilisateur :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// getID
exports.obtenirIdUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const resultatRequete = await baseDeDonnees.query(
      `SELECT * FROM utilisateur WHERE id_utilisateur = $1`, [id]
    );

    if (resultatRequete.rowCount === 0) {
      return res.status(404).json({ message: "Identifiant non trouvé" });
    }

    res.status(200).json(resultatRequete.rows[0]);

  } catch (erreur) {
    console.error("Erreur dans obtenirIdUtilisateur :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// post
exports.creerUtilisateur = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;

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
      { id: utilisateur.id_utilisateur, 
        role: utilisateur.role 
      },
      CLE_SECRETE,
      { expiresIn: '2h' }
    );

    return res.status(201).json({ utilisateur, token });

  } catch (erreur) {
    console.error("Erreur dans la création de l'utilisateur :", erreur);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
    }
  }
};






