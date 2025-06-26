// src/pages/Accueil.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Accueil = () => {
  return (
    <div>
      {/* Header */}
      <header className="container-fluid text-center" style={{backgroundColor: '#6b5ca5', color: 'white', padding: '1rem', borderRadius: '0 0 15px 15px'}}>
        <div className="d-flex justify-content-between align-items-center">
          <img src="/images/dessin_1.jpeg" alt="Logo" style={{height: 60}} />
          <h1 className="flex-grow-1 m-0" style={{color: '#e4d4ff'}}>La sicRoom</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container-fluid text-end fw-bold" style={{backgroundColor: '#fdebd0', padding: '0.75rem', borderRadius: '0 0 15px 15px'}}>
        <a href="/" className="mx-3 text-decoration-none" style={{color: '#6b5ca5'}}>Accueil</a>
        <a href="/agenda" className="mx-3 text-decoration-none" style={{color: '#6b5ca5'}}>Agenda</a>
        <a href="/accompagnement" className="mx-3 text-decoration-none" style={{color: '#6b5ca5'}}>Accompagnement</a>
      </nav>

      {/* Contenu principal */}
      <main className="container mt-3">
        <div className="row g-3">
          <div className="col-md-6">
            <img src="/images/photo_2.jpg" alt="Concert" className="img-fluid rounded" />
          </div>
          <div className="col-md-3 bg-light p-3 rounded">
            <h2 style={{textAlign: "center"}}>Bienvenue à la sicRoom</h2>
            <p style={{textAlign: "center"}}>Votre scène de musiques actuelles</p>
            <p>La sicRoom est une Scène de Musiques Actuelles (SMAC) dédiée à la création, la diffusion et le
              partage des musiques
              d’aujourd’hui,
              dans toute leur diversité. Rock, pop, rap, électro, métal, chanson, et bien plus encore :
              notre programmation reflète la richesse et l’énergie de la scène musicale contemporaine.</p>

            <p>Plus qu’une salle de concert, la sicRoom est un lieu de vie et de rencontres,
              ouvert à toutes et à tous. Toute l’année, nous accueillons des concerts, des résidences d’artistes,
              des ateliers,
              des
              événements culturels et des projets participatifs.
              Nous soutenons la scène locale, accompagnons les talents émergents et favorisons les échanges entre
              les artistes et
              le
              public.</p>

            <p>Que vous soyez passionné·e de musique, musicien·ne, curieux·se ou simple amateur·trice de
              découvertes, la sicRoom
              est
              votre espace.
              Venez vibrer, créer, écouter, apprendre… et surtout, partager.</p>
          </div>
          <div className="col-md-3" style={{
            backgroundImage: 'url(images/photo_12v2.jpg)',
            backgroundSize: 'cover',
            border: '1px solid #aaa',
            padding: '1rem',
            borderRadius: 10,
            color: '#6b5ca5',
            fontWeight: 'bold'
          }}>
            <p>INFOS</p>
            <ul>
              <li><strong>Prochain concert : le Samedi 21 mai avec Titi et son orchestre !</strong>
              </li>
              <li><strong>Le concert de Kamélia est annulé.</strong></li>
              <li><strong>Inline Block trio sera en résidence le jeudi 17 juin.</strong></li>
            </ul>
          </div>
        </div>

        {/* Direct live section */}
        <div className="row mt-4 bg-light p-4 rounded" style={{
          backgroundImage: 'url(images/photo_12v2.jpg)',
          backgroundSize: 'cover'
        }}>
          <div className="col-md-8">
            {/*<h2 style={{color: '#a280ff'}}>Le direct live des balances =&gt;</h2>*/}
            <h2 style={{ color: '#a280ff' }}>
              Le direct live des balances <span style={{ fontSize: '2.0rem' }}>→</span>
            </h2>

          </div>
          <div className="col-md-4">
            <img src="/images/photo_1.jpg" alt="Direct" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container-fluid footer text-center mt-5 py-4" style={{ backgroundColor: '#6b5ca5', color: 'white', borderRadius: '15px' }}>
        <div className="d-flex justify-content-center mb-3 gap-4">
          <a href="mailto:lasicroom@laposte.net">
            <img src="/images/square-envelope-solid.svg" alt="Envoyer un e-mail" width="30" height="30" />
          </a>
          <a href="tel:+33344212283">
            <img src="/images/phone-solid.svg" alt="Téléphone" width="30" height="30" />
          </a>
          <a href="https://maps.app.goo.gl/SEfrYKpRFXwN6DWL8" target="_blank" rel="noopener noreferrer">
            <img src="/images/location-pin-solid.svg" alt="Localisation" width="30" height="30" />
          </a>
        </div>

        <div className="mb-2">
          <a className="text-white mx-3 text-decoration-underline" href="/mentions_légales">Mentions légales </a>
          <a className="text-white mx-3 text-decoration-underline" href="/conditions_légales">Conditions d'utilisation </a>
          <a className="text-white mx-3 text-decoration-underline" href="/gestion_concert">Admin</a>
        </div>

        <p className="small mb-0">&copy; 2025 duanrA</p>
      </footer>

    </div>
  );
};

export default Accueil;
