import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../composants/HeaderAdmin';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';

const GestionAccompagnement = () => {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/accompagnements')
      .then(response => response.json())
      .then(data => setDemandes(data))
      .catch(error => console.error('Erreur lors de la récupération des demandes :', error));
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
        <h1>Gestion des demandes d'accompagnement</h1>
        <button onClick={handleDeconnexion}>Déconnexion</button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom artiste</th>
              <th>Email</th>
              <th>Style musical</th>
              <th>Message</th>
              <th>Date d'envoi</th>
              <th>Traitée ?</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id_demande}>
                <td>{demande.id_demande}</td>
                <td>{demande.nom_artiste}</td>
                <td>{demande.email_artiste}</td>
                <td>{demande.style_musical}</td>
                <td>{demande.message}</td>
                <td>{new Date(demande.date_envoi).toLocaleString()}</td>
                <td>{demande.traite ? 'Oui' : 'Non'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default GestionAccompagnement;
