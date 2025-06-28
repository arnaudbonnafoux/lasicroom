// src/composants/Header.js
import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="d-flex justify-content-between align-items-center">
        <img src="/images/dessin_1.jpg" alt="Logo" className="logo" />
        <h1 className="flex-grow-1 m-0 title">La sicRoom</h1>
      </div>
    </header>
  );
};

export default Header;
