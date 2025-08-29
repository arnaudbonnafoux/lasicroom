const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');// Librairie pour comparer les mots de passe hachés
const jwt = require('jsonwebtoken');// Librairie pour générer et vérifier les tokens JWT

require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const CLE_SECRETE = process.env.CLE_SECRETE; // Récupère la clé secrète pour signer les tokens

// Fonction de connexion d'un utilisateur
exports.connecterUtilisateur = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Recherche l'utilisateur correspondant à l'email dans la base de données
    const resultat = await baseDeDonnees.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]
    );

    if (resultat.rowCount === 0) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const utilisateur = resultat.rows[0];

    // Compare le mot de passe fourni avec le mot de passe haché stocké en base
    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!motDePasseValide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect_2." });
    }

    // Génère un token JWT contenant l'id et le rôle de l'utilisateur, valable 2 heures
    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        role: utilisateur.role
      },
      CLE_SECRETE,
      { expiresIn: '2h' }
    );

    // Renvoie le token et les infos principales de l'utilisateur au client
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
/*
Ce code gère la connexion d’un utilisateur dans une application Node.js. 
Lorsqu’un utilisateur tente de se connecter, la fonction récupère l’email et le mot de passe envoyés dans la requête. 
Elle recherche ensuite l’utilisateur correspondant à cet email dans la base de données.

Si aucun utilisateur n’est trouvé, une erreur 401 est renvoyée, indiquant que l’email ou le mot de passe est incorrect. 
Si l’utilisateur existe, le mot de passe fourni est comparé avec le mot de passe haché stocké en base grâce à bcrypt. 
Si la comparaison échoue, une erreur 401 est également renvoyée.

Si le mot de passe est correct, la fonction génère un token JWT contenant l’identifiant et le rôle de l’utilisateur, 
avec une durée de validité de 2 heures. Ce token est renvoyé dans la réponse, 
accompagné des informations principales de l’utilisateur (id, nom, email, rôle). 
Ce mécanisme permet d’authentifier l’utilisateur pour les requêtes suivantes.

À noter : la clé secrète utilisée pour signer le token est récupérée depuis les variables d’environnement, 
ce qui est une bonne pratique de sécurité.
*/

