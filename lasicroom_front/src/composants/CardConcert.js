import React from 'react';
import '../styles/card_concert.css';

// Composant fonctionnel pour afficher une carte de concert
const CardConcert = ({ concert, fullWidth = false }) => {
  return (
    // La classe fullwidth est ajoutée si la prop fullWidth est vraie
    <div className={`card_concert animation_card ${fullWidth ? 'fullwidth' : ''}`}>
      {/* Nom de la soirée */}
      <h2 className='titre_concert'>{concert.titre}</h2> 
      {/* Affiche le nom de l'artiste */}
      <h3 className='titre_artiste'>{concert.nom_artiste}</h3>
      {/* Affiche la date du concert, formatée selon la locale */}
      <p>{new Date(concert.date_concert).toLocaleDateString()}</p>

      {/* Affiche les tarifs */}
      <div className="tarifs">
        <p><strong>Plein tarif :</strong> {concert.tarif_plein} €</p>
        <p><strong>Tarif abonné :</strong> {concert.tarif_abonne} €</p>
      </div>

      {/* Affiche l'image du concert ou de l'artiste */}
      <img
        className='image_card'
        src={`/${concert.photo}`}
        alt={concert.nom_artiste}
        loading="lazy" // Optimise le chargement de l'image
      />

      {/* Si un lien vidéo existe, affiche un bouton pour voir la vidéo */}
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
/*
Ce composant React, nommé CardConcert, sert à afficher une carte de présentation pour un concert. 
Il reçoit en props un objet concert contenant toutes les informations à afficher, 
ainsi qu’un booléen fullWidth qui permet d’ajuster la largeur de la carte via une classe CSS.

La carte affiche le titre du concert, le nom de l’artiste, 
et la date du concert (formatée selon la locale de l’utilisateur). 
Les tarifs (plein et abonné) sont présentés dans une section dédiée. 
Une image illustrant l’artiste ou le concert est affichée, 
avec un chargement différé (lazy loading) pour optimiser les performances. 
Si un lien vidéo est disponible dans les données du concert, un bouton permet d’ouvrir la vidéo dans un nouvel onglet.

L’ensemble est stylisé grâce à une feuille de style CSS externe. 
Ce composant est conçu pour être réutilisable et facilement intégrable dans une liste ou une grille de concerts.
*/
