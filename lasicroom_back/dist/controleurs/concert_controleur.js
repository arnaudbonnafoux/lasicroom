"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supprimerConcert = exports.mettreAJourConcert = exports.obtenirConcertById = exports.obtenirConcerts = exports.creerConcert = void 0;
const xss_1 = __importDefault(require("xss"));
const db_1 = __importDefault(require("../db"));
// Créer un nouveau concert
const creerConcert = async (req, res) => {
    let { titre, description, date_concert, nb_places_total, tarif_plein, tarif_abonne, id_artiste, } = req.body;
    // Nettoyage XSS
    titre = (0, xss_1.default)(titre);
    description = (0, xss_1.default)(description);
    try {
        // Insère le concert en base de données, initialise nb_places_restantes au total
        const resultat = await db_1.default.query(`INSERT INTO concert (
        titre, description, date_concert,
        nb_places_total, nb_places_restantes, tarif_plein, tarif_abonne, id_artiste
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`, [
            titre,
            description,
            date_concert,
            nb_places_total,
            nb_places_total, // Initialise les places restantes au total
            tarif_plein,
            tarif_abonne,
            id_artiste,
        ]);
        res.status(201).json(resultat.rows[0]);
    }
    catch (erreur) {
        console.error("Erreur dans creerConcert :", erreur);
        res.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
    }
};
exports.creerConcert = creerConcert;
// Récupérer tous les concerts
const obtenirConcerts = async (req, res) => {
    try {
        const resultat = await db_1.default.query("SELECT * FROM concert ORDER BY date_concert ASC");
        res.json(resultat.rows);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirConcerts :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la récupération des concerts." });
    }
};
exports.obtenirConcerts = obtenirConcerts;
// Récupérer un concert par ID
const obtenirConcertById = async (req, res) => {
    const { id } = req.params;
    try {
        const resultat = await db_1.default.query("SELECT * FROM concert WHERE id_concert = $1", [id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Concert non trouvé." });
            return;
        }
        res.json(resultat.rows[0]);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirConcertById :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la récupération du concert." });
    }
};
exports.obtenirConcertById = obtenirConcertById;
// Mettre à jour un concert existant
const mettreAJourConcert = async (req, res) => {
    const { id } = req.params;
    let { titre, description, date_concert, nb_places_total, tarif_plein, tarif_abonne, id_artiste, } = req.body;
    // Nettoyage XSS
    titre = (0, xss_1.default)(titre);
    description = (0, xss_1.default)(description);
    try {
        const resultat = await db_1.default.query(`UPDATE concert
       SET titre = $1, description = $2, date_concert = $3, nb_places_total = $4, tarif_plein = $5, tarif_abonne = $6, id_artiste = $7
       WHERE id_concert = $8 RETURNING *`, [
            titre,
            description,
            date_concert,
            nb_places_total,
            tarif_plein,
            tarif_abonne,
            id_artiste,
            id,
        ]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Concert non trouvé." });
            return;
        }
        res.json({
            message: "Concert mis à jour avec succès",
            concert: resultat.rows[0],
        });
    }
    catch (erreur) {
        console.error("Erreur dans mettreAJourConcert :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la mise à jour du concert." });
    }
};
exports.mettreAJourConcert = mettreAJourConcert;
// Supprimer un concert
const supprimerConcert = async (req, res) => {
    const { id } = req.params;
    try {
        const resultat = await db_1.default.query("DELETE FROM concert WHERE id_concert = $1 RETURNING *", [id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Concert non trouvé." });
            return;
        }
        res.json({ message: "Concert supprimé avec succès." });
    }
    catch (erreur) {
        console.error("Erreur dans supprimerConcert :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la suppression du concert." });
    }
};
exports.supprimerConcert = supprimerConcert;
//# sourceMappingURL=concert_controleur.js.map