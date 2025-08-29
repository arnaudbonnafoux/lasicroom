import React from 'react';
// Import du hook useNavigate de react-router-dom
// -> permet de naviguer vers une autre route (changer de page) par programmation
import { useNavigate } from 'react-router-dom';
import '../styles/options.css';

const Options = () => {
  // Hook de navigation
  // navigate('/url') permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

  return (
    <div className="options-modal-content">
      <h2>Avant de réserver un concert</h2>
      <p>Veuillez vous connecter ou créer un compte</p>
      <div>
        {/* Bouton qui redirige vers la page de connexion */}
        <button style={{ marginRight: '12px' }} className='button_bleu' onClick={() => navigate('/connexion')}>Se connecter</button>
        
        {/* Bouton qui redirige vers la page d'inscription */}
        <button className='button_bleu' onClick={() => navigate('/inscription')}>S'inscrire</button>
      </div>
    </div>
  );
};

export default Options;
