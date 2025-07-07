import React, { useEffect, useState } from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import CardConcert from '../composants/CardConcert';
import '../styles/agenda.css';

const Agenda = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/concerts')
      .then((res) => res.json())
      .then((data) => setConcerts(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des concerts :", error)
      );
  }, []);

  return (
    <div>
      <Header />
      <Navbar />

      <main className="agenda-main">
        <h1>Agenda des concerts</h1>

        <section>
          {concerts.length > 0 ? (
            concerts.map((concert) => (
              <CardConcert key={concert.id_concert} concert={concert} />
            ))
          ) : (
            <p>Aucun concert à venir pour le moment.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Agenda;
