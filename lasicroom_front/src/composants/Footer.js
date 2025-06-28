import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icons">
        <a href="mailto:lasicroom@laposte.net">
          <img src="/images/square-envelope-solid.svg" alt="Envoyer un e-mail" className='img_footer' />
        </a>
        <a href="tel:+33344212283">
          <img src="/images/phone-solid.svg" alt="Téléphone" className='img_footer' />
        </a>
        <a href="https://maps.app.goo.gl/SEfrYKpRFXwN6DWL8" target="_blank" rel="noopener noreferrer">
          <img src="/images/location-pin-solid.svg" alt="Localisation" className='img_footer'/>
        </a>
      </div>

      <div className="liens_footer">
        <a href="mentions_légales.js" className='color_liens'>Mentions légales</a>
        <a href="conditions_légales.js" className='color_liens'>Conditions d'utilisation</a>
        <a href="gestion_concert.js" className='color_liens'>Admin</a>
      </div>

      <p className="licence">&copy; 2025 duanrA</p>
    </footer>
  );
};

export default Footer;
