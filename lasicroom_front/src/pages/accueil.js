import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
import '../styles/accueil.css';

const Accueil = () => {
  return (
    <div>
      <Header />
      <Navbar />

      <main>
        <h1>Bienvenue à la sicRoom !</h1>

        <div className='div_accueil'>
          <div>
            <img style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)' }} src="/images/photo_2.jpg" alt="Concert" />
          </div>

          <div className='texte'>
            <h2 style={{ textAlign: 'center' }}>La sic Room !?</h2>

            <p style={{ padding: '12px' }}>
              La sicRoom est une Scène de Musiques Actuelles (SMAC) dédiée à la création, la diffusion et le
              partage des musiques d’aujourd’hui, dans toute leur diversité. Rock, pop, rap, électro, métal,
              chanson, et bien plus encore : notre programmation reflète la richesse et l’énergie de la scène
              musicale contemporaine.
            </p>
          </div>

          <div className='info'>
            <h2 style={{ textAlign: 'center' }}>Infos !</h2>
            <ul>
              <li><strong>Prochain concert : le Samedi 21 mai avec Titi et son orchestre !</strong></li>
              <li><strong>Le concert de Kamélia est annulé.</strong></li>
              <li><strong>Inline Block trio sera en résidence le jeudi 17 juin.</strong></li>
            </ul>
          </div>
        </div>

        <div className='div_live_streaming'>
          {/*<div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>
              Le direct live des balances <span>→</span>
            </h2>
          </div>*/}
          <div>
            <h2 style={{textAlign:'center'}}>
              Le direct live des balances
            </h2>
            <iframe
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)',
                borderRadius: '12px'
              }}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YeHvUcdZ9t8?si=wO0bi7QKvHXASxtv"
              title="YouTube video player"
              Border="none"
              allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <h2 style={{textAlign:'center'}}>Playlist de nos artistes !</h2>
            <iframe
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.75)',
                borderRadius: '12px'
              }}
              width="560"
              height="315"
              src="https://widget.deezer.com/widget/dark/playlist/1973876342"
              title="Playlist Deezer"
              Border="none"
              allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accueil;
