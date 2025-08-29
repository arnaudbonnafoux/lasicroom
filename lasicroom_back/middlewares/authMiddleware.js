const jwt = require('jsonwebtoken');
const CLE_SECRETE = process.env.CLE_SECRETE;

module.exports = (req, res, next) => {
  // Récupère l'en-tête Authorization de la requête
  const authHeader = req.headers.authorization;

  // Vérifie que le header existe et commence par "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  // Récupère le token après "Bearer "
  const token = authHeader.split(' ')[1];
  try {
    // Vérifie et décode le token avec la clé secrète
    const decoded = jwt.verify(token, CLE_SECRETE);

    /* Test
    console.log("🔓 Token décodé :", decoded);*/

    req.utilisateur = decoded;  // Ajoute les infos du token décodé à la requête (ex : id, rôle)

    next(); // Passe au middleware ou contrôleur suivant

  } catch (err) {
    // Si le token est invalide ou expiré, renvoie une erreur 401
    return res.status(401).json({ message: 'Token invalide' });
  }
};
