import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';
import Header from '../../composants/HeaderAdmin';

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      if (!response.ok) throw new Error('Erreur lors du chargement des réservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette réservation ?')) return;
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression');
      alert('Réservation supprimée');
      fetchReservations(); // recharge la liste
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

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
        <div className='div_tableau'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Concert</th>
                <th>Type de tarif</th>
                <th>Montant (€)</th>
                <th>Actions</th>
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
                  <td>
                    <button
                      onClick={() => handleDelete(reservation.id_reservation)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <button onClick={handleDeconnexion}>Déconnexion</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GestionReservations;
