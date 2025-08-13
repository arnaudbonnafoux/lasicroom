import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';
import CardConcert from '../composants/CardConcert';
import '../styles/billetterie.css';

const Billetterie = () => {
  const navigate = useNavigate();

  const [concerts, setConcerts] = useState([]);
  const [selectedConcertId, setSelectedConcertId] = useState(null);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [tarif, setTarif] = useState('plein');

  useEffect(() => {
    fetch('/api/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((error) => console.error("Erreur lors du chargement des concerts :", error));
  }, []);

  useEffect(() => {
    const concert = concerts.find(c => c.id_concert === Number(selectedConcertId));
    setSelectedConcert(concert);
  }, [selectedConcertId, concerts]);

  const handlePayer = async () => {
    const utilisateurStr = sessionStorage.getItem('utilisateur');
    const utilisateur = utilisateurStr ? JSON.parse(utilisateurStr) : null;
    const token = sessionStorage.getItem('token');

    if (!utilisateur) {
      alert("Vous devez être connecté pour réserver.");
      navigate('/connexion');
      return;
    }

    if (!selectedConcert) {
      alert("Veuillez sélectionner un concert.");
      return;
    }

    const reservation = {
      //id_utilisateur: utilisateur.id_utilisateur, modif
      id_concert: selectedConcert.id_concert,
      type_tarif: tarif,
      montant: tarif === 'plein' ? selectedConcert.tarif_plein : selectedConcert.tarif_abonne
    };

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Envoi du token pour authentification
        },
        body: JSON.stringify(reservation)
      });

      if (response.ok) {
        alert("Réservation effectuée avec succès !");
        navigate('/dashboard'); // Ou une autre page après réservation MODIF 11/08/2025
      } else {
        const erreur = await response.json();
        alert("Erreur lors de la réservation : " + (erreur.message || "inconnue"));
      }
    } catch (error) {
      alert("Erreur serveur ou réseau.");
    }
  };
    /*const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/'); 
  };*/

  return (
    <div>
      <HeaderUser />
      <NavbarUser />
      {/*<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className='button_supprimer' onClick={handleLogout}>Déconnexion</button>
      </div>*/}
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
