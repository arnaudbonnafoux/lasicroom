"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supprimerAccompagnement = exports.creerAccompagnement = exports.obtenirAccompagnements = void 0;
const db_1 = __importDefault(require("../db"));
// Récupérer tous les accompagnements
const obtenirAccompagnements = async (req, res) => {
    try {
        const resultat = await db_1.default.query("SELECT * FROM accompagnement");
        res.json(resultat.rows);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirAccompagnements :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la récupération des accompagnements." });
    }
};
exports.obtenirAccompagnements = obtenirAccompagnements;
// Créer un accompagnement
const creerAccompagnement = async (req, res) => {
    const { titre, description, prix } = req.body;
    try {
        const resultat = await db_1.default.query(`INSERT INTO accompagnement (titre, description, prix)
       VALUES ($1, $2, $3) RETURNING *`, [titre, description, prix]);
        res.status(201).json(resultat.rows[0]);
    }
    catch (erreur) {
        console.error("Erreur dans creerAccompagnement :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la création de l'accompagnement." });
    }
};
exports.creerAccompagnement = creerAccompagnement;
// Supprimer un accompagnement
const supprimerAccompagnement = async (req, res) => {
    const { id } = req.params;
    try {
        const resultat = await db_1.default.query("DELETE FROM accompagnement WHERE id_accompagnement = $1 RETURNING *", [id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Accompagnement non trouvé." });
            return;
        }
        res.json({ message: "Accompagnement supprimé avec succès." });
    }
    catch (erreur) {
        console.error("Erreur dans supprimerAccompagnement :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la suppression de l'accompagnement." });
    }
};
exports.supprimerAccompagnement = supprimerAccompagnement;
//# sourceMappingURL=accompagnement_controleur.js.map