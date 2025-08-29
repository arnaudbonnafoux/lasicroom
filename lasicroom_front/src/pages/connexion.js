import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import '../styles/connexion.css';

// Import des fonctions de validation
import { validateEmail, validatePassword } from '../utils/validation';

function Connexion() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurs, setErreurs] = useState({}); // Plusieurs erreurs possibles
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreurs({});

    // Validation côté client
    const newErrors = {};
    newErrors.email = validateEmail(email);
    newErrors.motDePasse = validatePassword(motDePasse);

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== null)
    );

    setErreurs(filteredErrors);

    if (Object.keys(filteredErrors).length > 0) return; // Stop si erreurs

    try {
      const reponse = await fetch('/api/connexions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      if (reponse.ok) {
        const donnees = await reponse.json();

        if (donnees.token) {
          sessionStorage.setItem('token', donnees.token);
          sessionStorage.setItem('utilisateur', JSON.stringify(donnees.utilisateur));
        }

        console.log('✅ Utilisateur connecté :', donnees);
        navigate('/billetterie');
      } else {
        const erreurReponse = await reponse.json();
        setErreurs({ global: erreurReponse.message || 'Échec de la connexion' });
      }
    } catch (err) {
      setErreurs({ global: 'Erreur réseau ou serveur' });
    }
  };

  return (
    <div>
      <Navbar />
      <main className='display_main'>
        <div>
          <h2 className='style_h2' style={{ textAlign: 'center', fontSize: 'xx-large' }}>Connexion</h2>

          {erreurs.global && <p style={{ color: 'red' }}>{erreurs.global}</p>}

          <form onSubmit={handleSubmit} className='style_form'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {erreurs.email && <p style={{ color: 'red' }}>{erreurs.email}</p>}
            <br />

            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
            {erreurs.motDePasse && <p style={{ color: 'red' }}>{erreurs.motDePasse}</p>}
            <br />

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

export default Connexion;
