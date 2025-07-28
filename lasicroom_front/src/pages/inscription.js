import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../composants/Navbar';
//import Footer from '../composants/Footer';
//import Header from '../composants/Header';
import '../styles/inscription.css'

function Inscription() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  //const [role, setRole] = useState('utilisateur'); // Valeur par défaut
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const gererSoumission = async (e) => {
    e.preventDefault();
    try {
      const reponse = await fetch('/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, mot_de_passe: motDePasse, role: 'utilisateur' }),//modif
      });

      const donnees = await reponse.json();

      if (reponse.ok) {
        // Redirection vers la billetterie après inscription réussie
        navigate('/billetterie');
      } else {
        setErreur(donnees.message || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      setErreur("Erreur de connexion au serveur.");
    }
  };

  return (
    <div>
      {/*<Header />*/}
      <Navbar />

      <main className='display_main'>

        <div>
          <h2 style={{ textAlign: 'center', fontSize: 'xx-large' }}>Inscription</h2>
          <form className='fond_form' onSubmit={gererSoumission}>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
            {/*
        <select value={role} onChange={(e) => setRole(e.target.value)}>     
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        */}
            <button type="submit">S'inscrire</button>
            {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
          </form>
        </div>
        <img src="/images/photo_1.jpg"
          alt='Un clavier sur une scène' className='style_image' />
      </main>
      {/*<Footer />*/}
    </div>
  );
}

export default Inscription;
