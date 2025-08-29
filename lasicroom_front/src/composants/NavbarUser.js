import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavbarUser = () => {
  return (
    <nav>
      <Link to="/accueil_user" className='liens'>Accueil</Link>
      <Link to="/agenda_user" className='liens'>Agenda</Link>
      <Link to="/dashboard" className='liens'>Mes réservations</Link>
    </nav>
  );
};

export default NavbarUser;
