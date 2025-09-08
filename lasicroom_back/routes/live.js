const express = require('express');
const router = express.Router();
const getLiveConcert = require('../controleurs/live_controleur');
//const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', /*authMiddleware,*/ getLiveConcert);

module.exports = router;
