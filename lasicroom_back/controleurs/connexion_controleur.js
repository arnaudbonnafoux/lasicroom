const baseDeDonnees = require('../db');

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

