import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/options.css';

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="options-modal-content">
      <h2>Avant de réserver un concert</h2>
      <p>Veuillez vous connecter ou créer un compte</p>
      <div>
        <button style={{marginRight:'12px'}} className='button_bleu' onClick={() => navigate('/connexion')}>Se connecter</button>
        <button className='button_bleu' onClick={() => navigate('/inscription')}>S'inscrire</button>
      </div>
    </div>
  );
};

export default Options;
