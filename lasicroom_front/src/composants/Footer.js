import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className='div_footer'>
        <a href="mailto:lasicroom@laposte.net">
          <img src="/images/square-envelope-solid.svg" alt="Envoyer un e-mail" className='dimension_icones'/>
        </a>
        <a href="tel:+33344212283">
          <img src="/images/phone-solid.svg" alt="Téléphone" className='dimension_icones'/>
        </a>
        <a href="https://maps.app.goo.gl/SEfrYKpRFXwN6DWL8" target="_blank" rel="noopener noreferrer">
          <img src="/images/location-pin-solid.svg" alt="Localisation" className='dimension_icones'/>
        </a>
      </div>

      <div style={{textAlign:'center'}}>
        <Link to="/mentions_legales" className='liens_footer'>Mentions légales|</Link>
        <Link to="/conditions_utilisation"className='liens_footer'>CGU|</Link>
        <Link to="/admin/connexion"className='liens_footer'>Admin</Link>
      </div>

      <p style={{textAlign:'center', color:'#f5f5f5', fontSize:'10px', paddingBottom:'10px'}} className="licence">&copy; 2025 duanrA</p>
    </footer>
  );
};

export default Footer;
