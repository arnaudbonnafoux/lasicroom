import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⚠️
import axios from 'axios';
import Header from '../composants/Header';
import Footer from '../composants/Footer';
import Navbar from '../composants/Navbar';
import HelmetWrapper from '../composants/HelmetWrapper';
import '../styles/accompagnement.css';

// Import des validations
import { validateName, validateEmail, validateStyle, validateText } from '../utils/validation';

const Accompagnement = () => {

  const navigate = useNavigate(); // ⚠️

  const handleLoginClick = () => {  // ⚠️
    navigate('/connexion_user');
  };

  const [formData, setFormData] = useState({
    nom_artiste: '',
    email_artiste: '',
    style_musical: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation côté client
    const newErrors = {};
    newErrors.nom_artiste = validateName(formData.nom_artiste);
    newErrors.email_artiste = validateEmail(formData.email_artiste);
    newErrors.style_musical = validateStyle(formData.style_musical);
    newErrors.message = validateText(formData.message, 200);

    // Supprimer les nulls
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si tout est valide -> envoi API
    try {
      await axios.post('/api/accompagnements', formData);
      alert('Demande envoyée avec succès !');
      setFormData({
        nom_artiste: '',
        email_artiste: '',
        style_musical: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l’envoi du formulaire.');
    }
  };

  return (
    <div>
      <HelmetWrapper
        title="Accompagnement - La Sicroom"
        description="Découvrez les services d'accompagnement de La Sicroom pour les artistes et les événements musicaux."
      />
      <Header />
      <div className='div_navbar'> {/*⚠️*/}
        <Navbar />
        <button className='button_bleu' onClick={handleLoginClick}>👉 Connexion</button>{/*⚠️*/}
      </div> 

      <h1>Accompagnement</h1>
      <div className='div_accompagnement'>
        <img
          className='img_accomp'
          style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)' }}
          src='/images/photo_1.jpg'
          alt='Un clavier sur une scène'
        />
        <div className='texte_accompagnement'>
          <h2>Vous êtes un groupe ou un·e artiste solo ?</h2>
          <p>
            Vous souhaitez bénéficier d’un accompagnement personnalisé
            (résidences, formations, mise à disposition d’espaces, conseils…) ?
          </p>
          <p>
            Remplissez ce formulaire et nous vous contacterons rapidement pour
            discuter de votre projet.
          </p>
          <p>Rejoignez la communauté de la sicRoom !</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className='div_form'>
        <h2>Inscription</h2>
        <form className='formulaire' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='nom_artiste'>Nom du groupe :</label>
            <input
              id='nom_artiste'
              type="text"
              name="nom_artiste"
              value={formData.nom_artiste}
              onChange={handleChange}
              required
            />
            {errors.nom_artiste && <p style={{ color: 'red' }}>{errors.nom_artiste}</p>}
          </div>

          <div>
            <label htmlFor='email_artiste'>Email :</label>
            <input
              id='email_artiste'
              type="email"
              name="email_artiste"
              value={formData.email_artiste}
              onChange={handleChange}
              required
            />
            {errors.email_artiste && <p style={{ color: 'red' }}>{errors.email_artiste}</p>}
          </div>

          <div>
            <label htmlFor='style_musical'>Style musical :</label>
            <input
              id='style_musical'
              type="text"
              name="style_musical"
              value={formData.style_musical}
              onChange={handleChange}
            />
            {errors.style_musical && <p style={{ color: 'red' }}>{errors.style_musical}</p>}
          </div>

          <div>
            <label htmlFor='message'>Message :</label>
            <textarea
              id='message'
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
          </div>

          <button className='button_bleu' type="submit">Envoyer</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Accompagnement;
