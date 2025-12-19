import React, { createContext, useState, useCallback } from 'react';

/**
 * 💳 STRIPE CONTEXT
 * Gère les opérations de paiement Stripe
 */
const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [montantTotal, setMontantTotal] = useState(0);
    const [idCommande, setIdCommande] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 1️⃣ CRÉER UNE INTENT DE PAIEMENT
     * Appelle le backend pour initialiser le paiement Stripe
     */
    const creerPaymentIntent = useCallback(async (montant, nombreArticles) => {
        setIsLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                throw new Error('Vous devez être connecté');
            }

            const response = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    montant_total: montant,
                    nombre_articles: nombreArticles
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erreur lors de la création du paiement');
            }

            const data = await response.json();

            setClientSecret(data.clientSecret);
            setMontantTotal(data.montant);
            setIdCommande(data.id_commande);

            return {
                success: true,
                clientSecret: data.clientSecret,
                idCommande: data.id_commande
            };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * 2️⃣ CONFIRMER LE PAIEMENT
     * Appelle le backend après que Stripe a confirmé le paiement
     */
    const confirmPayment = useCallback(async (paiementId) => {
        setIsLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                throw new Error('Vous devez être connecté');
            }

            const response = await fetch('/api/stripe/confirm-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    paiement_id: paiementId
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erreur lors de la confirmation du paiement');
            }

            const data = await response.json();

            return {
                success: true,
                message: data.message,
                idCommande: data.id_commande
            };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * 🔄 RÉINITIALISER L'ÉTAT
     */
    const reset = useCallback(() => {
        setClientSecret(null);
        setMontantTotal(0);
        setIdCommande(null);
        setError(null);
    }, []);

    const value = {
        clientSecret,
        montantTotal,
        idCommande,
        isLoading,
        error,
        creerPaymentIntent,
        confirmPayment,
        reset
    };

    return (
        <StripeContext.Provider value={value}>
            {children}
        </StripeContext.Provider>
    );
};

/**
 * Hook pour utiliser le contexte Stripe
 */
export const useStripe = () => {
    const context = React.useContext(StripeContext);
    if (!context) {
        throw new Error('useStripe doit être utilisé à l\'intérieur de StripeProvider');
    }
    return context;
};
