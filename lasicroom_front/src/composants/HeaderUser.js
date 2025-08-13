import React from 'react';
import '../styles/header.css';

const HeaderUser = () => {
  return (
    <header>
      <div className='div_header'>
        <img src="/images/dessin_1.jpg" alt="Logo" className='logo'/>
        <h1 className='titre'>La sicRoom | Espace Perso 😎</h1>
      </div>
    </header>
  );
};

export default HeaderUser;
