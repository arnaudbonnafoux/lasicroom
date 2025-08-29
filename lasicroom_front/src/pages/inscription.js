import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../composants/Navbar';
import '../styles/inscription.css';

// Import des validations
import { validateName, validateEmail, validatePassword } from '../utils/validation';

function Inscription() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurs, setErreurs] = useState({}); // ✅ plusieurs erreurs possibles
  const navigate = useNavigate();

  const gererSoumission = async (e) => {
    e.preventDefault();

    // Validation côté client
    const newErrors = {};
    newErrors.nom = validateName(nom);
    newErrors.email = validateEmail(email);
    newErrors.motDePasse = validatePassword(motDePasse);

    // Garde uniquement les champs invalides
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== null)
    );

    setErreurs(filteredErrors);

    // Si des erreurs, stop
    if (Object.keys(filteredErrors).length > 0) return;

    // ✅ Si tout est valide → appel API
    try {
      const reponse = await fetch('/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          mot_de_passe: motDePasse,
          role: 'utilisateur',
        }),
      });

      const donnees = await reponse.json();

      if (reponse.ok && donnees.utilisateur) {
        sessionStorage.setItem('utilisateur', JSON.stringify(donnees.utilisateur));
        sessionStorage.setItem('token', donnees.token);
        navigate('/billetterie');
      } else {
        setErreurs({ global: donnees.message || 'Erreur lors de l’inscription.' });
      }
    } catch (err) {
      console.error('Erreur de connexion au serveur:', err);
      setErreurs({ global: "Erreur de connexion au serveur." });
    }
  };

  return (
    <div>
      <Navbar />

      <main className='display_main'>
        <div className='div_form'>
          <h2 className='style_h2' style={{ textAlign: 'center' }}>Inscription</h2>
          <form className='style_form' onSubmit={gererSoumission}>

            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            {erreurs.nom && <p style={{ color: 'red' }}>{erreurs.nom}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {erreurs.email && <p style={{ color: 'red' }}>{erreurs.email}</p>}

            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
            {erreurs.motDePasse && <p style={{ color: 'red' }}>{erreurs.motDePasse}</p>}

            <button className='button_bleu' type="submit">S'inscrire</button>

            {erreurs.global && <p style={{ color: 'red' }}>{erreurs.global}</p>}
          </form>
        </div>

        <img
          src="/images/photo_1.jpg"
          alt='Un clavier sur une scène'
          className='style_image'
        />
      </main>
    </div>
  );
}

export default Inscription;
