import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  FC,
} from "react";

/**
 * 🛒 TYPES PANIER
 */
interface Article {
  id_panier: number;
  id_concert: number;
  titre: string;
  date_concert: string;
  type_tarif: "plein" | "reduit";
  quantite: number;
  prix_unitaire: number;
  sous_total: number;
}

interface PanierContextType {
  articles: Article[];
  total: number;
  nombreArticles: number;
  chargerPanier: () => Promise<void>;
  ajouterAuPanier: (
    id_concert: number,
    type_tarif: string,
    quantite: number,
  ) => Promise<boolean>;
  modifierQuantite: (id_panier: number, quantite: number) => Promise<boolean>;
  supprimerArticle: (id_panier: number) => Promise<boolean>;
  viderPanier: () => Promise<boolean>;
  checkout: () => Promise<any>;
}

interface PanierProviderProps {
  children: ReactNode;
}

/**
 * 🛒 PanierContext
 * Gère l'état global du panier à travers toute l'application
 */
const PanierContext = createContext<PanierContextType | undefined>(undefined);

/**
 * Hook personnalisé pour utiliser le context du panier
 */
export const usePanier = (): PanierContextType => {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error("usePanier doit être utilisé au sein du PanierProvider");
  }
  return context;
};

/**
 * Provider du panier
 */
