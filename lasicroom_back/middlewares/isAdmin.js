const jwt = require('jsonwebtoken'); 

// Middleware pour restreindre l'accès aux routes aux seuls administrateurs
module.exports = (req, res, next) => {
  // Récupère le token JWT depuis l'en-tête Authorization (format "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    // Vérifie et décode le token avec la clé secrète
    const utilisateur = jwt.verify(token, process.env.CLE_SECRETE);

    // Vérifie que l'utilisateur a bien le rôle "admin"
    if (utilisateur.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit : réservé aux administrateurs.' });
    }
    /* Ajoute l'utilisateur décodé à la requête (optionnel) 
    => permet aux controleurs ou middlewares suivants de ne pas redécoder le token à chaque fois.*/
    req.utilisateur = utilisateur; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
