// middlewares/isAdmin.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    //const utilisateur = jwt.verify(token, process.env.JWT_SECRET);
    const utilisateur = jwt.verify(token, process.env.CLE_SECRETE);


    if (utilisateur.role !== 'admin') {
      return res.status(403).json({ message: 'Accès interdit : réservé aux administrateurs.' });
    }

    req.utilisateur = utilisateur; // facultatif mais utile
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};


/*module.exports = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit : réservé aux administrateurs.' });
  }
};*/
