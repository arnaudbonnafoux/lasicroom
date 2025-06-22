const express = require('express');
const routeur = express.Router();

routeur.get('/', (req, res) => {
  res.send('Route réservations opérationnelle');
});

module.exports = routeur;
