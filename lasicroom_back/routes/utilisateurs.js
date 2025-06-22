const express = require('express');
const routeur = express.Router();

routeur.get('/', (req, res) => {
  res.send('Route utilisateurs opérationnelle');
});

module.exports = routeur;
