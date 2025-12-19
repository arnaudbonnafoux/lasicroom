import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * 🛒 PanierContext
 * Gère l'état global du panier à travers toute l'application
 * Évite le prop drilling et permet d'accéder au panier de n'importe quel composant
 */
const PanierContext = createContext();

/**
 * Hook personnalisé pour utiliser le context du panier
 * @returns {Object} Les articles du panier et les fonctions de manipulation
 */
export const usePanier = () => {
    const context = useContext(PanierContext);
    if (!context) {
        throw new Error('usePanier doit être utilisé au sein du PanierProvider');
    }
    return context;
};

/**
 * Provider du panier (à envelopper autour de l'app)
 */
export const PanierProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);

    /**
     * 📥 CHARGER LE PANIER DEPUIS LE SERVEUR
     * Appelé au montage du composant et après chaque modification
     */
    const chargerPanier = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('/api/panier', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setArticles(data.articles || []);
                setTotal(data.total || 0);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du panier :', error);
        }
    }, []);

    /**
     * ➕ AJOUTER UN ARTICLE AU PANIER
     * @param {number} id_concert - ID du concert
     * @param {string} type_tarif - 'plein' ou 'abonne'
     * @param {number} quantite - Nombre de billets
     */
    const ajouterAuPanier = useCallback(async (id_concert, type_tarif, quantite) => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            alert('Vous devez être connecté pour ajouter au panier');
            return false;
        }

        try {
            const response = await fetch('/api/panier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_concert,
                    type_tarif,
                    quantite
                })
            });

            if (response.ok) {
                // Recharger le panier
                const dataResponse = await fetch('/api/panier', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (dataResponse.ok) {
                    const data = await dataResponse.json();
                    setArticles(data.articles || []);
                    setTotal(data.total || 0);
                }
                return true;
            } else {
                const erreur = await response.json();
                alert('Erreur : ' + (erreur.erreur || 'Erreur inconnue'));
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier :', error);
            alert('Erreur réseau ou serveur');
            return false;
        }
    }, []);

    /**
     * 📝 MODIFIER LA QUANTITÉ D'UN ARTICLE
     * @param {number} id_panier - ID de l'article dans le panier
     * @param {number} quantite - Nouvelle quantité
     */
    const modifierQuantite = useCallback(async (id_panier, quantite) => {
        const token = sessionStorage.getItem('token');
        
        if (!token) return false;

        try {
            const response = await fetch(`/api/panier/${id_panier}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantite })
            });

            if (response.ok) {
                // Recharger le panier
                const dataResponse = await fetch('/api/panier', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (dataResponse.ok) {
                    const data = await dataResponse.json();
                    setArticles(data.articles || []);
                    setTotal(data.total || 0);
                }
                return true;
            } else {
                const erreur = await response.json();
                alert('Erreur : ' + (erreur.erreur || 'Erreur inconnue'));
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            alert('Erreur réseau ou serveur');
            return false;
        }
    }, []);

    /**
     * 🗑️ SUPPRIMER UN ARTICLE DU PANIER
     * @param {number} id_panier - ID de l'article dans le panier
     */
    const supprimerArticle = useCallback(async (id_panier) => {
        const token = sessionStorage.getItem('token');
        
        if (!token) return false;

        try {
            const response = await fetch(`/api/panier/${id_panier}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Recharger le panier
                const dataResponse = await fetch('/api/panier', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (dataResponse.ok) {
                    const data = await dataResponse.json();
                    setArticles(data.articles || []);
                    setTotal(data.total || 0);
                }
                return true;
            } else {
                const erreur = await response.json();
                alert('Erreur : ' + (erreur.erreur || 'Erreur inconnue'));
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            alert('Erreur réseau ou serveur');
            return false;
        }
    }, []);

    /**
     * 🗑️ VIDER COMPLÈTEMENT LE PANIER
     */
    const viderPanier = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) return false;

        try {
            const response = await fetch('/api/panier', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setArticles([]);
                setTotal(0);
                return true;
            } else {
                const erreur = await response.json();
                alert('Erreur : ' + (erreur.erreur || 'Erreur inconnue'));
                return false;
            }
        } catch (error) {
            console.error('Erreur lors du vidage :', error);
            alert('Erreur réseau ou serveur');
            return false;
        }
    }, []);

    /**
     * 💳 CHECKOUT : CRÉER LES RÉSERVATIONS
     * @returns {Object|boolean} détails de la commande si succès, false si erreur
     */
    const checkout = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            alert('Vous devez être connecté pour finaliser la commande');
            return false;
        }

        if (articles.length === 0) {
            alert('Votre panier est vide');
            return false;
        }

        try {
            const response = await fetch('/api/panier/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Vider le panier après un checkout réussi
                setArticles([]);
                setTotal(0);
                return data; // Retourner les détails de la commande
            } else {
                const erreur = await response.json();
                alert('Erreur lors de la finalisation : ' + (erreur.erreur || 'Erreur inconnue'));
                return false;
            }
        } catch (error) {
            console.error('Erreur lors du checkout :', error);
            alert('Erreur réseau ou serveur');
            return false;
        }
    }, [articles]);

    // Valeur du context à partager
    const value = {
        // État
        articles,
        total,
        nombreArticles: articles.length,

        // Méthodes
        chargerPanier,
        ajouterAuPanier,
        modifierQuantite,
        supprimerArticle,
        viderPanier,
        checkout
    };

    return (
        <PanierContext.Provider value={value}>
            {children}
        </PanierContext.Provider>
    );
};

export default PanierContext;
