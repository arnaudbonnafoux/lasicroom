import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar_admin.css';

const NavbarAdmin = () => {
  return (
    <nav>
      <Link to="/admin/concerts" className='liens'>Concerts</Link>
      <Link to="/admin/artistes" className='liens'>Artistes</Link>
      <Link to="/admin/reservations" className='liens'>Réservation</Link>
      <Link to="/admin/accompagnement" className='liens'>Accompagnement</Link>
    </nav>
  );
};

export default NavbarAdmin;
