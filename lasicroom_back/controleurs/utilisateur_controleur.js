const baseDeDonnees = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xss = require('xss');

require('dotenv').config();
const CLE_SECRETE = process.env.CLE_SECRETE;

// Récupérer tous les utilisateurs
exports.obtenirUtilisateur = async (req, res) => {
  try {
    const resultatRequete = await baseDeDonnees.query(
      `SELECT id_utilisateur, nom, email, role FROM utilisateur`
    );
    res.status(200).json(resultatRequete.rows);
  } catch (erreur) {
    console.error("Erreur dans obtenirUtilisateur :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la récupération des utilisateurs." });
  }
};

// Récupérer un utilisateur par son id
exports.obtenirIdUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const resultatRequete = await baseDeDonnees.query(
      `SELECT id_utilisateur, nom, email, role FROM utilisateur WHERE id_utilisateur = $1`,
      [id]
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

// Créer un nouvel utilisateur
exports.creerUtilisateur = async (req, res) => {
  let { nom, email, mot_de_passe, role } = req.body;

  // 🔐 Nettoyage XSS
  nom = xss(nom);
  email = xss(email);
  role = xss(role);

  try {
    // Hachage du mot de passe avant stockage
    const motDePasseHashe = await bcrypt.hash(mot_de_passe, 10);

    const resultatRequete = await baseDeDonnees.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nom, email, motDePasseHashe, role]
    );

    const utilisateur = resultatRequete.rows[0];
    delete utilisateur.mot_de_passe; // On ne retourne jamais le mot de passe

    // Génère un token JWT pour l'utilisateur créé
    const token = jwt.sign(
      { id: utilisateur.id_utilisateur, role: utilisateur.role },
      CLE_SECRETE,
      { expiresIn: '2h' }
    );

    // Renvoie l'utilisateur créé et le token
    return res.status(201).json({ utilisateur, token });

  } catch (erreur) {
    console.error("Erreur dans la création de l'utilisateur :", erreur);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
    }
  }
};

// Mettre à jour un utilisateur existant (règle inutilsée)
exports.mettreAJourUtilisateur = async (req, res) => {
  const { id } = req.params;
  let { nom, email, role } = req.body;

  // 🔐 Nettoyage XSS
  nom = xss(nom);
  email = xss(email);
  role = xss(role);

  try {
    const resultatRequete = await baseDeDonnees.query(
      `UPDATE utilisateur
       SET nom = $1, email = $2, role = $3
       WHERE id_utilisateur = $4
       RETURNING id_utilisateur, nom, email, role`,
      [nom, email, role, id]
    );

    if (resultatRequete.rowCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({
      message: "Utilisateur mis à jour avec succès",
      utilisateur: resultatRequete.rows[0]
    });

  } catch (erreur) {
    console.error("Erreur lors de la mise à jour :", erreur);
    res.status(500).json({ erreur: "Erreur serveur." });
  }
};

// Supprimer un utilisateur (Règle inutilisée)
exports.supprimerUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const resultat = await baseDeDonnees.query(
      'DELETE FROM utilisateur WHERE id_utilisateur = $1 RETURNING *',
      [id]
    );

    if (resultat.rowCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({ message: "Utilisateur supprimé avec succès." });

  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "Erreur lors de la suppression de l'utilisateur." });
  }
};
/*
Ce code constitue le contrôleur principal pour la gestion des utilisateurs dans une API Node.js. 
Il utilise la base de données, bcrypt pour le hachage des mots de passe, 
jsonwebtoken pour la génération de tokens JWT, et xss pour sécuriser les entrées utilisateur.

La fonction obtenirUtilisateur récupère la liste de tous les utilisateurs (id, nom, email, rôle) 
et la renvoie au format JSON. La fonction obtenirIdUtilisateur permet de récupérer les informations d’un utilisateur spécifique 
à partir de son identifiant ; si l’utilisateur n’existe pas, une erreur 404 est renvoyée.

Pour la création d’un utilisateur (creerUtilisateur), les champs nom, email et rôle sont nettoyés pour éviter les attaques XSS. 
Le mot de passe est haché avec bcrypt avant d’être stocké. Après insertion en base, 
un token JWT est généré et renvoyé avec les informations de l’utilisateur (le mot de passe n’est jamais retourné).

La fonction mettreAJourUtilisateur permet de modifier les informations d’un utilisateur existant (nom, email, rôle), 
après nettoyage XSS. Si l’utilisateur n’existe pas, une erreur 404 est renvoyée. Sinon, la mise à jour est confirmée avec les nouvelles données.

Enfin, la fonction supprimerUtilisateur supprime un utilisateur selon son identifiant. 
Si l’utilisateur n’est pas trouvé, une erreur 404 est renvoyée. Sinon, la suppression est confirmée par un message de succès. 
Toutes les fonctions gèrent les erreurs serveur et renvoient des messages explicites en cas de problème. 
Ce contrôleur applique de bonnes pratiques de sécurité et de gestion des données.
 */






