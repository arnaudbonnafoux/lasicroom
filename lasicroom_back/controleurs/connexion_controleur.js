const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const CLE_SECRETE = process.env.CLE_SECRETE;

//Clé secrète à sécuriser dans les variables d'environnement//
//const CLE_SECRETE = 'votre_cle_secrete';//

exports.connecterUtilisateur = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const resultat = await baseDeDonnees.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]
    );

    if (resultat.rowCount === 0) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const utilisateur = resultat.rows[0];

    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!motDePasseValide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect_2." });
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

    
    res.json({
      message: "Connexion réussie.",
      token,
      utilisateur: {
        id_utilisateur: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });

  } catch (erreur) {
    console.error("Erreur de connexion :", erreur);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};


