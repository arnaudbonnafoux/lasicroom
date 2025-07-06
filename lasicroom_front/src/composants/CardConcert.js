import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/card_concert.css';

const CardConcert = ({ concert }) => {
  return (
    <div className="carte-concert">
      <img src={`http://localhost:3001/${concert.photo}`}
        alt={concert.nom_artiste} />
      <h3>{concert.nom_artiste}</h3>
      <p>{new Date(concert.date_concert).toLocaleDateString()}</p>
      <Link to="/options" className="btn btn-primary style_bouton mt-2">
        Réserver
      </Link>
    </div>
  );
};

export default CardConcert;
