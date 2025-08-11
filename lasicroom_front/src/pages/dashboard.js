import React, { useEffect, useState } from 'react';

import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('/api/reservations/mine', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(console.error);
  }, [token]);

  /*const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/'); // Retour à la racine
  };*/
  return (
    <div>
      <HeaderUser />
      <NavbarUser />
      {/*<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className='button_supprimer' onClick={handleLogout}>Déconnexion</button>
      </div>*/}


      <main>
        <h1>Mes réservations</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Concert</th>
              <th>Date concert</th>
              <th>Tarif</th>
              <th>Montant (€)</th>
              <th>Date réservation</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, i) => (
              <tr key={r.id_reservation}>
                <td>{i + 1}</td>
                <td>{r.concert}</td>
                <td>{new Date(r.date_concert).toLocaleDateString()}</td>
                <td>{r.type_tarif}</td>
                <td>{r.montant}</td>
                <td>{new Date(r.date_reservation).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
