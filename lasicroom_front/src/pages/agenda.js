import React, { useEffect, useState } from 'react'; // Import des hooks React

import { useNavigate } from 'react-router-dom'; // ⚠️

// Import des composants de l'application
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import CardConcert from '../composants/CardConcert';
import Modal from '../composants/Modal';
import Options from './options';
import HelmetWrapper from '../composants/HelmetWrapper';

// Import du CSS spécifique à cette page
import '../styles/agenda.css';

// Composant principal 
const Agenda = () => {

  // États
  const [concerts, setConcerts] = useState([]); // Liste des concerts
  const [loading, setLoading] = useState(true);  // État de chargement
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestion de l'ouverture/fermeture du modal

  // useEffect
  // Au montage du composant, on va chercher la liste des concerts via l'API
  useEffect(() => {
    fetch('/api/concerts') // Appel API backend
      .then(res => res.json())  // Conversion de la réponse en JSON
      .then(data => {
        setConcerts(data); // Stocke les concerts récupérés
        setLoading(false); // Chargement terminé
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Chargement terminé malgré l’erreur
      });
  }, []);  // [] → signifie que l'effet s'exécute uniquement au montage (comme componentDidMount)

    const navigate = useNavigate(); //⚠️
  
    const handleLoginClick = () => { //⚠️
      navigate('/connexion_user');
    };

  // Affichage si chargement
  if (loading) return <p>Chargement...</p>; // Pendant le fetch, on affiche un message simple

  // Rendu principal
  return (
    <div>
      <HelmetWrapper
        title="Agenda - La Sicroom"
        description="Consultez le calendrier des concerts et 
        événements à La Sicroom. Réservez vos places en ligne facilement."
      />
      {/* En-tête et barre de navigation */}
      <Header />
      <div className='div_navbar'> {/*⚠️*/}
        <Navbar />
        <button className='button_bleu' onClick={handleLoginClick}>👉 Connexion</button> {/*⚠️*/}
      </div>
      <main>
        <h1>Agenda des concerts</h1>

         {/* Section des concerts */}
        <section>          
          {concerts.length > 0 ? (
            // Si on a des concerts, on affiche une carte pour chacun (condition ternaire)
            concerts.map(concert => ( // Fonction fléchée
              <CardConcert key={concert.id_concert} concert={concert} />
            ))
          ) : (
            <p>Aucun concert à venir pour le moment.</p>
          )}
        </section>

         {/* Bouton pour ouvrir la fenêtre de réservation */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button style={{ fontSize: 'large' }} className='button_bleu' onClick={() => setIsModalOpen(true)}>Réserver</button>
        </div>

        {/* Fenêtre modale contenant les options de réservation */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Options />
        </Modal>
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default Agenda;
