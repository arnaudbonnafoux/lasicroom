"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.passwordSchema = exports.validateReservation = exports.validateConcert = exports.validateConnexion = exports.validateInscription = void 0;
const express_validator_1 = require("express-validator");
const password_validator_1 = __importDefault(require("password-validator"));
// Schéma de validation du password
// Minimum 12 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
const passwordSchema = new password_validator_1.default();
exports.passwordSchema = passwordSchema;
passwordSchema
    .min(12) // minimum 12 caractères
    .max(128) // maximum 128 caractères
    .has()
    .uppercase() // au moins 1 lettre majuscule
    .has()
    .lowercase() // au moins 1 lettre minuscule
    .has()
    .digits() // au moins 1 chiffre
    .has()
    .symbols(); // au moins 1 caractère spécial
// Middleware pour traiter les erreurs de validation
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ erreur: errors.array()[0].msg });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// Validations pour l'inscription
const validateInscription = [
    (0, express_validator_1.body)("nom")
        .trim()
        .notEmpty()
        .withMessage("Le nom est requis")
        .isLength({ min: 2, max: 100 })
        .withMessage("Le nom doit avoir entre 2 et 100 caractères")
        .escape(), // prévenir XSS
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("Email invalide")
        .normalizeEmail(),
    (0, express_validator_1.body)("mot_de_passe")
        .notEmpty()
        .withMessage("Le mot de passe est requis")
        .custom((value) => {
        if (!passwordSchema.validate(value)) {
            throw new Error("Le mot de passe doit contenir: 12+ caractères, majuscule, minuscule, chiffre, caractère spécial");
        }
        return true;
    }),
    (0, express_validator_1.body)("confirmation_mot_de_passe")
        .notEmpty()
        .withMessage("La confirmation est requise")
        .custom((value, { req }) => {
        if (value !== req.body.mot_de_passe) {
            throw new Error("Les mots de passe ne correspondent pas");
        }
        return true;
    }),
    handleValidationErrors,
];
exports.validateInscription = validateInscription;
// Validations pour la connexion
const validateConnexion = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("Email invalide")
        .normalizeEmail(),
    (0, express_validator_1.body)("mot_de_passe")
        .notEmpty()
        .withMessage("Le mot de passe est requis")
        .isLength({ min: 1 })
        .withMessage("Le mot de passe ne peut pas être vide"),
    handleValidationErrors,
];
exports.validateConnexion = validateConnexion;
// Validations pour les concerts (admin)
const validateConcert = [
    (0, express_validator_1.body)("titre")
        .trim()
        .notEmpty()
        .withMessage("Le titre est requis")
        .isLength({ min: 3, max: 200 })
        .withMessage("Le titre doit avoir entre 3 et 200 caractères")
        .escape(),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("La description est requise")
        .isLength({ min: 10, max: 5000 })
        .withMessage("La description doit avoir entre 10 et 5000 caractères")
        .escape(),
    (0, express_validator_1.body)("date_concert")
        .notEmpty()
        .withMessage("La date est requise")
        .isISO8601()
        .withMessage("Format de date invalide"),
    (0, express_validator_1.body)("nb_places_total")
        .notEmpty()
        .withMessage("Le nombre de places est requis")
        .isInt({ min: 1, max: 10000 })
        .withMessage("Le nombre de places doit être entre 1 et 10000"),
    (0, express_validator_1.body)("tarif_plein")
        .notEmpty()
        .withMessage("Le tarif plein est requis")
        .isFloat({ min: 0, max: 1000 })
        .withMessage("Le tarif doit être entre 0 et 1000"),
    handleValidationErrors,
];
exports.validateConcert = validateConcert;
// Validations pour les réservations
const validateReservation = [
    (0, express_validator_1.body)("id_concert")
        .notEmpty()
        .withMessage("L'ID du concert est requis")
        .isInt()
        .withMessage("L'ID doit être un nombre"),
    (0, express_validator_1.body)("quantite")
        .notEmpty()
        .withMessage("La quantité est requise")
        .isInt({ min: 1, max: 100 })
        .withMessage("La quantité doit être entre 1 et 100"),
    handleValidationErrors,
];
exports.validateReservation = validateReservation;
//# sourceMappingURL=validationMiddleware.js.map