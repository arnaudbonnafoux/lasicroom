import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import { Link } from 'react-router-dom';
import '../styles/agenda.css';

const Agenda = () => {
  return (
    <div>
      <Header />
      <Navbar />

      <main>
        <h1>Agenda des concerts</h1>

        <section className="concerts-grid">
          {/* Exemple d’un concert affiché dynamiquement */}
          <div>
            <img src="/images/groupe1.jpg" alt="Groupe 1" className="concert-image" />
            <h3>Groupe 1</h3>
            <p>Vendredi 10 octobre 2025</p>
            <Link to="/options" className="btn btn-primary style_bouton mt-2">
              Réserver
            </Link>
          </div>
          {/* Ajoute d'autres cartes ici selon les données */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Agenda;
