// src/composants/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
//import './Navbar.css';//

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/agenda">Agenda</Link></li>
        <li><Link to="/accompagnement">Accompagnement</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
