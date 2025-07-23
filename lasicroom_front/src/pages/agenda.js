import React, { useEffect, useState } from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import CardConcert from '../composants/CardConcert';
import Modal from '../composants/Modal';
import Options from './options';
import '../styles/agenda.css';

const Agenda = () => {
  const [concerts, setConcerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/concerts')
      .then(res => res.json())
      .then(data => setConcerts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <Navbar />

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
          <button onClick={() => setIsModalOpen(true)}>Réserver</button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Options />
        </Modal>
      </main>

      <Footer />
    </div>
  );
};

export default Agenda;
