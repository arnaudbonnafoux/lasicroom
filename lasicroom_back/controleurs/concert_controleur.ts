import { Request, Response } from "express";
import xss from "xss";
import pool from "../db";

// Créer un nouveau concert
export const creerConcert = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let {
    titre,
    description,
    date_concert,
    nb_places_total,
    tarif_plein,
    tarif_abonne,
    id_artiste,
  } = req.body;

  // Nettoyage XSS
  titre = xss(titre);
  description = xss(description);

  try {
    // Insère le concert en base de données, initialise nb_places_restantes au total
    const resultat = await pool.query(
      `INSERT INTO concert (
        titre, description, date_concert,
        nb_places_total, nb_places_restantes, tarif_plein, tarif_abonne, id_artiste
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        titre,
        description,
        date_concert,
        nb_places_total,
        nb_places_total, // Initialise les places restantes au total
        tarif_plein,
        tarif_abonne,
        id_artiste,
      ],
    );

    res.status(201).json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans creerConcert :", erreur);
    res.status(500).json({ erreur: "Erreur lors de l'ajout du concert." });
  }
};

// Récupérer tous les concerts
export const obtenirConcerts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resultat = await pool.query(
      `SELECT c.*, a.nom_artiste, a.photo, a.lien_video
       FROM concert c
       JOIN artiste a ON c.id_artiste = a.id_artiste
       ORDER BY c.date_concert ASC`,
    );
    res.json(resultat.rows);
  } catch (erreur) {
    console.error("Erreur dans obtenirConcerts :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la récupération des concerts." });
  }
};

// Récupérer un concert par ID
export const obtenirConcertById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const resultat = await pool.query(
      `SELECT c.*, a.nom_artiste, a.photo, a.lien_video
       FROM concert c
       JOIN artiste a ON c.id_artiste = a.id_artiste
       WHERE c.id_concert = $1`,
      [id],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Concert non trouvé." });
      return;
    }

    res.json(resultat.rows[0]);
  } catch (erreur) {
    console.error("Erreur dans obtenirConcertById :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la récupération du concert." });
  }
};

// Mettre à jour un concert existant
export const mettreAJourConcert = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  let {
    titre,
    description,
    date_concert,
    nb_places_total,
    tarif_plein,
    tarif_abonne,
    id_artiste,
  } = req.body;

  // Nettoyage XSS
  titre = xss(titre);
  description = xss(description);

  try {
    const resultat = await pool.query(
      `UPDATE concert
       SET titre = $1, description = $2, date_concert = $3, nb_places_total = $4, tarif_plein = $5, tarif_abonne = $6, id_artiste = $7
       WHERE id_concert = $8 RETURNING *`,
      [
        titre,
        description,
        date_concert,
        nb_places_total,
        tarif_plein,
        tarif_abonne,
        id_artiste,
        id,
      ],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Concert non trouvé." });
      return;
    }

    res.json({
      message: "Concert mis à jour avec succès",
      concert: resultat.rows[0],
    });
  } catch (erreur) {
    console.error("Erreur dans mettreAJourConcert :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la mise à jour du concert." });
  }
};

// Supprimer un concert
export const supprimerConcert = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const resultat = await pool.query(
      "DELETE FROM concert WHERE id_concert = $1 RETURNING *",
      [id],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Concert non trouvé." });
      return;
    }

    res.json({ message: "Concert supprimé avec succès." });
  } catch (erreur) {
    console.error("Erreur dans supprimerConcert :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la suppression du concert." });
  }
};
