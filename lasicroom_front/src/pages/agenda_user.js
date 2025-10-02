import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../composants/NavbarUser';
import Footer from '../composants/Footer';
import HeaderUser from '../composants/HeaderUser';
import CardConcert from '../composants/CardConcert';
import '../styles/agenda.css';
import HelmetWrapper from '../composants/HelmetWrapper';

const AgendaUser = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/'); // Retour à la racine
  }; // ⚠️

  useEffect(() => {
    fetch('/api/concerts')
      .then(res => res.json())
      .then(data => {
        setConcerts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <HelmetWrapper
        title="Agenda - Espace personnel"
        description="Consultez le calendrier des concerts et 
        événements à La Sicroom. Réservez vos places en ligne facilement."
      />

      <HeaderUser />
      <div className='div_navbar' style={{ display: 'flex', justifyContent: 'space-between' }}>{/*⚠️*/}
        <NavbarUser />
        <button className='button_rouge' onClick={handleLogout}>👉 Déconnexion</button>{/*⚠️*/}
      </div>

      <main>
        <h1>Agenda des concerts</h1>
        <section>
          {concerts.length > 0 ? (
            concerts.map(concert => (
              <CardConcert key={concert.id_concert} concert={concert} />
            ))
          ) : (
            <p>Aucun concert à venir pour le moment.</p>
          )}
        </section>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button style={{ fontSize: 'large' }} className='button_bleu' onClick={() => navigate('/billetterie')}>
            Réserver
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgendaUser;
