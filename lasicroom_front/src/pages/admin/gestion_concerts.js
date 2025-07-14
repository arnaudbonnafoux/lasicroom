import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';
import Header from '../../composants/HeaderAdmin';
import '../../styles/gestion_concerts.css';

const GestionConcerts = () => {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Déconnexion : suppression token + redirection accueil
  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  // Récupération des concerts depuis l'API
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await fetch('/api/concerts'); // adapte selon ton API
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des concerts');
        }
        const data = await response.json();
        setConcerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <div>
      <Header />
      <NavbarAdmin />

      <main>
        <h1>Gestion des concerts</h1>

        <button onClick={handleDeconnexion}>
          Déconnexion
        </button>

        {loading && <p>Chargement en cours...</p>}
        {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Description</th>
                <th>Date</th>
                <th>Places totales</th>
                <th>Places restantes</th>
                <th>Tarif plein</th>
                <th>Tarif abonné</th>
                <th>Artiste</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((concert) => (
                <tr key={concert.id_concert}>
                  <td>{concert.id_concert}</td>
                  <td>{concert.titre}</td>
                  <td>{concert.description}</td>
                  <td>{new Date(concert.date_concert).toLocaleString()}</td>
                  <td>{concert.nb_places_total}</td>
                  <td>{concert.nb_places_restantes}</td>
                  <td>{concert.tarif_plein} €</td>
                  <td>{concert.tarif_abonne} €</td>
                  <td>{concert.nom_artiste || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GestionConcerts;
