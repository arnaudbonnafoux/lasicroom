import React, {
  createContext,
  useContext,
  useState,
  useCallback,
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * 📥 CHARGER LE PANIER DEPUIS LE SERVEUR
   */
  const chargerPanier = useCallback(async (): Promise<void> => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/panier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
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
        const response = await fetch("/api/panier", {
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
          const dataResponse = await fetch("/api/panier", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (dataResponse.ok) {
            const data = await dataResponse.json();
            setArticles(data.articles || []);
            setTotal(data.total || 0);
          }
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
      const token = sessionStorage.getItem("token");

      if (!token) return false;

      try {
        const response = await fetch(`/api/panier/${id_panier}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantite }),
        });

        if (response.ok) {
          const dataResponse = await fetch("/api/panier", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (dataResponse.ok) {
            const data = await dataResponse.json();
            setArticles(data.articles || []);
            setTotal(data.total || 0);
          }
          return true;
        } else {
          const erreur = await response.json();
          alert("Erreur : " + (erreur.erreur || "Erreur inconnue"));
          return false;
        }
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
      const token = sessionStorage.getItem("token");

      if (!token) return false;

      try {
        const response = await fetch(`/api/panier/${id_panier}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const dataResponse = await fetch("/api/panier", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (dataResponse.ok) {
            const data = await dataResponse.json();
            setArticles(data.articles || []);
            setTotal(data.total || 0);
          }
          return true;
        } else {
          const erreur = await response.json();
          alert("Erreur : " + (erreur.erreur || "Erreur inconnue"));
          return false;
        }
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
    const token = sessionStorage.getItem("token");

    if (!token) return false;

    try {
      const response = await fetch("/api/panier", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setArticles([]);
        setTotal(0);
        return true;
      } else {
        const erreur = await response.json();
        alert("Erreur : " + (erreur.erreur || "Erreur inconnue"));
        return false;
      }
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
      const response = await fetch("/api/panier/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles([]);
        setTotal(0);
        return data;
      } else {
        const erreur = await response.json();
        alert(
          "Erreur lors de la finalisation : " +
            (erreur.erreur || "Erreur inconnue"),
        );
        return false;
      }
    } catch (error) {
      console.error("Erreur lors du checkout :", error);
      alert("Erreur réseau ou serveur");
      return false;
    }
  }, [articles]);

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
