import { Request, Response } from "express";
import pool from "../db";

// Récupérer tous les accompagnements
export const obtenirAccompagnements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resultat = await pool.query("SELECT * FROM accompagnement");
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
  const { titre, description, prix } = req.body;

  try {
    const resultat = await pool.query(
      `INSERT INTO accompagnement (titre, description, prix)
       VALUES ($1, $2, $3) RETURNING *`,
      [titre, description, prix],
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
      "DELETE FROM accompagnement WHERE id_accompagnement = $1 RETURNING *",
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
