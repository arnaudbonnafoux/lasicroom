import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe as useStripeContext } from '../contexts/StripeContext';
import '../styles/paiement_page.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

/**
 * 💳 PAGE DE PAIEMENT DÉDIÉE
 * Utilise PaymentElement avec ses propres options pour une meilleure mise en page
 */
const PaymentFormContent = ({ onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { confirmPayment, isLoading } = useStripeContext();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [montant, setMontant] = useState(0);

    useEffect(() => {
        const secret = sessionStorage.getItem('clientSecret');
        const montantTotal = sessionStorage.getItem('montantTotal');
        if (montantTotal) setMontant(parseFloat(montantTotal).toFixed(2));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            setMessage('Stripe n\'est pas chargé. Veuillez recharger la page.');
            return;
        }

        setIsProcessing(true);
        setMessage(null);

        try {
            // Confirmer le paiement avec Stripe
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });

            if (error) {
                setMessage(`Erreur de paiement : ${error.message}`);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
                // Confirmer le paiement dans notre backend
                const result = await confirmPayment(paymentIntent.id);

                if (result.success) {
                    setMessage(`✅ Paiement réussi ! Commande #${result.idCommande}`);
                    setTimeout(() => {
                        onSuccess(result.idCommande);
                    }, 1500);
                } else {
                    setMessage(`Erreur : ${result.error}`);
                }
            }
        } catch (err) {
            setMessage(`Erreur : ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="paiement-page-container">
            <div className="paiement-page">
                <h3>💳 Paiement sécurisé</h3>
                <p className="montant">Montant : <strong>{montant}€</strong></p>

                <form onSubmit={handleSubmit}>
                    <PaymentElement />

                    {message && (
                        <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <div className="formulaire-boutons">
                        <button
                            type="button"
                            className="btn-annuler"
                            onClick={onCancel}
                            disabled={isProcessing || isLoading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn-payer"
                            disabled={!stripe || !elements || isProcessing || isLoading}
                        >
                            {isProcessing || isLoading ? '⏳ Traitement...' : '💳 Payer'}
                        </button>
                    </div>
                </form>

                <p className="securite-message">
                    🔒 Paiement sécurisé par Stripe • Vos données sont chiffrées
                </p>
            </div>
        </div>
    );
};

const PaiementPage = ({ onSuccess, onCancel }) => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const secret = sessionStorage.getItem('clientSecret');
        if (secret) setClientSecret(secret);
    }, []);

    if (!clientSecret) {
        return <div>Chargement...</div>;
    }

    const options = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'light',
            variables: {
                colorPrimary: '#1e90ff',
                colorBackground: '#ffffff',
                colorText: '#1D2D44',
                colorDanger: '#fa755a',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                fontSizeBase: '16px'
            }
        }
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentFormContent onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
    );
};

export default PaiementPage;
