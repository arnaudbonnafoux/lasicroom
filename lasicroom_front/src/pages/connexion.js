import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const reponse = await fetch('http://localhost:3001/api/connexions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      if (reponse.ok) {
        const donnees = await reponse.json();
        console.log('Utilisateur connecté :', donnees);
        // 🔁 Redirection vers la page billetterie après succès
        navigate('/billetterie');
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
      <h2>Connexion</h2>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;
