import React, { FC } from "react";
import "../styles/header.css";

/**
 * 🎭 Header Component
 */
const Header: FC = (): React.ReactElement => {
  return (
    <header>
      <div className="div_header">
        <img src="/images/dessin_1.jpg" alt="Logo" className="logo" />
        <h1 className="titre">La sicRoom</h1>
      </div>
    </header>
  );
};

export default Header;
