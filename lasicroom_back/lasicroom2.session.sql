SELECT concert.id_concert,
    concert.titre,
    concert.description,
    concert.date_concert,
    concert.nb_places_total,
    concert.nb_places_restantes,
    concert.tarif_plein,
    concert.tarif_abonne,
    concert.id_artiste,
    artiste.nom_artiste,
    artiste.style_musical,
    artiste.description AS description_artiste,
    artiste.photo,
    artiste.lien_video
FROM concert
    LEFT JOIN artiste ON concert.id_artiste = artiste.id_artiste
ORDER BY concert.id_concert