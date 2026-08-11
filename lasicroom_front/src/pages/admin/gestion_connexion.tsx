// src/pages/admin/GestionConnexion.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../composants/Navbar';
import '../../styles/connexion.css';

// Import des validations
import { validateEmail, validatePassword } from '../../utils/validation';

function GestionConnexion() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    // Validation côté client
    const emailError = validateEmail(email);
    const passwordError = validatePassword(motDePasse);

    if (emailError || passwordError) {
      setErreur(emailError || passwordError);
      return;
    }

    try {
      const reponse = await fetch('/api/connexions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      if (reponse.ok) {
        const donnees = await reponse.json();

        // Stockage du token + utilisateur
        if (donnees.token) {
          sessionStorage.setItem('token', donnees.token);
          sessionStorage.setItem('utilisateur', JSON.stringify(donnees.utilisateur));
        }

        // Redirection en fonction du rôle
        if (donnees.utilisateur.role === 'admin') {
          navigate('/admin/concerts');
        } else {
          navigate('/'); // utilisateur normal -> accueil
        }
      } else {
        const erreurReponse = await reponse.json();
        setErreur(erreurReponse.message || 'Échec de la connexion');
      }
    } catch (err) {
      setErreur('Erreur réseau ou serveur');
    }
  };

  return (
    <div>
      <Navbar />
      <main className='display_main'>
        <div>
          <h2 style={{ textAlign: 'center', fontSize: 'xx-large' }}>Connexion</h2>
          {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

          <form className='style_form' onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />

            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            /><br />

            <button className='button_bleu' type="submit">Se connecter</button>
          </form>
        </div>

        <img
          src="/images/photo_2.jpg"
          alt='Le public devant la scène'
          className='style_image'
        />
      </main>
    </div>
  );
}

export default GestionConnexion;
