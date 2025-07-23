import React from 'react';
import '../styles/card_concert.css';

const CardConcert = ({ concert, fullWidth = false }) => {
  return (
    <div className={`card_concert animation_card ${fullWidth ? 'fullwidth' : ''}`}>
      <h3>{concert.nom_artiste}</h3>
      <p>{new Date(concert.date_concert).toLocaleDateString()}</p>
      <img
        className='image_card'
        //src={`http://localhost:3001/${concert.photo}`}
        //src={`/photos_artistes/${concert.photo}`}
        src={`/${concert.photo}`}
        alt={concert.nom_artiste}
      />
    </div>
  );
};

export default CardConcert;
