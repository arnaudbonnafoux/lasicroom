import { Request, Response } from "express";
import xss from "xss";
import pool from "../db";
import { Artiste, ArtisteCreateRequest } from "../types";

// Récupérer un ou plusieurs artistes
export const obtenirArtiste = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nom } = req.query as { nom?: string };

    // Si un nom est fourni, on le nettoie et on cherche l'artiste correspondant (LOWER => insensible à la casse)
    if (nom) {
      const nomNettoye = xss(nom.trim());
      const resultat = await pool.query(
        "SELECT * FROM artiste WHERE LOWER(nom_artiste) = LOWER($1)",
        [nomNettoye],
      );
      res.json(resultat.rows);
      return;
    }

    // Sinon, on renvoie tous les artistes
    const tousLesArtistes = await pool.query("SELECT * FROM artiste");
    res.json(tousLesArtistes.rows);
  } catch (err) {
    console.error("Erreur dans obtenirArtiste :", err);
    res.status(500).json({
      erreur: "Erreur lors de la récupération des artistes.",
    });
  }
};

// Créer un nouvel artiste
export const creerArtiste = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Récupère et nettoie les champs du corps de la requête
    let { nom_artiste, style_musical, description, lien_video } =
      req.body as ArtisteCreateRequest;
    nom_artiste = xss(nom_artiste.trim());
    style_musical = xss(style_musical.trim());
    description = xss(description.trim());
    lien_video = lien_video ? xss(lien_video.trim()) : undefined;

    // Récupère le chemin de la photo uploadée si présente
    const photo = req.file ? `photos_artistes/${req.file.filename}` : undefined;

    // validation simple
    if (!nom_artiste || !description) {
      res.status(400).json({ message: "Nom et description obligatoires." });
      return;
    }

    // Insertion de l'artiste en base de données
    const resultat = await pool.query(
      `INSERT INTO artiste (nom_artiste, style_musical, description, photo, lien_video)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nom_artiste, style_musical, description, photo, lien_video],
    );

    res.status(201).json(resultat.rows[0]);
  } catch (error) {
    console.error("Erreur lors de la création de l'artiste :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Mettre à jour un artiste existant
export const mettreAJourArtiste = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    let { nom_artiste, style_musical, description, lien_video } =
      req.body as ArtisteCreateRequest;

    nom_artiste = xss(nom_artiste.trim());
    style_musical = xss(style_musical.trim());
    description = xss(description.trim());
    lien_video = lien_video ? xss(lien_video.trim()) : undefined;

    // Prend la nouvelle photo si uploadée, sinon garde l'ancienne
    const photo = req.file
      ? `photos_artistes/${req.file.filename}`
      : req.body.photo;

    const resultat = await pool.query(
      `UPDATE artiste
       SET nom_artiste = $1, style_musical = $2, description = $3, photo = $4, lien_video = $5
       WHERE id_artiste = $6 RETURNING *`,
      [nom_artiste, style_musical, description, photo, lien_video, id],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Artiste non trouvé." });
      return;
    }

    res.json({
      message: "Artiste mis à jour avec succès",
      artiste: resultat.rows[0],
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ erreur: "Erreur serveur." });
  }
};

// Supprimer un artiste
export const supprimerArtiste = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const resultat = await pool.query(
      "DELETE FROM artiste WHERE id_artiste = $1 RETURNING *",
      [id],
    );

    if (resultat.rowCount === 0) {
      res.status(404).json({ message: "Artiste non trouvé." });
      return;
    }

    res.json({ message: "Artiste supprimé avec succès." });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({
      erreur: "Erreur lors de la suppression de l'artiste.",
    });
  }
};
