import React, { useState, useEffect } from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import CardConcert from '../composants/CardConcert';
import { useNavigate } from 'react-router-dom';
import '../styles/billetterie.css';

const Billetterie = () => {
  // Supprimer la variable naviagate pour continuer le projet. 
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);
  const [selectedConcertId, setSelectedConcertId] = useState(null);
  const [selectedConcert, setSelectedConcert] = useState(null);

  // Charger tous les concerts au chargement
  useEffect(() => {
    fetch('http://localhost:3001/api/concerts')
      .then((res) => res.json())
      .then((data) => {
        setConcerts(data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des concerts :", error)
      );
  }, []);

  // Trouver le concert sélectionné dans la liste
  useEffect(() => {
    const concert = concerts.find(c => c.id_concert === Number(selectedConcertId));
    setSelectedConcert(concert);
  }, [selectedConcertId, concerts]);

  return (
    <div>
      <Header />
      <Navbar />
      <h1>Billetterie</h1>
      <div className='bloc'>
        {/* Sélecteur de concert */}
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

        {/* Affichage du concert sélectionné */}
        {selectedConcert && (
  <CardConcert concert={selectedConcert} fullWidth={true} />
)}
{/*
        {selectedConcert && (
          <CardConcert concert={selectedConcert} />
        )} */}

        <form>
          <label>Plein tarif</label>
          <select>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

          <label>Tarif Abonné</label>
          <select>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </form>
      </div>
      {/* Modifler le onClick, pour insérer les données dans la base élève*/}
        <button onClick={() => navigate('/')} className='btn_payer' disabled={!selectedConcert}>Payer</button>

      <Footer />
    </div>
  );
};

export default Billetterie;
