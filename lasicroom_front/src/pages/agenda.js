import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import '../styles/agenda.css';

const Agenda = () => {
  return (
    <div>
      <Header />
      <Navbar />

      <main className="agenda-container">
        <h1 className="agenda-title">Agenda des concerts</h1>

        <section className="concerts-grid">
          {/* Exemple d’un concert affiché dynamiquement */}
          <div className="concert-card">
            <img src="/images/groupe1.jpg" alt="Groupe 1" className="concert-image" />
            <h3 className="concert-name">Groupe 1</h3>
            <p className="concert-date">Vendredi 10 octobre 2025</p>
          </div>

          {/* Ajoute d'autres cartes ici selon les données */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Agenda;
