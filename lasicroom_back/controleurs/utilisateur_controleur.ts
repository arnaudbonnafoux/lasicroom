import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import xss from "xss";
import dotenv from "dotenv";
import pool from "../db";

dotenv.config();
const CLE_SECRETE = process.env.CLE_SECRETE || "";

// Récupérer tous les utilisateurs
export const obtenirUtilisateur = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resultatRequete = await pool.query(
      `SELECT id_utilisateur, nom, email, role FROM utilisateur`,
    );
    res.status(200).json(resultatRequete.rows);
  } catch (erreur) {
    console.error("Erreur dans obtenirUtilisateur :", erreur);
    res.status(500).json({
      erreur: "Erreur lors de la récupération des utilisateurs.",
    });
  }
};

// Récupérer un utilisateur par son id
export const obtenirIdUtilisateur = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const resultatRequete = await pool.query(
      `SELECT id_utilisateur, nom, email, role FROM utilisateur WHERE id_utilisateur = $1`,
      [id],
    );

    if (resultatRequete.rowCount === 0) {
      res.status(404).json({ message: "Identifiant non trouvé" });
      return;
    }

    res.status(200).json(resultatRequete.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans obtenirIdUtilisateur :", erreur);
    res.status(500).json({
      erreur: "Erreur lors de la récupération de l'utilisateur.",
    });
  }
};

// Créer un nouvel utilisateur
export const creerUtilisateur = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let { nom, email, mot_de_passe, role } = req.body as {
    nom: string;
    email: string;
    mot_de_passe: string;
    role?: string;
  };

  // 🔐 Nettoyage XSS
  nom = xss(nom);
  email = xss(email);
  role = xss(role || "user");

  try {
    // Hachage du mot de passe avant stockage
    const motDePasseHashe = await bcrypt.hash(mot_de_passe, 10);

    const resultatRequete = await pool.query(
      `INSERT INTO utilisateur (nom, email, mot_de_passe, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id_utilisateur, nom, email, role`,
      [nom, email, motDePasseHashe, role],
    );

    const utilisateur = resultatRequete.rows[0];

    // Génère un token JWT pour l'utilisateur créé
    const token = jwt.sign(
      { id: utilisateur.id_utilisateur, role: utilisateur.role },
      CLE_SECRETE,
      { expiresIn: "2h" },
    );

    // Renvoie l'utilisateur créé et le token
    res.status(201).json({ utilisateur, token });
  } catch (erreur) {
    console.error("Erreur dans la création de l'utilisateur :", erreur);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'utilisateur",
    });
  }
};
