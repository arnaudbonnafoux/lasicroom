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
      await axios.post('http://localhost:3001/api/accompagnement', formData);
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
      <div className="accompagnement-container">
        <div className="formulaire">
          <h2>Inscription pour être accompagné chez nous !</h2>
          <form onSubmit={handleSubmit}>
            <label>Nom du groupe :</label>
            <input type="text" name="nom_artiste" value={formData.nom_artiste} onChange={handleChange} required />
            
            <label>Email :</label>
            <input type="email" name="email_artiste" value={formData.email_artiste} onChange={handleChange} required />
            
            <label>Style musical :</label>
            <input type="text" name="style_musical" value={formData.style_musical} onChange={handleChange} />
            
            <label>Message :</label>
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>

            <button type="submit">Envoyer</button>
          </form>
        </div>

        <div className="bloc-texte">
          <p><strong>Vous êtes un groupe ou un·e artiste solo ?</strong></p>
          <p>Vous souhaitez bénéficier d’un accompagnement personnalisé (résidences, formations, mise à disposition d’espaces, conseils…) ?</p>
          <p>Remplissez ce formulaire et nous vous contacterons rapidement pour discuter de votre projet.</p>
          <p>Rejoignez la communauté de la sicRoom !</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Accompagnement;
