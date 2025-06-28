import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar_liens">Accueil</a>
      <a href="/agenda" className="navbar_liens">Agenda</a>
      <a href="/accompagnement" className="navbar_liens">Accompagnement</a>
    </nav>
  );
};

export default Navbar;
