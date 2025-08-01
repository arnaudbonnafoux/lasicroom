import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../composants/HeaderAdmin';
import NavbarAdmin from '../../composants/NavbarAdmin';

const GestionAccompagnement = () => {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/accompagnements')
      .then(response => response.json())
      .then(data => setDemandes(data))
      .catch(error => console.error('Erreur lors de la récupération des demandes :', error));
  }, []);

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression de cette demande ?')) {
      try {
        const res = await fetch(`/api/accompagnements/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setDemandes((prev) => prev.filter((demande) => demande.id_demande !== id));
          alert('Demande supprimée avec succès.');
        } else {
          alert('Erreur lors de la suppression.');
        }
      } catch (error) {
        console.error('Erreur suppression :', error);
        alert('Erreur serveur lors de la suppression.');
      }
    }
  };

  return (
    <div>
      <Header />
      <NavbarAdmin />
      <main>
        <h1>Gestion des demandes d'accompagnement</h1>
        <div className='div_tableau'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom artiste</th>
                <th>Email</th>
                <th>Style musical</th>
                <th>Message</th>
                <th>Date d'envoi</th>
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleDelete(demande.id_demande)}>Supprimer</button>
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
    </div>
  );
};

export default GestionAccompagnement;
