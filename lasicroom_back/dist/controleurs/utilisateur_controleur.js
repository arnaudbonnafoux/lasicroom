"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerUtilisateur = exports.obtenirIdUtilisateur = exports.obtenirUtilisateur = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const xss_1 = __importDefault(require("xss"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../db"));
dotenv_1.default.config();
const CLE_SECRETE = process.env.CLE_SECRETE || "";
// Récupérer tous les utilisateurs
const obtenirUtilisateur = async (req, res) => {
    try {
        const resultatRequete = await db_1.default.query(`SELECT id_utilisateur, nom, email, role FROM utilisateur`);
        res.status(200).json(resultatRequete.rows);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirUtilisateur :", erreur);
        res.status(500).json({
            erreur: "Erreur lors de la récupération des utilisateurs.",
        });
    }
};
exports.obtenirUtilisateur = obtenirUtilisateur;
// Récupérer un utilisateur par son id
const obtenirIdUtilisateur = async (req, res) => {
    const { id } = req.params;
    try {
        const resultatRequete = await db_1.default.query(`SELECT id_utilisateur, nom, email, role FROM utilisateur WHERE id_utilisateur = $1`, [id]);
        if (resultatRequete.rowCount === 0) {
            res.status(404).json({ message: "Identifiant non trouvé" });
            return;
        }
        res.status(200).json(resultatRequete.rows[0]);
    }
    catch (erreur) {
        console.error("Erreur dans obtenirIdUtilisateur :", erreur);
        res.status(500).json({
            erreur: "Erreur lors de la récupération de l'utilisateur.",
        });
    }
};
exports.obtenirIdUtilisateur = obtenirIdUtilisateur;
// Créer un nouvel utilisateur
const creerUtilisateur = async (req, res) => {
    let { nom, email, mot_de_passe, role } = req.body;
    // 🔐 Nettoyage XSS
    nom = (0, xss_1.default)(nom);
    email = (0, xss_1.default)(email);
    role = (0, xss_1.default)(role || "user");
    try {
        // Hachage du mot de passe avant stockage
        const motDePasseHashe = await bcrypt_1.default.hash(mot_de_passe, 10);
        const resultatRequete = await db_1.default.query(`INSERT INTO utilisateur (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id_utilisateur, nom, email, role`, [nom, email, motDePasseHashe, role]);
        const utilisateur = resultatRequete.rows[0];
        // Génère un token JWT pour l'utilisateur créé
        const token = jsonwebtoken_1.default.sign({ id: utilisateur.id_utilisateur, role: utilisateur.role }, CLE_SECRETE, { expiresIn: "2h" });
        // Renvoie l'utilisateur créé et le token
        res.status(201).json({ utilisateur, token });
    }
    catch (erreur) {
        console.error("Erreur dans la création de l'utilisateur :", erreur);
        res.status(500).json({
            message: "Erreur lors de l'ajout de l'utilisateur",
        });
    }
};
exports.creerUtilisateur = creerUtilisateur;
//# sourceMappingURL=utilisateur_controleur.js.map