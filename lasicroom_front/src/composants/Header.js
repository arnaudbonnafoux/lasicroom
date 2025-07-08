// src/composants/Header.js
import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <div className='div_header'>
        <img src="/images/dessin_1.jpg" alt="Logo" className='logo'/>
        <h1 className='titre'>La sicRoom</h1>
      </div>
    </header>
  );
};

export default Header;
