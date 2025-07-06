import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';
import Header from '../../composants/Header';
import '../../styles/gestion_concerts.css';

const GestionConcerts = () => {
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token'); // Supprimer le token JWT
    navigate('/'); // Rediriger vers l'accueil
  };

  return (
    <div>
      <Header />
      <NavbarAdmin />
      
      <main className="contenu-admin">
        <h1>Gestion des concerts</h1>
        <button className="btn-deconnexion" onClick={handleDeconnexion}>
          Déconnexion
        </button>
        {/* Tu pourras ajouter ici la liste des concerts à gérer */}
      </main>

      <Footer />
    </div>
  );
};

export default GestionConcerts;
