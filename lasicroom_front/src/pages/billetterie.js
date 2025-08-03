// Import Hooks
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import composants
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import CardConcert from '../composants/CardConcert';
// Import Styles
import '../styles/billetterie.css';

const Billetterie = () => {

  // Navigation
  const navigate = useNavigate();

  /*  État du composant
  const [valeur, setValeur] = useState(valeurInitiale);
  Quand un état change, un effet peut être déclenché via useEffect, en fonction des dépendances déclarées.
  => Principe de la programmation événementielle
  */
  const [concerts, setConcerts] = useState([]); // [] => Tabbleau vide
  const [selectedConcertId, setSelectedConcertId] = useState(null); // valeur null => rien de sélectionner
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [tarif, setTarif] = useState('plein'); // Valeur initiale => 'plein' par défaut

  // Charger les données de la table concert via une API
  useEffect(() => { 
    fetch('/api/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((error) => console.error("Erreur lors du chargement des concerts :", error));
  }, []); // [] => Charge les données uniquement au démarrage

  // Mise à jour du concert sélectionné
  useEffect(() => {
    const concert = concerts.find(c => c.id_concert === Number(selectedConcertId));
    setSelectedConcert(concert);
  }, [selectedConcertId, concerts]);

  // Fonction "handlePayer" (fonction fléchée asynchrone et anonyme)
  const handlePayer = async () => {
    //const utilisateurStr = localStorage.getItem('utilisateur');
    const utilisateurStr = sessionStorage.getItem('utilisateur');
    const utilisateur = utilisateurStr ? JSON.parse(utilisateurStr) : null;
    console.log("Utilisateur depuis sessionStorage :", utilisateur);
    
    if (!utilisateur || !selectedConcert) {
      alert("Utilisateur non connecté ou concert non sélectionné.");
      return;
    }

    const reservation = {
      id_utilisateur: utilisateur.id,
      id_concert: selectedConcert.id_concert,
      type_tarif: tarif,
      montant: tarif === 'plein' ? selectedConcert.tarif_plein : selectedConcert.tarif_abonne
    };

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });

      if (response.ok) {
        alert("Réservation effectuée avec succès !");
        sessionStorage.clear(); // Déconnexion
        navigate('/'); // Redirection vers accueil
      } else {
        const erreur = await response.json();
        alert("Erreur lors de la réservation : " + (erreur.message || "inconnue"));
      }
    } catch (error) {
      alert("Erreur serveur ou réseau.");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Billetterie</h1>

      <div className="bloc">
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

        {selectedConcert && <CardConcert concert={selectedConcert} fullWidth={true} />}

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Type de tarif :</label>
          <select value={tarif} onChange={(e) => setTarif(e.target.value)}>
            <option value="plein">Plein tarif</option>
            <option value="abonne">Tarif abonné</option>
          </select>
        </form>

        <button
          onClick={handlePayer}
          className="btn_payer"
          disabled={!selectedConcert}
        >
          Payer
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Billetterie;
