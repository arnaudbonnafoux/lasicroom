import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import PasswordValidator from "password-validator";

// Schéma de validation du password
// Minimum 12 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
const passwordSchema = new PasswordValidator();
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
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erreur: errors.array()[0].msg });
    return;
  }
  next();
};

// Validations pour l'inscription
const validateInscription = [
  body("nom")
    .trim()
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 2, max: 100 })
    .withMessage("Le nom doit avoir entre 2 et 100 caractères")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Email invalide")
    .normalizeEmail(),

  body("mot_de_passe")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit avoir au moins 8 caractères")
    .custom((value: string) => {
      // Validation simplifiée : au moins 1 majuscule, 1 minuscule, 1 chiffre
      if (!/[A-Z]/.test(value)) {
        throw new Error("Doit contenir au moins 1 majuscule");
      }
      if (!/[a-z]/.test(value)) {
        throw new Error("Doit contenir au moins 1 minuscule");
      }
      if (!/[0-9]/.test(value)) {
        throw new Error("Doit contenir au moins 1 chiffre");
      }
      return true;
    }),

  handleValidationErrors,
];

// Validations pour la connexion
const validateConnexion = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Email invalide")
    .normalizeEmail(),

  body("mot_de_passe")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 1 })
    .withMessage("Le mot de passe ne peut pas être vide"),

  handleValidationErrors,
];

// Validations pour les concerts (admin)
const validateConcert = [
  body("titre")
    .trim()
    .notEmpty()
    .withMessage("Le titre est requis")
    .isLength({ min: 3, max: 200 })
    .withMessage("Le titre doit avoir entre 3 et 200 caractères")
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La description est requise")
    .isLength({ min: 10, max: 5000 })
    .withMessage("La description doit avoir entre 10 et 5000 caractères")
    .escape(),

  body("date_concert")
    .notEmpty()
    .withMessage("La date est requise")
    .isISO8601()
    .withMessage("Format de date invalide"),

  body("nb_places_total")
    .notEmpty()
    .withMessage("Le nombre de places est requis")
    .isInt({ min: 1, max: 10000 })
    .withMessage("Le nombre de places doit être entre 1 et 10000"),

  body("tarif_plein")
    .notEmpty()
    .withMessage("Le tarif plein est requis")
    .isFloat({ min: 0, max: 1000 })
    .withMessage("Le tarif doit être entre 0 et 1000"),

  handleValidationErrors,
];

// Validations pour les réservations
const validateReservation = [
  body("id_concert")
    .notEmpty()
    .withMessage("L'ID du concert est requis")
    .isInt()
    .withMessage("L'ID doit être un nombre"),

  body("quantite")
    .notEmpty()
    .withMessage("La quantité est requise")
    .isInt({ min: 1, max: 100 })
    .withMessage("La quantité doit être entre 1 et 100"),

  handleValidationErrors,
];

export {
  validateInscription,
  validateConnexion,
  validateConcert,
  validateReservation,
  passwordSchema,
  handleValidationErrors,
};
