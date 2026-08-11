import { Request, Response } from "express";

// Contrôleur pour les streams live - à implémenter
export const obtenirLiveStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({ live: false, message: "Live stream non disponible." });
  } catch (erreur) {
    console.error("Erreur dans obtenirLiveStatus :", erreur);
    res.status(500).json({ erreur: "Erreur lors de la vérification du live." });
  }
};

export const demarrerLive = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({ message: "Live stream démarré." });
  } catch (erreur) {
    console.error("Erreur dans demarrerLive :", erreur);
    res.status(500).json({ erreur: "Erreur lors du démarrage du live." });
  }
};

export const arreterLive = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    res.json({ message: "Live stream arrêté." });
  } catch (erreur) {
    console.error("Erreur dans arreterLive :", erreur);
    res.status(500).json({ erreur: "Erreur lors de l'arrêt du live." });
  }
};
