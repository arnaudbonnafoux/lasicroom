import { Request, Response } from "express";
import pool from "../db";

interface PanierItem {
  id_concert: number;
  quantite: number;
  type_tarif: string;
}

// Ajouter au panier
export const ajouterAuPanier = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id_concert, quantite, type_tarif } = req.body as PanierItem;

  try {
    // Vérifier que le concert existe
    const concert = await pool.query(
      "SELECT * FROM concert WHERE id_concert = $1",
      [id_concert],
    );

    if (concert.rowCount === 0) {
      res.status(404).json({ erreur: "Concert non trouvé." });
      return;
    }

    res.json({
      message: "Concert ajouté au panier.",
      item: { id_concert, quantite, type_tarif },
    });
  } catch (erreur) {
    console.error("Erreur dans ajouterAuPanier :", erreur);
    res.status(500).json({ erreur: "Erreur lors de l'ajout au panier." });
  }
};

// Vider le panier
export const viderPanier = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({ message: "Panier vidé." });
  } catch (erreur) {
    console.error("Erreur dans viderPanier :", erreur);
    res.status(500).json({ erreur: "Erreur lors du vidage du panier." });
  }
};

// Récupérer le panier
export const obtenirPanier = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({ items: [] });
  } catch (erreur) {
    console.error("Erreur dans obtenirPanier :", erreur);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la récupération du panier." });
  }
};
