import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h2>Avant de réserver un concert</h2>
      <p>Veuillez vous connecter ou créer un compte</p>
      <div>
        <button onClick={allerConnexion}>Se connecter</button>
        <button onClick={allerInscription}>S'inscrire</button>
      </div>
    </div>
  );
};



export default Options;
