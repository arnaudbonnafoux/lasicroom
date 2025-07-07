// src/pages/Accompagnement.js
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import Navbar from '../composants/Navbar';
import '../styles/accompagnement.css'; // Tu peux y garder ton CSS perso si besoin

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
      await axios.post('http://localhost:3001/api/accompagnements', formData);
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

      <div className="container my-4">
        <div className="row">
          {/* Formulaire à gauche */}
          <div className="col-md-8 image_form">
            <h2 className="mb-4">Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom du groupe :</label>
                <input type="text" name="nom_artiste" className="form-control" value={formData.nom_artiste} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email :</label>
                <input type="email" name="email_artiste" className="form-control" value={formData.email_artiste} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Style musical :</label>
                <input type="text" name="style_musical" className="form-control" value={formData.style_musical} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Message :</label>
                <textarea name="message" rows="4" className="form-control" value={formData.message} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>

          {/* Texte à droite */}
          <div className="col-md-4 image_texte bloc_texte">
            <h2>Vous êtes un groupe ou un·e artiste solo ?</h2>
            <p>Vous souhaitez bénéficier d’un accompagnement personnalisé (résidences, formations, mise à disposition d’espaces, conseils…) ?</p>
            <p>Remplissez ce formulaire et nous vous contacterons rapidement pour discuter de votre projet.</p>
            <p>Rejoignez la communauté de la sicRoom !</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accompagnement;
