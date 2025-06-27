import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/accueil.css';

const Accueil = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navbar />

      {/* Contenu principal */}
      <main className="container mt-3">
        <div className="row g-3">
          <div className="col-md-6">
            <img src="/images/photo_2.jpg" alt="Concert" className="img-fluid rounded" />
          </div>

          <div className="col-md-3 bloc-bienvenue">
            <h2>Bienvenue à la sicRoom</h2>
            <p>Votre scène de musiques actuelles</p>
            <p>
              La sicRoom est une Scène de Musiques Actuelles (SMAC) dédiée à la création, la diffusion et le
              partage des musiques d’aujourd’hui, dans toute leur diversité. Rock, pop, rap, électro, métal,
              chanson, et bien plus encore : notre programmation reflète la richesse et l’énergie de la scène
              musicale contemporaine.
            </p>
            <p>
              Plus qu’une salle de concert, la sicRoom est un lieu de vie et de rencontres, ouvert à toutes et à
              tous. Toute l’année, nous accueillons des concerts, des résidences d’artistes, des ateliers, des
              événements culturels et des projets participatifs. Nous soutenons la scène locale, accompagnons les
              talents émergents et favorisons les échanges entre les artistes et le public.
            </p>
            <p>
              Que vous soyez passionné·e de musique, musicien·ne, curieux·se ou simple amateur·trice de
              découvertes, la sicRoom est votre espace. Venez vibrer, créer, écouter, apprendre… et surtout,
              partager.
            </p>
          </div>

          <div className="col-md-3 bloc-infos">
            <p>INFOS</p>
            <ul>
              <li><strong>Prochain concert : le Samedi 21 mai avec Titi et son orchestre !</strong></li>
              <li><strong>Le concert de Kamélia est annulé.</strong></li>
              <li><strong>Inline Block trio sera en résidence le jeudi 17 juin.</strong></li>
            </ul>
          </div>
        </div>

        {/* Direct live section */}
        <div className="row mt-4 bg-light p-4 rounded direct-live">
          <div className="col-md-8">
            <h2>
              Le direct live des balances <span className="direct-arrow">→</span>
            </h2>
          </div>
          <div className="col-md-4">
            <img src="/images/photo_1.jpg" alt="Direct" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Accueil;
