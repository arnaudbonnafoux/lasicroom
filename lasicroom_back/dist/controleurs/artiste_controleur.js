"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supprimerArtiste = exports.mettreAJourArtiste = exports.creerArtiste = exports.obtenirArtiste = void 0;
const xss_1 = __importDefault(require("xss"));
const db_1 = __importDefault(require("../db"));
// Récupérer un ou plusieurs artistes
const obtenirArtiste = async (req, res) => {
    try {
        const { nom } = req.query;
        // Si un nom est fourni, on le nettoie et on cherche l'artiste correspondant (LOWER => insensible à la casse)
        if (nom) {
            const nomNettoye = (0, xss_1.default)(nom.trim());
            const resultat = await db_1.default.query("SELECT * FROM artiste WHERE LOWER(nom_artiste) = LOWER($1)", [nomNettoye]);
            res.json(resultat.rows);
            return;
        }
        // Sinon, on renvoie tous les artistes
        const tousLesArtistes = await db_1.default.query("SELECT * FROM artiste");
        res.json(tousLesArtistes.rows);
    }
    catch (err) {
        console.error("Erreur dans obtenirArtiste :", err);
        res.status(500).json({
            erreur: "Erreur lors de la récupération des artistes.",
        });
    }
};
exports.obtenirArtiste = obtenirArtiste;
// Créer un nouvel artiste
const creerArtiste = async (req, res) => {
    try {
        // Récupère et nettoie les champs du corps de la requête
        let { nom_artiste, style_musical, description, lien_video } = req.body;
        nom_artiste = (0, xss_1.default)(nom_artiste.trim());
        style_musical = (0, xss_1.default)(style_musical.trim());
        description = (0, xss_1.default)(description.trim());
        lien_video = lien_video ? (0, xss_1.default)(lien_video.trim()) : undefined;
        // Récupère le chemin de la photo uploadée si présente
        const photo = req.file ? `photos_artistes/${req.file.filename}` : undefined;
        // validation simple
        if (!nom_artiste || !description) {
            res.status(400).json({ message: "Nom et description obligatoires." });
            return;
        }
        // Insertion de l'artiste en base de données
        const resultat = await db_1.default.query(`INSERT INTO artiste (nom_artiste, style_musical, description, photo, lien_video)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`, [nom_artiste, style_musical, description, photo, lien_video]);
        res.status(201).json(resultat.rows[0]);
    }
    catch (error) {
        console.error("Erreur lors de la création de l'artiste :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
exports.creerArtiste = creerArtiste;
// Mettre à jour un artiste existant
const mettreAJourArtiste = async (req, res) => {
    try {
        const { id } = req.params;
        let { nom_artiste, style_musical, description, lien_video } = req.body;
        nom_artiste = (0, xss_1.default)(nom_artiste.trim());
        style_musical = (0, xss_1.default)(style_musical.trim());
        description = (0, xss_1.default)(description.trim());
        lien_video = lien_video ? (0, xss_1.default)(lien_video.trim()) : undefined;
        // Prend la nouvelle photo si uploadée, sinon garde l'ancienne
        const photo = req.file
            ? `photos_artistes/${req.file.filename}`
            : req.body.photo;
        const resultat = await db_1.default.query(`UPDATE artiste
       SET nom_artiste = $1, style_musical = $2, description = $3, photo = $4, lien_video = $5
       WHERE id_artiste = $6 RETURNING *`, [nom_artiste, style_musical, description, photo, lien_video, id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Artiste non trouvé." });
            return;
        }
        res.json({
            message: "Artiste mis à jour avec succès",
            artiste: resultat.rows[0],
        });
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour :", err);
        res.status(500).json({ erreur: "Erreur serveur." });
    }
};
exports.mettreAJourArtiste = mettreAJourArtiste;
// Supprimer un artiste
const supprimerArtiste = async (req, res) => {
    try {
        const { id } = req.params;
        const resultat = await db_1.default.query("DELETE FROM artiste WHERE id_artiste = $1 RETURNING *", [id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Artiste non trouvé." });
            return;
        }
        res.json({ message: "Artiste supprimé avec succès." });
    }
    catch (erreur) {
        console.error(erreur);
        res.status(500).json({
            erreur: "Erreur lors de la suppression de l'artiste.",
        });
    }
};
exports.supprimerArtiste = supprimerArtiste;
//# sourceMappingURL=artiste_controleur.js.map