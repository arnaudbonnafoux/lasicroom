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
    <div style={styles.container}>
      <h2 style={styles.titre}>Avant de réserver un concert</h2>
      <p style={styles.texte}>Veuillez vous connecter ou créer un compte</p>
      <div style={styles.boutons}>
        <button style={styles.bouton} onClick={allerConnexion}>Se connecter</button>
        <button style={styles.bouton} onClick={allerInscription}>S'inscrire</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  titre: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  texte: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  boutons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  bouton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Options;
