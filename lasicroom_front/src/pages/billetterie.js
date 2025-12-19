import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';
import CardConcert from '../composants/CardConcert';
import { usePanier } from '../contexts/PanierContext';
import '../styles/billetterie.css';

const Billetterie = () => {
  const navigate = useNavigate();
  const { ajouterAuPanier, nombreArticles } = usePanier();

  // Liste des concerts récupérés depuis l'API
  const [concerts, setConcerts] = useState([]);

  // ID du concert sélectionné par l'utilisateur (depuis la liste déroulante)
  const [selectedConcertId, setSelectedConcertId] = useState(null);

  // Objet concert correspondant à l'ID sélectionné
  const [selectedConcert, setSelectedConcert] = useState(null);

  // Tarif choisi (par défaut : plein tarif)
  const [tarif, setTarif] = useState('plein');

  // Quantité de billets (par défaut : 1)
  const [quantite, setQuantite] = useState(1);

  // État du chargement
  const [isLoading, setIsLoading] = useState(false);

  // Au chargement du composant → récupération des concerts via l'API
  useEffect(() => {
    fetch('/api/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((error) => console.error("Erreur lors du chargement des concerts :", error));
  }, []);

  // Chaque fois que l'utilisateur change de concert → mise à jour de l'objet `selectedConcert`
  useEffect(() => {
    const concert = concerts.find(c => c.id_concert === Number(selectedConcertId));
    setSelectedConcert(concert);
  }, [selectedConcertId, concerts]);

  /**
   * ➕ AJOUTER AU PANIER (nouveau flux)
   */
  const handleAjouterAuPanier = async () => {
    const utilisateurStr = sessionStorage.getItem('utilisateur');
    const utilisateur = utilisateurStr ? JSON.parse(utilisateurStr) : null;

    // Si l'utilisateur n'est pas connecté → redirection vers la connexion
    if (!utilisateur) {
      alert("Vous devez être connecté pour ajouter au panier.");
      navigate('/connexion');
      return;
    }

    // Si aucun concert n'est sélectionné → message d'erreur
    if (!selectedConcert) {
      alert("Veuillez sélectionner un concert.");
      return;
    }

    if (quantite <= 0) {
      alert("Veuillez sélectionner au moins 1 billet.");
      return;
    }

    setIsLoading(true);

    // Ajouter au panier via le context
    const succes = await ajouterAuPanier(
      selectedConcert.id_concert,
      tarif,
      parseInt(quantite)
    );

    setIsLoading(false);

    if (succes) {
      alert(`✓ ${quantite} billet(s) ajouté(s) au panier !`);
      // Réinitialiser les champs
      setQuantite(1);
      setTarif('plein');
    }
  };

  /**
   * 🛒 ALLER AU PANIER
   */
  const handleAllerAuPanier = () => {
    navigate('/panier');
  };

  return (
    <div>
      <HeaderUser />
      <NavbarUser />
      <h1>🎫 Billetterie</h1>

      {/* Badge panier en haut */}
      {nombreArticles > 0 && (
        <div className="badge-panier-top">
          <p>Vous avez <strong>{nombreArticles} article(s)</strong> dans votre panier</p>
          <button className="btn-voir-panier" onClick={handleAllerAuPanier}>
            🛒 Voir le panier
          </button>
        </div>
      )}

      <div className="bloc">

        {/* Liste déroulante pour choisir un concert */}
        <label htmlFor="concert-select">Choisissez un concert :</label>
        <select
          id="concert-select"
          value={selectedConcertId || ''}
          onChange={(e) => setSelectedConcertId(e.target.value)}
        >
          <option value="">-- Sélectionnez un concert --</option>
          {concerts.map((concert) => (
            <option key={concert.id_concert} value={concert.id_concert}>
              {concert.titre} - {new Date(concert.date_concert).toLocaleDateString()}
            </option>
          ))}
        </select>

        {/* Affichage de la fiche du concert sélectionné */}
        {selectedConcert && <CardConcert concert={selectedConcert} fullWidth={true} />}

        {/* Formulaire de sélection : tarif + quantité */}
        {selectedConcert && (
          <form className="form-achat" onSubmit={(e) => e.preventDefault()}>
            <div className="form-groupe">
              <label htmlFor="tarif-select">Type de tarif :</label>
              <select 
                id="tarif-select"
                value={tarif} 
                onChange={(e) => setTarif(e.target.value)}
              >
                <option value="plein">🎫 Plein tarif ({selectedConcert.tarif_plein}€)</option>
                <option value="abonne">🎟️ Tarif abonné ({selectedConcert.tarif_abonne}€)</option>
              </select>
            </div>

            <div className="form-groupe">
              <label htmlFor="quantite-select">Nombre de billets :</label>
              <select 
                id="quantite-select"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
              >
                {Array.from({ length: Math.min(10, selectedConcert.nb_places_restantes) }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="info-stock">
              {selectedConcert.nb_places_restantes > 0 ? (
                <p>✓ <strong>{selectedConcert.nb_places_restantes}</strong> place(s) disponible(s)</p>
              ) : (
                <p>❌ <strong>Complet</strong></p>
              )}
            </div>

            {/* Calcul du prix total */}
            <div className="calcul-prix">
              <p>
                <strong>Montant :</strong>{' '}
                {quantite} × {tarif === 'plein' ? selectedConcert.tarif_plein : selectedConcert.tarif_abonne}€ = 
                <strong> {(quantite * parseFloat(tarif === 'plein' ? selectedConcert.tarif_plein : selectedConcert.tarif_abonne)).toFixed(2)}€</strong>
              </p>
            </div>
          </form>
        )}

        {/* Boutons d'action */}
        <div className="buttons-container">
          <button
            onClick={handleAjouterAuPanier}
            className="btn-ajouter-panier button_bleu"
            disabled={!selectedConcert || isLoading || selectedConcert.nb_places_restantes === 0}
          >
            {isLoading ? '⏳ Ajout en cours...' : '➕ Ajouter au panier'}
          </button>

          {nombreArticles > 0 && (
            <button
              onClick={handleAllerAuPanier}
              className="btn-voir-panier-bottom"
            >
              🛒 Voir le panier ({nombreArticles})
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Billetterie;
