import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

/**
 * 🗺️ Navbar Component
 */
const Navbar: FC = (): React.ReactElement => {
  return (
    <nav>
      <div>
        <Link to="/" className="liens">
          Accueil
        </Link>
        <Link to="/agenda" className="liens">
          Agenda
        </Link>
        <Link to="/accompagnement" className="liens">
          Accompagnement
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
