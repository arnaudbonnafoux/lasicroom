const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const CLE_SECRETE = process.env.CLE_SECRETE;

//Clé secrète à sécuriser dans les variables d'environnement//
//const CLE_SECRETE = 'votre_cle_secrete';//

exports.connecterUtilisateur = async (requete, reponse) => {
  const { email, mot_de_passe } = requete.body;

  try {
    const resultat = await baseDeDonnees.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]
    );

    if (resultat.rowCount === 0) {
      return reponse.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const utilisateur = resultat.rows[0];

    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!motDePasseValide) {
      return reponse.status(401).json({ message: "Email ou mot de passe incorrect_2." });
    }

    // Générer le token
    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        role: utilisateur.role
      },
      CLE_SECRETE,
      { expiresIn: '2h' }
    );

    // Réponse
    reponse.json({
      message: "Connexion réussie.",
      token,
      utilisateur: {
        id: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });

  } catch (erreur) {
    console.error("Erreur de connexion :", erreur);
    reponse.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};

/*
exports.connecterUtilisateur = async (requete, reponse) => {
  const { email, mot_de_passe } = requete.body;

  try {
    const resultat = await baseDeDonnees.query(
      'SELECT * FROM utilisateur WHERE email = $1 AND mot_de_passe = $2',
      [email, mot_de_passe]
    );

    if (resultat.rows.length === 0) {
      return reponse.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const utilisateur = resultat.rows[0];
    reponse.status(200).json({ message: "Connexion réussie", utilisateur });
  } catch (erreur) {
    console.error("Erreur lors de la connexion :", erreur);
    reponse.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};
*/

