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
        body: JSON.stringify({
          nom,
          email,
          mot_de_passe: motDePasse,
          role: 'utilisateur',
        }),
      });

      const donnees = await reponse.json();

      if (reponse.ok && donnees.utilisateur) {
        // Enregistrement direct de l'utilisateur en session
        sessionStorage.setItem('utilisateur', JSON.stringify(donnees.utilisateur));
        sessionStorage.setItem('token', donnees.token);
        // Redirection directe vers la billetterie en tant qu'utilisateur connecté
        navigate('/billetterie');
      } else {
        setErreur(donnees.message || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      console.error('Erreur de connexion au serveur:', err);
      setErreur("Erreur de connexion au serveur.");
    }
  };

  return (
    <div>
      {/*<Header />*/}
      <Navbar />

      <main className='display_main'>

        <div className='div_form'>
          <h2 className='style_h2' style={{ textAlign: 'center' }}>Inscription</h2>
          {/*<p style={{textAlign:'justify'}}>Une fois inscrit, vous serez redirigé vers la page connexion du site.<br />
            Une fois dans la page connexion, entrez votre adresse e-mail et votre mot de passe utilisés lors de votre inscription.<br />
            Connectez-vous et la réservation en ligne, sera accessible. Merci !</p>*/}
          <form className='style_form' onSubmit={gererSoumission}>

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
