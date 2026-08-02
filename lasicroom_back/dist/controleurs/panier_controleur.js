"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirPanier = exports.viderPanier = exports.ajouterAuPanier = void 0;
const db_1 = __importDefault(require("../db"));
// Ajouter au panier
const ajouterAuPanier = async (req, res) => {
    const { id_concert, quantite, type_tarif } = req.body;
    try {
        // Vérifier que le concert existe
        const concert = await db_1.default.query("SELECT * FROM concert WHERE id_concert = $1", [id_concert]);
        if (concert.rowCount === 0) {
            res.status(404).json({ erreur: "Concert non trouvé." });
            return;
        }
        res.json({
            message: "Concert ajouté au panier.",
            item: { id_concert, quantite, type_tarif },
        });
    }
    catch (erreur) {
        console.error("Erreur dans ajouterAuPanier :", erreur);
        res.status(500).json({ erreur: "Erreur lors de l'ajout au panier." });
    }
};
exports.ajouterAuPanier = ajouterAuPanier;
// Vider le panier
const viderPanier = async (req, res) => {
    try {
        res.json({ message: "Panier vidé." });
    }
    catch (erreur) {
        console.error("Erreur dans viderPanier :", erreur);
        res.status(500).json({ erreur: "Erreur lors du vidage du panier." });
    }
};
exports.viderPanier = viderPanier;
// Récupérer le panier
const obtenirPanier = async (req, res) => {
    try {
        res.json({ items: [] });
    }
    catch (erreur) {
        console.error("Erreur dans obtenirPanier :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la récupération du panier." });
    }
};
exports.obtenirPanier = obtenirPanier;
//# sourceMappingURL=panier_controleur.js.map