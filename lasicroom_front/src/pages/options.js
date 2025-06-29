import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import '../styles/options.css'

const Options = () => {
  const navigate = useNavigate();

  const allerConnexion = () => {
    navigate('/connexion');
  };

  const allerInscription = () => {
    navigate('/inscription');
  };

  return (

    <div>
      <Header />
      <Navbar />
      <h2>Avant de réserver un concert</h2>
      <p>Veuillez vous connecter ou créer un compte</p>
      <div>
        <button onClick={allerConnexion}>Se connecter</button>
        <button onClick={allerInscription}>S'inscrire</button>
      </div>
      <Footer />
    </div>
  );
};

export default Options;
