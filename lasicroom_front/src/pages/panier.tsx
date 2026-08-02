import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../composants/NavbarUser";
import Footer from "../composants/Footer";
import HeaderUser from "../composants/HeaderUser";
import Paiementpage from "./paiementpage";
import { usePanier } from "../contexts/PanierContext";
import { useStripe } from "../contexts/StripeContext";
import "../styles/panier.css";

const Panier = () => {
  const navigate = useNavigate();
  const {
    articles,
    total,
    modifierQuantite,
    supprimerArticle,
    checkout,
    chargerPanier,
  } = usePanier();
  const { creerPaymentIntent } = useStripe();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [afficherFormulairePaiement, setAfficherFormulairePaiement] =
    useState(false);

  /**
   * 👋 DÉCONNEXION
   */
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // Charger le panier au montage du composant
  useEffect(() => {
    chargerPanier();
  }, [chargerPanier]);

  /**
   * 📥 AUGMENTER LA QUANTITÉ
   */
  const handleAugmenterQuantite = async (id_panier, quantiteActuelle) => {
    const nouvelleQuantite = quantiteActuelle + 1;
    await modifierQuantite(id_panier, nouvelleQuantite);
  };

  /**
   * 📤 DIMINUER LA QUANTITÉ
   */
  const handleDiminuerQuantite = async (id_panier, quantiteActuelle) => {
    if (quantiteActuelle > 1) {
      const nouvelleQuantite = quantiteActuelle - 1;
      await modifierQuantite(id_panier, nouvelleQuantite);
    }
  };

  /**
   * 🗑️ SUPPRIMER UN ARTICLE
   */
  const handleSupprimerArticle = async (id_panier) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await supprimerArticle(id_panier);
    }
  };

  /**
   * 💳 FINALISER L'ACHAT (appelle le backend pour créer une commande Stripe)
   */
  const handleCheckout = async () => {
    if (window.confirm(`Confirmer la commande pour ${total}€ ?`)) {
      setIsCheckingOut(true);

      // 1️⃣ Valider le panier côté backend (vérifier les quantités, prix)
      const resultCheckout = await checkout();

      if (!resultCheckout || !resultCheckout.message) {
        setIsCheckingOut(false);
        return;
      }

      // 2️⃣ Créer une intent de paiement Stripe
      const montantTotal = total;
      const resultPayment = await creerPaymentIntent(
        montantTotal,
        articles.length,
      );

      if (resultPayment.success) {
        // 3️⃣ Sauvegarder le clientSecret en sessionStorage pour le formulaire
        sessionStorage.setItem("clientSecret", resultPayment.clientSecret);
        sessionStorage.setItem("montantTotal", montantTotal.toString());
        sessionStorage.setItem(
          "utilisateurNom",
          sessionStorage.getItem("utilisateur")
            ? JSON.parse(sessionStorage.getItem("utilisateur")).nom
            : "Utilisateur",
        );

        // 4️⃣ Afficher le formulaire de paiement
        setAfficherFormulairePaiement(true);
      } else {
        alert(`Erreur : ${resultPayment.error}`);
      }

      setIsCheckingOut(false);
    }
  };

  /**
   * ✅ SUCCÈS DU PAIEMENT
   */
  const handlePaiementSuccess = (idCommande) => {
    sessionStorage.removeItem("clientSecret");
    alert(
      `✅ Paiement réussi ! Commande #${idCommande}\nVous allez être redirigé vers vos réservations.`,
    );
    navigate("/dashboard");
  };

  /**
   * ❌ ANNULER LE PAIEMENT
   */
  const handlePaiementCancel = () => {
    setAfficherFormulairePaiement(false);
  };

  /**
   * 🔄 CONTINUER LES ACHATS
   */
  const handleContinuerShopping = () => {
    navigate("/billetterie");
  };

  return (
    <div>
      <HeaderUser />
      <div
        className="div_navbar"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavbarUser />
        <button className="button_rouge" onClick={handleLogout}>
          👉 Déconnexion
        </button>
      </div>

      <main className="panier-container">
        <h1>🛒 Mon panier</h1>

        {/* PANIER VIDE */}
        {articles.length === 0 ? (
          <div className="panier-vide">
            <p>Votre panier est vide</p>
            <button className="btn-continuer" onClick={handleContinuerShopping}>
              ↪️ Continuer les achats
            </button>
          </div>
        ) : (
          <>
            {/* TABLEAU DES ARTICLES */}
            <div className="panier-articles">
              <table className="tableau-panier">
                <thead>
                  <tr>
                    <th>Concert</th>
                    <th>Tarif</th>
                    <th>Prix unitaire</th>
                    <th>Quantité</th>
                    <th>Sous-total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id_panier}>
                      <td>
                        <strong>{article.titre}</strong>
                        <br />
                        <small>
                          {new Date(article.date_concert).toLocaleDateString(
                            "fr-FR",
                          )}
                        </small>
                      </td>
                      <td>
                        {article.type_tarif === "plein"
                          ? "🎫 Plein"
                          : "🎟️ Abonné"}
                      </td>
                      <td>{article.prix_unitaire.toFixed(2)}€</td>
                      <td>
                        <div className="controle-quantite">
                          <button
                            className="btn-moins"
                            onClick={() =>
                              handleDiminuerQuantite(
                                article.id_panier,
                                article.quantite,
                              )
                            }
                            disabled={article.quantite === 1}
                          >
                            −
                          </button>
                          <span className="quantite">{article.quantite}</span>
                          <button
                            className="btn-plus"
                            onClick={() =>
                              handleAugmenterQuantite(
                                article.id_panier,
                                article.quantite,
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <strong>{article.sous_total.toFixed(2)}€</strong>
                      </td>
                      <td>
                        <button
                          className="btn-supprimer"
                          onClick={() =>
                            handleSupprimerArticle(article.id_panier)
                          }
                          title="Supprimer cet article"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RÉSUMÉ ET ACTIONS */}
            <div className="panier-resume">
              <div className="resume-contenu">
                <h3>Résumé de la commande</h3>
                <div className="ligne-total">
                  <span>Nombre d'articles :</span>
                  <strong>{articles.length} article(s)</strong>
                </div>
                <div className="ligne-total">
                  <span>Nombre de billets :</span>
                  <strong>
                    {articles.reduce((sum, a) => sum + a.quantite, 0)} billet(s)
                  </strong>
                </div>
                <hr />
                <div className="ligne-total total">
                  <span>TOTAL :</span>
                  <strong>{total.toFixed(2)}€</strong>
                </div>
              </div>

              <div className="actions-panier">
                <button
                  className="btn-checkout"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "⏳ Traitement..." : "💳 Passer la commande"}
                </button>
                <button
                  className="btn-continuer-shopping"
                  onClick={handleContinuerShopping}
                >
                  ↪️ Continuer les achats
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 💳 PAGE DE PAIEMENT (affichage conditionnel) */}
      {afficherFormulairePaiement && (
        <Paiementpage
          onSuccess={handlePaiementSuccess}
          onCancel={handlePaiementCancel}
        />
      )}

      <Footer />
    </div>
  );
};

export default Panier;
