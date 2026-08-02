"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arreterLive = exports.demarrerLive = exports.obtenirLiveStatus = void 0;
// Contrôleur pour les streams live - à implémenter
const obtenirLiveStatus = async (req, res) => {
    try {
        res.json({ live: false, message: "Live stream non disponible." });
    }
    catch (erreur) {
        console.error("Erreur dans obtenirLiveStatus :", erreur);
        res.status(500).json({ erreur: "Erreur lors de la vérification du live." });
    }
};
exports.obtenirLiveStatus = obtenirLiveStatus;
const demarrerLive = async (req, res) => {
    try {
        res.json({ message: "Live stream démarré." });
    }
    catch (erreur) {
        console.error("Erreur dans demarrerLive :", erreur);
        res.status(500).json({ erreur: "Erreur lors du démarrage du live." });
    }
};
exports.demarrerLive = demarrerLive;
const arreterLive = async (req, res) => {
    try {
        res.json({ message: "Live stream arrêté." });
    }
    catch (erreur) {
        console.error("Erreur dans arreterLive :", erreur);
        res.status(500).json({ erreur: "Erreur lors de l'arrêt du live." });
    }
};
exports.arreterLive = arreterLive;
//# sourceMappingURL=live_controleur.js.map