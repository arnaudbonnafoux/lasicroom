import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/accueil.css';

const Accueil = () => {
  return (
    <div>
      <Header />

      <Navbar />

      <main className="container mt-3">
        <div className="row g-3">
          <div className="col-md-6">
            <img src="/images/photo_2.jpg" alt="Concert" className="img-fluid rounded" />
          </div>

          <div className="col-md-3 presentation">
            <h2>Bienvenue à la sicRoom</h2>
            <p>Votre scène de musiques actuelles</p>
            <p>
              La sicRoom est une Scène de Musiques Actuelles (SMAC) dédiée à la création, la diffusion et le
              partage des musiques d’aujourd’hui, dans toute leur diversité. Rock, pop, rap, électro, métal,
              chanson, et bien plus encore : notre programmation reflète la richesse et l’énergie de la scène
              musicale contemporaine.
            </p>
          </div>

          <div className="col-md-3 infos">
            <p>INFOS</p>
            <ul className='animation_1'>
              <li><strong>Prochain concert : le Samedi 21 mai avec Titi et son orchestre !</strong></li>
              <li><strong>Le concert de Kamélia est annulé.</strong></li>
              <li><strong>Inline Block trio sera en résidence le jeudi 17 juin.</strong></li>
            </ul>
          </div>
        </div>

        <div className="row mt-4 bg-light p-4 rounded balances">
          <div className="col-md-8 animation_1">
            <h2>
              Le direct live des balances <span className="fleche_balances">→</span>
            </h2>
          </div>
          <div className="col-md-4">
            <img src="/images/photo_1.jpg" alt="Direct" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accueil;
