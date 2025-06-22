const baseDeDonnees = require('../db');

// Récupérer toutes les demandes d'accompagnement
exports.listerDemandes = async (requete, reponse) => {
  try {
    const resultat = await baseDeDonnees.query('SELECT * FROM accompagnement ORDER BY date_envoi DESC');
    reponse.json(resultat.rows);
  } catch (erreur) {
    reponse.status(500).json({ erreur: 'Erreur lors de la récupération des demandes.' });
  }
};

// Créer une nouvelle demande d'accompagnement
exports.creerDemande = async (requete, reponse) => {
  const { nom_artiste, email_artiste, style_musical, message } = requete.body;
  try {
    const resultat = await baseDeDonnees.query(
      'INSERT INTO accompagnement (nom_artiste, email_artiste, style_musical, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom_artiste, email_artiste, style_musical, message]
    );
    reponse.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    reponse.status(500).json({ erreur: 'Erreur lors de la création de la demande.' });
  }
};

// Marquer une demande comme traitée
exports.traiterDemande = async (requete, reponse) => {
  const { id } = requete.params;
  try {
    await baseDeDonnees.query('UPDATE accompagnement SET traite = TRUE WHERE id_demande = $1', [id]);
    reponse.json({ message: 'Demande marquée comme traitée.' });
  } catch (erreur) {
    reponse.status(500).json({ erreur: 'Erreur lors de la mise à jour de la demande.' });
  }
};
