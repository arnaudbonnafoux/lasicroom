import React from 'react';
import '../styles/card_concert.css';

const CardConcert = ({ concert, fullWidth = false }) => {
  return (
    <div className={`card_concert animation_card ${fullWidth ? 'fullwidth' : ''}`}>
      <h2 className='titre_concert'>{concert.titre}</h2> {/* Nom de la soirée */}
      <h3 className='titre_artiste'>{concert.nom_artiste}</h3>
      <p>{new Date(concert.date_concert).toLocaleDateString()}</p>
      
      <div className="tarifs">
        <p><strong>Plein tarif :</strong> {concert.tarif_plein} €</p>
        <p><strong>Tarif abonné :</strong> {concert.tarif_abonne} €</p>
      </div>

      <img
        className='image_card'
        src={`/${concert.photo}`}
        alt={concert.nom_artiste}
      />

      {concert.lien_video && (
        <div className="video_link">
          <a
            href={concert.lien_video}
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Voir la vidéo
          </a>
        </div>
      )}
    </div>
  );
};

export default CardConcert;
