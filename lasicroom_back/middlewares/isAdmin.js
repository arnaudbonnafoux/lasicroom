module.exports = (req, res, next) => {
  if (req.utilisateur && req.utilisateur.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit : réservé aux administrateurs.' });
  }
};
