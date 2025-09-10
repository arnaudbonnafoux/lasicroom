import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';
import CardConcert from '../composants/CardConcert';
import '../styles/billetterie.css';

const Billetterie = () => {
  const navigate = useNavigate();

  // Liste des concerts récupérés depuis l’API
  const [concerts, setConcerts] = useState([]);

  // ID du concert sélectionné par l’utilisateur (depuis la liste déroulante)
  const [selectedConcertId, setSelectedConcertId] = useState(null);

  // Objet concert correspondant à l’ID sélectionné
  const [selectedConcert, setSelectedConcert] = useState(null);

  // Tarif choisi (par défaut : plein tarif)
  const [tarif, setTarif] = useState('plein');

  // Au chargement du composant → récupération des concerts via l’API
  useEffect(() => {
    fetch('/api/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((error) => console.error("Erreur lors du chargement des concerts :", error));
  }, []);

  // Chaque fois que l’utilisateur change de concert → mise à jour de l’objet `selectedConcert`
  useEffect(() => {
    const concert = concerts.find(c => c.id_concert === Number(selectedConcertId));
    setSelectedConcert(concert);
  }, [selectedConcertId, concerts]);

  // Fonction appelée lors du clic sur "Payer"
  const handlePayer = async () => {
    const utilisateurStr = sessionStorage.getItem('utilisateur');
    const utilisateur = utilisateurStr ? JSON.parse(utilisateurStr) : null;
    const token = sessionStorage.getItem('token');

    // Si l’utilisateur n’est pas connecté → redirection vers la connexion
    if (!utilisateur) {
      alert("Vous devez être connecté pour réserver.");
      navigate('/connexion');
      return;
    }

    // Si aucun concert n’est sélectionné → message d’erreur
    if (!selectedConcert) {
      alert("Veuillez sélectionner un concert.");
      return;
    }

    // Création de l’objet réservation
    const reservation = {
      //id_utilisateur: utilisateur.id_utilisateur, modif
      id_concert: selectedConcert.id_concert,
      type_tarif: tarif,
      montant: tarif === 'plein' ? selectedConcert.tarif_plein : selectedConcert.tarif_abonne
    };

    try {
      // Envoi de la réservation au serveur
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Envoi du token pour authentification
        },
        body: JSON.stringify(reservation)
      });

      // Si réservation réussie → confirmation + redirection
      if (response.ok) {
        alert("Réservation effectuée avec succès !");
        navigate('/dashboard');
      } else {
        // En cas d’erreur renvoyée par le serveur
        const erreur = await response.json();
        alert("Erreur lors de la réservation : " + (erreur.message || "inconnue"));
      }
    } catch (error) {
      // Si problème réseau ou serveur
      alert("Erreur serveur ou réseau.");
    }
  };

  return (
    <div>
      <HeaderUser />
      <NavbarUser />
      <h1>Billetterie</h1>
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

        {/* Affichage de la fiche du concert sélectionné avec la prop true */}
        {selectedConcert && <CardConcert concert={selectedConcert} fullWidth={true} />}

        {/* Choix du type de tarif */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Type de tarif :</label>
          <select value={tarif} onChange={(e) => setTarif(e.target.value)}>
            <option value="plein">Plein tarif</option>
            <option value="abonne">Tarif abonné</option>
          </select>
        </form>

        {/* Bouton pour lancer la réservation */}
        <button
          onClick={handlePayer}
          className="btn_payer button_bleu"
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
