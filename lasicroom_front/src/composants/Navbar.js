import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__div">
        <Link to="/" className="navbar_liens">Accueil</Link>
        <Link to="/agenda" className="navbar_liens">Agenda</Link>
        <Link to="/accompagnement" className="navbar_liens">Accompagnement</Link>
      </div>
    </nav>
  );
};

export default Navbar;
