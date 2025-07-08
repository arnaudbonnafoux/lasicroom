import React from 'react';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';
import Header from '../composants/Header';
//import 'bootstrap/dist/css/bootstrap.min.css';
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
              <img src="/images/photo_2.jpg" alt="Concert" />
            </div>

            <div className='texte'>
              <h2 style={{textAlign:'center'}}>La sic Room !?</h2>

              <p style={{padding:'12px'}}>
                La sicRoom est une Scène de Musiques Actuelles (SMAC) dédiée à la création, la diffusion et le
                partage des musiques d’aujourd’hui, dans toute leur diversité. Rock, pop, rap, électro, métal,
                chanson, et bien plus encore : notre programmation reflète la richesse et l’énergie de la scène
                musicale contemporaine.
              </p>
            </div>

            <div className='info'>
              <h2 style={{textAlign:'center'}}>Infos !</h2>
              <ul>
                <li><strong>Prochain concert : le Samedi 21 mai avec Titi et son orchestre !</strong></li>
                <li><strong>Le concert de Kamélia est annulé.</strong></li>
                <li><strong>Inline Block trio sera en résidence le jeudi 17 juin.</strong></li>
              </ul>
            </div>
          </div>

        <div className='div_live_streaming'>
          <div style={{display:'flex', alignItems:'center'}}>
            <h2>
              Le direct live des balances <span>→</span>
            </h2>
          </div>
          <div>
            <img src="/images/photo_1.jpg" alt="Direct" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accueil;
