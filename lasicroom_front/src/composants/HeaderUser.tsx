import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePanier } from '../contexts/PanierContext';
import '../styles/header.css';

const HeaderUser = () => {
  const navigate = useNavigate();
  const { nombreArticles, total } = usePanier();

  const handleAllerAuPanier = () => {
    navigate('/panier');
  };

  return (
    <header>
      <div className='div_header'>
        <img src="/images/dessin_1.jpg" alt="Logo" className='logo' />
        <h1 className='titre'>Espace Perso 😎</h1>
        
        {/* Badge panier */}
        {nombreArticles > 0 && (
          <button 
            className="badge-panier"
            onClick={handleAllerAuPanier}
            title="Voir le panier"
          >
            🛒 {nombreArticles} ({total.toFixed(2)}€)
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderUser;
