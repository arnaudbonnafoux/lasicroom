import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db";

dotenv.config();
const CLE_SECRETE = process.env.CLE_SECRETE || "";

// Fonction de connexion d'un utilisateur
export const connecterUtilisateur = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, mot_de_passe } = req.body as {
    email: string;
    mot_de_passe: string;
  };

  try {
    // Recherche l'utilisateur correspondant à l'email dans la base de données
    const resultat = await pool.query(
      "SELECT * FROM utilisateur WHERE email = $1",
      [email],
    );

    if (resultat.rowCount === 0) {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    const utilisateur = resultat.rows[0];

    // Compare le mot de passe fourni avec le mot de passe haché stocké en base
    const motDePasseValide = await bcrypt.compare(
      mot_de_passe,
      utilisateur.mot_de_passe,
    );

    if (!motDePasseValide) {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
      return;
    }

    // Génère un token JWT contenant l'id et le rôle de l'utilisateur, valable 2 heures
    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        role: utilisateur.role,
      },
      CLE_SECRETE,
      { expiresIn: "2h" },
    );

    // Renvoie le token et les infos principales de l'utilisateur au client
    res.json({
      message: "Connexion réussie.",
      token,
      utilisateur: {
        id_utilisateur: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (erreur) {
    console.error("Erreur de connexion :", erreur);
    res.status(500).json({ message: "Erreur serveur lors de la connexion." });
  }
};
