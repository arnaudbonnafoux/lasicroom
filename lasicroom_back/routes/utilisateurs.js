const express = require('express');
const routeur = express.Router();
const utilisateurControleur = require('../controleurs/utilisateur_controleur');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes sécurisées par le middleware
routeur.get('/', authMiddleware, utilisateurControleur.obtenirUtilisateur);
routeur.get('/:id', authMiddleware, utilisateurControleur.obtenirIdUtilisateur);

// Route publique pour inscription
routeur.post('/', utilisateurControleur.creerUtilisateur);

// Routes PUT/DELETE désactivées pour l’instant
// routeur.put('/:id', utilisateurControleur.modifierUtilisateur);
// routeur.delete('/:id', utilisateurControleur.supprimerUtilisateur);

module.exports = routeur;


/*const express = require('express');
const routeur = express.Router();
const utilisateurControleur = require('../controleurs/utilisateur_controleur');

routeur.get('/', utilisateurControleur.obtenirUtilisateur);
routeur.get('/:id', utilisateurControleur.obtenirIdUtilisateur);
routeur.post('/', utilisateurControleur.creerUtilisateur);
//routeur.put('/:id', utilisateurControleur.modifierUtilisateur);
//routeur.delete('/:id', utilisateurControleur.supprimerUtilisateur);

module.exports = routeur;
*/

