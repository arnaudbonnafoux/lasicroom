import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar_admin.css';

const NavbarAdmin = () => {
  const [menu_open, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Burger */}
      <div className="burger" onClick={() => setMenuOpen(!menu_open)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Liens */}
      <div className={menu_open ? 'nav_links open' : 'nav_links'}>
        <Link to="/admin/concerts" className='liens'>Concerts</Link>
        <Link to="/admin/artistes" className='liens'>Artistes</Link>
        <Link to="/admin/reservations" className='liens'>Réservation</Link>
        <Link to="/admin/accompagnement" className='liens'>Accompagnement</Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;



