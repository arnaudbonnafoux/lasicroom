import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';
import Header from '../../composants/HeaderAdmin';

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/reservations')
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors du chargement des réservations');
        return response.json();
      })
      .then(data => setReservations(data))
      .catch(error => console.error(error));
  }, []);

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <Header />
      <NavbarAdmin />

      <main>
        <h1>Gestion des réservations</h1>
        <button onClick={handleDeconnexion}>Déconnexion</button>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Concert</th>
              <th>Type de tarif</th>
              <th>Montant (€)</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation.id_reservation}>
                <td>{index + 1}</td>
                <td>{reservation.nom_utilisateur}</td>
                <td>{reservation.email}</td>
                <td>{reservation.titre_concert}</td>
                <td>{reservation.type_tarif}</td>
                <td>{parseFloat(reservation.montant).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
};

export default GestionReservations;
