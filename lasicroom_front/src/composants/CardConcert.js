import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/card_concert.css';

const CardConcert = ({ concert }) => {
  return (
    <div className='card_concert animation_card'>
      <h3>{concert.nom_artiste}</h3>
      <p>{new Date(concert.date_concert).toLocaleDateString()}</p>
      <img className='image_card'
        src={`http://localhost:3001/${concert.photo}`}
        alt={concert.nom_artiste}
      />
      <div>
        <Link to="/options">Réserver</Link>
      </div>
    </div>
  );
};

export default CardConcert;
