import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';
import '../styles/gestion_reservations.css';
import HelmetWrapper from '../composants/HelmetWrapper';

const Dashboard = () => {
  // État qui contient toutes les réservations de l’utilisateur
  const [reservations, setReservations] = useState([]);

   // Récupération du token d’authentification stocké en session
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/'); // Retour à la racine
  };

  // Chargement des réservations utilisateur au montage du composant
  useEffect(() => {
    fetch('/api/reservations/mine', {
      headers: { Authorization: `Bearer ${token}` } // Auth via token
    })
      .then(res => res.json())  // Conversion de la réponse en JSON
      .then(data => setReservations(data)) // Mise à jour de l’état avec la liste des réservations
      .catch(console.error); // Gestion d’erreur simple (affiche dans la console)
  }, [token]); // Dépendance = relance si le token change


  return (
    <div>
      <HelmetWrapper
        title="Dashboard - Espace personnel"
        description="Découvrez les services d'accompagnement de La Sicroom pour les artistes et les événements musicaux."
      />
      <HeaderUser />
      <div className='div_navbar' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavbarUser />
        <button className='button_rouge' onClick={handleLogout}>👉 Déconnexion</button>
      </div>

      <main style={{ height: '100vh' }}>
        <h1>Mes réservations</h1>
        <div className='div_tableau'>

          {/* Tableau des réservations */}
          <table className='div_tableau'>
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

                   {/* Numérotation inversée (#) → la plus récente en haut */}
                  <td>{reservations.length - i}</td>
                  {/*<td>{i + 1}</td>*/}

                  <td>{r.concert}</td>
                  <td>{new Date(r.date_concert).toLocaleDateString()}</td>
                  <td>{r.type_tarif}</td>
                  <td>{r.montant}</td>
                  <td>{new Date(r.date_reservation).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