export const PanierProvider: FC<PanierProviderProps> = ({
  children,
}): React.ReactElement => {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const sauvegarde = sessionStorage.getItem("panierArticles");
      return sauvegarde ? (JSON.parse(sauvegarde) as Article[]) : [];
    } catch {
      return [];
    }
  });
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const total = useMemo(
    () => articles.reduce((somme, article) => somme + article.sous_total, 0),
    [articles],
  );

  useEffect(() => {
    sessionStorage.setItem("panierArticles", JSON.stringify(articles));
  }, [articles]);

  const recupererTokenCsrf = useCallback(async (): Promise<string | null> => {
    const token = sessionStorage.getItem("token");

    if (!token) return null;

    try {
      const response = await fetch("/api/panier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const headerToken = response.headers.get("X-CSRF-Token");
      if (headerToken) {
        setCsrfToken(headerToken);
      }

      // Le panier est maintenu localement dans sessionStorage.

      return headerToken;
    } catch (error) {
      console.error("Erreur lors de la récupération du token CSRF :", error);
      return null;
    }
  }, []);

  const obtenirHeadersMutations =
    useCallback(async (): Promise<HeadersInit> => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        throw new Error("Utilisateur non authentifié");
      }

      let tokenCsrf = csrfToken;
      if (!tokenCsrf) {
        tokenCsrf = await recupererTokenCsrf();
      }

      if (!tokenCsrf) {
        throw new Error("Token CSRF introuvable");
      }

      return {
        Authorization: `Bearer ${token}`,
        "X-CSRF-Token": tokenCsrf,
      };
    }, [csrfToken, recupererTokenCsrf]);

  /**
   * 📥 CHARGER LE PANIER DEPUIS LE SERVEUR
   */
  const chargerPanier = useCallback(async (): Promise<void> => {
    try {
      const sauvegarde = sessionStorage.getItem("panierArticles");
      setArticles(sauvegarde ? (JSON.parse(sauvegarde) as Article[]) : []);
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
      setArticles([]);
    }
  }, []);

  /**
   * ➕ AJOUTER UN ARTICLE AU PANIER
   */
  const ajouterAuPanier = useCallback(
    async (
      id_concert: number,
      type_tarif: string,
      quantite: number,
    ): Promise<boolean> => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Vous devez être connecté pour ajouter au panier");
        return false;
      }

      try {
        const response = await fetch("/api/panier/ajouter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_concert,
            type_tarif,
            quantite,
          }),
        });

        if (response.ok) {
          const concertResponse = await fetch(`/api/concerts/${id_concert}`);
          if (!concertResponse.ok) {
            throw new Error("Impossible de récupérer le concert ajouté.");
          }

          const concert = await concertResponse.json();
          const typeTarifNormalise =
            type_tarif === "abonne" ? "reduit" : type_tarif;
          const prixUnitaire =
            type_tarif === "abonne"
              ? Number(concert.tarif_abonne)
              : Number(concert.tarif_plein);

          setArticles((precedents) => {
            const articleExistant = precedents.find(
              (article) =>
                article.id_concert === id_concert &&
                article.type_tarif === typeTarifNormalise,
            );

            if (articleExistant) {
              return precedents.map((article) =>
                article.id_panier === articleExistant.id_panier
                  ? {
                      ...article,
                      quantite: article.quantite + quantite,
                      sous_total: (article.quantite + quantite) * prixUnitaire,
                    }
                  : article,
              );
            }

            const nouvelArticle: Article = {
              id_panier: Date.now(),
              id_concert,
              titre: concert.titre,
              date_concert: concert.date_concert,
              type_tarif: typeTarifNormalise === "reduit" ? "reduit" : "plein",
              quantite,
              prix_unitaire: prixUnitaire,
              sous_total: prixUnitaire * quantite,
            };

            return [...precedents, nouvelArticle];
          });
          return true;
        } else {
          const erreur = await response.json();
          alert("Erreur : " + (erreur.erreur || "Erreur inconnue"));
          return false;
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
        alert("Erreur réseau ou serveur");
        return false;
      }
    },
    [],
  );

  /**
   * 📝 MODIFIER LA QUANTITÉ D'UN ARTICLE
   */
  const modifierQuantite = useCallback(
    async (id_panier: number, quantite: number): Promise<boolean> => {
      try {
        setArticles((precedents) =>
          precedents.map((article) =>
            article.id_panier === id_panier
              ? {
                  ...article,
                  quantite,
                  sous_total: article.prix_unitaire * quantite,
                }
              : article,
          ),
        );
        return true;
      } catch (error) {
        console.error("Erreur lors de la modification :", error);
        alert("Erreur réseau ou serveur");
        return false;
      }
    },
    [],
  );

  /**
   * 🗑️ SUPPRIMER UN ARTICLE DU PANIER
   */
  const supprimerArticle = useCallback(
    async (id_panier: number): Promise<boolean> => {
      try {
        setArticles((precedents) =>
          precedents.filter((article) => article.id_panier !== id_panier),
        );
        return true;
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur réseau ou serveur");
        return false;
      }
    },
    [],
  );

  /**
   * 🗑️ VIDER COMPLÈTEMENT LE PANIER
   */
  const viderPanier = useCallback(async (): Promise<boolean> => {
    try {
      setArticles([]);
      sessionStorage.removeItem("panierArticles");
      return true;
    } catch (error) {
      console.error("Erreur lors du vidage :", error);
      alert("Erreur réseau ou serveur");
      return false;
    }
  }, []);

  /**
   * 💳 CHECKOUT : CRÉER LES RÉSERVATIONS
   */
  const checkout = useCallback(async (): Promise<any> => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour finaliser la commande");
      return false;
    }

    if (articles.length === 0) {
      alert("Votre panier est vide");
      return false;
    }

    try {
      const headers = await obtenirHeadersMutations();

      for (const article of articles) {
        for (let index = 0; index < article.quantite; index += 1) {
          const response = await fetch("/api/reservations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body: JSON.stringify({
              id_concert: article.id_concert,
              type_tarif:
                article.type_tarif === "reduit" ? "abonne" : article.type_tarif,
              montant: article.prix_unitaire,
            }),
          });

          if (!response.ok) {
            const erreur = await response.json();
            throw new Error(
              erreur.erreur ||
                erreur.message ||
                "Erreur lors de la création de la réservation",
            );
          }
        }
      }

      setArticles([]);
      sessionStorage.removeItem("panierArticles");

      return {
        message: "Réservations créées avec succès.",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur réseau ou serveur";
      alert(message);
      console.error("Erreur lors du checkout :", error);
      return false;
    }
  }, [articles, obtenirHeadersMutations]);

  const value: PanierContextType = {
    articles,
    total,
    nombreArticles: articles.length,
    chargerPanier,
    ajouterAuPanier,
    modifierQuantite,
    supprimerArticle,
    viderPanier,
    checkout,
  };

  return (
    <PanierContext.Provider value={value}>{children}</PanierContext.Provider>
  );
};

export default PanierContext;
