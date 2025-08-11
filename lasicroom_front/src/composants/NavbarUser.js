import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavbarUser = () => {
  return (
    <nav>
      <Link to="/agenda_user" className='liens'>Agenda</Link>
      <Link to="/dashboard" className='liens'>Réservation</Link>
    </nav>
  );
};

export default NavbarUser;
