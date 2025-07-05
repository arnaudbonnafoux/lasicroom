import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar_admin.css';

const Navbar_admin = () => {
  return (
    <nav className="navbar">
      <Link to="/admin/concerts" className="navbar_liens">Concerts</Link>
      <Link to="/admin/artistes" className="navbar_liens">Artistes</Link>
      <Link to="/admin/reservations" className="navbar_liens">Réservation</Link>
      <Link to="/admin/accompagnement" className="navbar_liens">Accompagnement</Link>
    </nav>
  );
};

export default Navbar_admin;
