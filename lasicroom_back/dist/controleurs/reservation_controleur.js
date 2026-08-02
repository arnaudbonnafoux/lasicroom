"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirMesReservations = exports.supprimerReservation = exports.creerReservation = void 0;
const db_1 = __importDefault(require("../db"));
const email_1 = __importDefault(require("../email"));
// Créer une réservation et envoyer un email
const creerReservation = async (req, res) => {
    const { id_concert, type_tarif, montant } = req.body;
    const id_utilisateur = req.utilisateur?.id;
    if (!id_utilisateur) {
        res.status(401).json({ message: "Utilisateur non authentifié." });
        return;
    }
    try {
        // Vérification du concert
        const verificationConcert = await db_1.default.query(`SELECT nb_places_restantes, titre FROM concert WHERE id_concert = $1`, [id_concert]);
        if (verificationConcert.rowCount === 0) {
            res.status(404).json({ erreur: "Concert non trouvé." });
            return;
        }
        const placesRestantes = verificationConcert.rows[0].nb_places_restantes;
        const titreConcert = verificationConcert.rows[0].titre;
        if (placesRestantes <= 0) {
            res.status(409).json({ erreur: "Plus de places disponibles." });
            return;
        }
        // Créer la réservation
        const resultat = await db_1.default.query(`INSERT INTO reservation (id_utilisateur, id_concert, type_tarif, montant, statut)
       VALUES ($1, $2, $3, $4, 'confirmée')
       RETURNING *`, [id_utilisateur, id_concert, type_tarif, montant]);
        // Mettre à jour les places restantes
        await db_1.default.query(`UPDATE concert SET nb_places_restantes = nb_places_restantes - 1 WHERE id_concert = $1`, [id_concert]);
        // Envoyer email de confirmation
        const reservation = resultat.rows[0];
        const utilisateur = await db_1.default.query(`SELECT email, nom FROM utilisateur WHERE id_utilisateur = $1`, [id_utilisateur]);
        if (utilisateur.rows && utilisateur.rows.length > 0) {
            await (0, email_1.default)(utilisateur.rows[0].email, {
                nom: utilisateur.rows[0].nom,
                concert: titreConcert,
                places: 1,
            });
        }
        res.status(201).json({
            message: "Réservation créée avec succès.",
            reservation,
        });
    }
    catch (erreur) {
        console.error("Erreur dans creerReservation :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la création de la réservation." });
    }
};
exports.creerReservation = creerReservation;
// Supprimer une réservation
const supprimerReservation = async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifier que la réservation existe
        const resultat = await db_1.default.query(`SELECT * FROM reservation WHERE id_reservation = $1`, [id]);
        if (resultat.rowCount === 0) {
            res.status(404).json({ message: "Réservation non trouvée" });
            return;
        }
        const reservation = resultat.rows[0];
        // Supprimer la réservation
        await db_1.default.query(`DELETE FROM reservation WHERE id_reservation = $1 RETURNING *`, [id]);
        // Réattribuer une place pour le concert concerné
        await db_1.default.query(`UPDATE concert SET nb_places_restantes = nb_places_restantes + 1 WHERE id_concert = $1`, [reservation.id_concert]);
        // Répondre au client
        res.json({ message: "Réservation supprimée avec succès." });
    }
    catch (erreur) {
        console.error("Erreur lors de la suppression :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la suppression de la réservation" });
    }
};
exports.supprimerReservation = supprimerReservation;
// Récupérer les réservations d'un utilisateur
const obtenirMesReservations = async (req, res) => {
    const id_utilisateur = req.utilisateur?.id;
    if (!id_utilisateur) {
        res.status(401).json({ message: "Utilisateur non authentifié." });
        return;
    }
    try {
        const resultat = await db_1.default.query(`SELECT r.*, c.titre, c.date_concert FROM reservation r
       JOIN concert c ON r.id_concert = c.id_concert
       WHERE r.id_utilisateur = $1
       ORDER BY c.date_concert DESC`, [id_utilisateur]);
        res.json(resultat.rows);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirMesReservations :", erreur);
        res
            .status(500)
            .json({ erreur: "Erreur lors de la récupération des réservations." });
    }
};
exports.obtenirMesReservations = obtenirMesReservations;
//# sourceMappingURL=reservation_controleur.js.map