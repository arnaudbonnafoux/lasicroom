// src/pages/Accompagnement.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import Navbar from '../composants/Navbar';
import '../styles/accompagnement.css';

const Accompagnement = () => {
  const [formData, setFormData] = useState({
    nom_artiste: '',
    email_artiste: '',
    style_musical: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/accompagnements', formData);
      alert('Demande envoyée avec succès !');
      setFormData({
        nom_artiste: '',
        email_artiste: '',
        style_musical: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’envoi du formulaire.');
    }
  };

  return (
    <div>
      <Header />
      <Navbar />

      <h1>Accompagnement</h1>
      <div className='div_accompagnement'>
        <img className='img_accomp' style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)' }} src='/images/photo_1.jpg' alt='Un clavier sur une scène' />
        <div className='texte_accompagnement'>
          <h2>Vous êtes un groupe ou un·e artiste solo ?</h2>
          <p>Vous souhaitez bénéficier d’un accompagnement personnalisé
            (résidences, formations, mise à disposition d’espaces, conseils…) ?</p>
          <p>Remplissez ce formulaire et nous vous contacterons rapidement pour discuter de votre projet.</p>
          <p>Rejoignez la communauté de la sicRoom !</p>
        </div>
      </div>

      {/* Form */}

      <div className='div_form'>
        <h2>Inscription</h2>
        <form className='formulaire' onSubmit={handleSubmit}>
          <div>
            <label>Nom du groupe :</label>
            <input type="text" name="nom_artiste" value={formData.nom_artiste} onChange={handleChange} required />
          </div>

          <div>
            <label>Email :</label>
            <input type="email" name="email_artiste" value={formData.email_artiste} onChange={handleChange} required />
          </div>

          <div>
            <label>Style musical :</label>
            <input type="text" name="style_musical" value={formData.style_musical} onChange={handleChange} />
          </div>

          <div>
            <label>Message :</label>
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange} style={{boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)'}}></textarea>
          </div>

          <button type="submit">Envoyer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Accompagnement;
