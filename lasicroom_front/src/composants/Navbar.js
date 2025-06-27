import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-custom">
      <a href="/" className="nav-link">Accueil</a>
      <a href="/agenda" className="nav-link">Agenda</a>
      <a href="/accompagnement" className="nav-link">Accompagnement</a>
    </nav>
  );
};

export default Navbar;
