const baseDeDonnees = require('../db');

// get
exports.listerDemandes = async (requete, reponse) => {
  try {
    const resultat = await baseDeDonnees.query('SELECT * FROM accompagnement ORDER BY date_envoi DESC');
    reponse.json(resultat.rows);
  } catch (erreur) {
    reponse.status(500).json({ erreur: 'Erreur lors de la récupération des demandes.' });
  }
};

// post
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

// delete
exports.supprimerDemande = async (requete, reponse) => {
   const { id } = requete.params;
   try {
    const resultat = await baseDeDonnees.query(
      `DELETE FROM accompagnement WHERE id_demande = $1 RETURNING *`,
      [id]
    );
    if (resultat.rowCount === 0) {
      return reponse.status(404).json({ message: "Demande non trouvée"});
    }
    reponse.json({ message: "Demande supprimée."});
   } catch (erreur) {
    console.error(erreur);
    reponse.status(500).json({ erreur: "erreur lors de la suppression de la demande."})
   }
};
