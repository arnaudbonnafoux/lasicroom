import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react";

/**
 * 💳 STRIPE CONTEXT TYPES
 */
interface StripeContextType {
  clientSecret: string | null;
  montantTotal: number;
  idCommande: string | null;
  isLoading: boolean;
  error: string | null;
  creerPaymentIntent: (
    montant: number,
    nombreArticles: number,
  ) => Promise<{
    success: boolean;
    clientSecret?: string;
    idCommande?: string;
    error?: string;
  }>;
  confirmPayment: (paiementId: string) => Promise<{
    success: boolean;
    message?: string;
    idCommande?: string;
    error?: string;
  }>;
  reset: () => void;
}

interface StripeProviderProps {
  children: ReactNode;
}

/**
 * 💳 StripeContext
 */
const StripeContext = createContext<StripeContextType | undefined>(undefined);

/**
 * Stripe Provider
 */
export const StripeProvider: FC<StripeProviderProps> = ({
  children,
}): React.ReactElement => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [montantTotal, setMontantTotal] = useState<number>(0);
  const [idCommande, setIdCommande] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 1️⃣ CRÉER UNE INTENT DE PAIEMENT
   */
  const creerPaymentIntent = useCallback(
    async (
      montant: number,
      nombreArticles: number,
    ): Promise<{
      success: boolean;
      clientSecret?: string;
      idCommande?: string;
      error?: string;
    }> => {
      setIsLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Vous devez être connecté");
        }

        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            montant_total: montant,
            nombre_articles: nombreArticles,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.message || "Erreur lors de la création du paiement",
          );
        }

        const data = await response.json();

        setClientSecret(data.clientSecret);
        setMontantTotal(data.montant);
        setIdCommande(data.id_commande);

        return {
          success: true,
          clientSecret: data.clientSecret,
          idCommande: data.id_commande,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * 2️⃣ CONFIRMER LE PAIEMENT
   */
  const confirmPayment = useCallback(
    async (
      paiementId: string,
    ): Promise<{
      success: boolean;
      message?: string;
      idCommande?: string;
      error?: string;
    }> => {
      setIsLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("Vous devez être connecté");
        }

        const response = await fetch("/api/stripe/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paiement_id: paiementId,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.message || "Erreur lors de la confirmation du paiement",
          );
        }

        const data = await response.json();

        return {
          success: true,
          message: data.message,
          idCommande: data.id_commande,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur inconnue";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * 🔄 RÉINITIALISER L'ÉTAT
   */
  const reset = useCallback((): void => {
    setClientSecret(null);
    setMontantTotal(0);
    setIdCommande(null);
    setError(null);
  }, []);

  const value: StripeContextType = {
    clientSecret,
    montantTotal,
    idCommande,
    isLoading,
    error,
    creerPaymentIntent,
    confirmPayment,
    reset,
  };

  return (
    <StripeContext.Provider value={value}>{children}</StripeContext.Provider>
  );
};

/**
 * Hook pour utiliser le contexte Stripe
 */
export const useStripe = (): StripeContextType => {
  const context = React.useContext(StripeContext);
  if (!context) {
    throw new Error(
      "useStripe doit être utilisé à l'intérieur de StripeProvider",
    );
  }
  return context;
};

export default StripeContext;
