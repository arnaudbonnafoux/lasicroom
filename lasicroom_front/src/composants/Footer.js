import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="footer-icons">
        <a href="mailto:lasicroom@laposte.net">
          <img src="/images/square-envelope-solid.svg" alt="Envoyer un e-mail" />
        </a>
        <a href="tel:+33344212283">
          <img src="/images/phone-solid.svg" alt="Téléphone" />
        </a>
        <a href="https://maps.app.goo.gl/SEfrYKpRFXwN6DWL8" target="_blank" rel="noopener noreferrer">
          <img src="/images/location-pin-solid.svg" alt="Localisation" />
        </a>
      </div>

      <div className="footer-links">
        <a href="mentions_légales.js">Mentions légales</a>
        <a href="conditions_légales.js">Conditions d'utilisation</a>
        <a href="gestion_concert.js">Admin</a>
      </div>

      <p className="footer-credit">&copy; 2025 duanrA</p>
    </footer>
  );
};

export default Footer;
