const baseDeDonnees = require('../db');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

// get
exports.listerDemandes = async (req, res) => {
  try {
    const resultat = await baseDeDonnees.query('SELECT * FROM accompagnement ORDER BY date_envoi DESC');
    res.json(resultat.rows);
  } catch (erreur) {
    res.status(500).json({ erreur: 'Erreur lors de la récupération des demandes.' });
  }
};

// post
exports.creerDemande = async (req, res) => {
  let { nom_artiste, email_artiste, style_musical, message } = req.body;

  try {
    // ✅ Validation basique
    if (!nom_artiste || !validator.isLength(nom_artiste, { min: 1, max: 50 })) {
      return res.status(400).json({ erreur: "Nom artiste invalide" });
    }

    if (!email_artiste || !validator.isEmail(email_artiste)) {
      return res.status(400).json({ erreur: "Email invalide" });
    }

    if (!style_musical || !validator.isLength(style_musical, { min: 1, max: 50 })) {
      return res.status(400).json({ erreur: "Style musical invalide" });
    }

    if (!message || !validator.isLength(message, { min: 1, max: 500 })) {
      return res.status(400).json({ erreur: "Message trop long ou vide" });
    }

    // ✅ Nettoyage XSS (empêche l'injection de balises <script>, etc.)
    nom_artiste = sanitizeHtml(nom_artiste, { allowedTags: [], allowedAttributes: {} });
    email_artiste = sanitizeHtml(email_artiste, { allowedTags: [], allowedAttributes: {} });
    style_musical = sanitizeHtml(style_musical, { allowedTags: [], allowedAttributes: {} });
    message = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

    // ✅ Enregistrement en DB
    const resultat = await baseDeDonnees.query(
      'INSERT INTO accompagnement (nom_artiste, email_artiste, style_musical, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom_artiste, email_artiste, style_musical, message]
    );

    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la création de la demande.' });
  }
};

// delete
exports.supprimerDemande = async (req, res) => {
  const { id } = req.params;
  try {
    const resultat = await baseDeDonnees.query(
      `DELETE FROM accompagnement WHERE id_demande = $1 RETURNING *`,
      [id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Demande non trouvée" });
    }
    res.json({ message: "Demande supprimée." });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "erreur lors de la suppression de la demande." })
  }
};
