import { Request, Response } from "express";
import pool from "../db";

// Récupérer tous les accompagnements
export const obtenirAccompagnements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resultat = await pool.query(
      "SELECT * FROM accompagnement ORDER BY date_envoi DESC, id_demande DESC",
    );
    res.json(resultat.rows);
  } catch (erreur) {
    console.error("Erreur dans obtenirAccompagnements :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la récupération des accompagnements." });
  }
};

// Créer un accompagnement
export const creerAccompagnement = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { nom_artiste, email_artiste, style_musical, message } = req.body;

  if (!nom_artiste || !email_artiste) {
    res
      .status(400)
      .json({ erreur: "Les champs nom_artiste et email_artiste sont requis." });
    return;
  }

  try {
    const resultat = await pool.query(
      `INSERT INTO accompagnement (nom_artiste, email_artiste, style_musical, message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        nom_artiste,
        email_artiste,
        style_musical && style_musical.trim() !== "" ? style_musical : null,
        message && message.trim() !== "" ? message : null,
      ],
    );

    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans creerAccompagnement :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la création de l'accompagnement." });
  }
};

// Supprimer un accompagnement
export const supprimerAccompagnement = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const resultat = await pool.query(
      "DELETE FROM accompagnement WHERE id_demande = $1 RETURNING *",
      [id],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Accompagnement non trouvé." });
      return;
    }

    res.json({ message: "Accompagnement supprimé avec succès." });
  } catch (erreur) {
    console.error("Erreur dans supprimerAccompagnement :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la suppression de l'accompagnement." });
  }
};
