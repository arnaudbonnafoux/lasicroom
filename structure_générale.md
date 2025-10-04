# Structure du projet

```
.
├── documentation_technique
│   ├── accessibilité.md
│   ├── backend.md
│   ├── backup_lasicroom2.sql
│   ├── base_de_donées.md
│   ├── bd_structure.txt
│   ├── cadre_légal.md
│   ├── configuration_nginx
│   ├── déploiement.md
│   ├── diagrammeUML.png
│   ├── frontend.md
│   ├── live_streaming.md
│   ├── optimisation.md
│   ├── parcours_admin.md
│   ├── parcours_utilisateur.md
│   ├── présentation.md
│   ├── Projet - Développement du site web de La sicRoom – Salle de concert SMAC.docx
│   ├── Projet - Développement du site web de La sicRoom – Salle de concert SMAC.pdf
│   ├── regex_validation.js_front.md
│   ├── sécurité.md
│   ├── SEO.md
│   ├── sommaire.md
│   └── to_do.md
├── fermeture_nginx.sh
├── fermeture_serveur.sh
├── gen_arbo.sh
├── generer_logs_nginx.sh
├── geoip_log.sh
├── lasicroom_back
│   ├── app.js
│   ├── back.log
│   ├── controleurs
│   │   ├── accompagnement_controleur.js
│   │   ├── artiste_controleur.js
│   │   ├── concert_controleur.js
│   │   ├── connexion_controleur.js
│   │   ├── live_controleur.js
│   │   ├── reservation_controleur.js
│   │   └── utilisateur_controleur.js
│   ├── db.js
│   ├── email.js
│   ├── gen_arbo.sh
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── compressionImage.js
│   │   ├── isAdmin.js
│   │   └── multerConfig.js
│   ├── package.json
│   ├── package-lock.json
│   ├── photos_artistes
│   │   ├── cri__1756036168191.webp
│   │   ├── dj_nocturne_1756037914055.webp
│   │   ├── erwan_1756036216689.webp
│   │   ├── indie_sound_1756036080084.webp
│   │   ├── jessica_redux_1756037986646.webp
│   │   ├── mc_flow_1756037340340.webp
│   │   ├── metalcorex_1756036118606.webp
│   │   ├── rasta_vibes_1756037415625.webp
│   │   ├── symphonia_1756035895031.webp
│   │   └── the_rockers_1756037311848.webp
│   ├── routes
│   │   ├── accompagnements.js
│   │   ├── artistes.js
│   │   ├── concerts.js
│   │   ├── connexions.js
│   │   ├── live.js
│   │   ├── reservations.js
│   │   ├── test_accomp.sh
│   │   ├── test_artistes.sh
│   │   ├── test_concerts.sh
│   │   ├── test_connexions.sh
│   │   ├── test_live.sh
│   │   ├── test_reservation.sh
│   │   ├── test_utilisateurs.sh
│   │   └── utilisateurs.js
│   └── structure_backend.md
├── lasicroom_front
│   ├── build
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── images
│   │   │   ├── cart-shopping-solid.svg
│   │   │   ├── dessin_1.jpg
│   │   │   ├── link-solid.svg
│   │   │   ├── location-pin-solid.svg
│   │   │   ├── music-solid.svg
│   │   │   ├── nettoie_toutes_images.sh
│   │   │   ├── optimiser_images.sh
│   │   │   ├── phone-solid.svg
│   │   │   ├── photo_10.jpg
│   │   │   ├── photo_1.jpg
│   │   │   ├── photo_2.jpg
│   │   │   ├── play-solid.svg
│   │   │   ├── renommer_photos.sh
│   │   │   ├── square-envelope-solid.svg
│   │   │   ├── user-group-solid.svg
│   │   │   └── user-solid.svg
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   ├── site.xml
│   │   └── static
│   │       ├── css
│   │       │   ├── main.5cf95254.css
│   │       │   └── main.5cf95254.css.map
│   │       └── js
│   │           ├── main.d6dd6e8f.js
│   │           ├── main.d6dd6e8f.js.LICENSE.txt
│   │           └── main.d6dd6e8f.js.map
│   ├── gen_arbo.sh
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── images
│   │   │   ├── cart-shopping-solid.svg
│   │   │   ├── dessin_1.jpg
│   │   │   ├── link-solid.svg
│   │   │   ├── location-pin-solid.svg
│   │   │   ├── music-solid.svg
│   │   │   ├── nettoie_toutes_images.sh
│   │   │   ├── optimiser_images.sh
│   │   │   ├── phone-solid.svg
│   │   │   ├── photo_10.jpg
│   │   │   ├── photo_1.jpg
│   │   │   ├── photo_2.jpg
│   │   │   ├── play-solid.svg
│   │   │   ├── renommer_photos.sh
│   │   │   ├── square-envelope-solid.svg
│   │   │   ├── user-group-solid.svg
│   │   │   └── user-solid.svg
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── site.xml
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── composants
│   │   │   ├── CardConcert.js
│   │   │   ├── Footer.js
│   │   │   ├── HeaderAdmin.js
│   │   │   ├── Header.js
│   │   │   ├── HeaderUser.js
│   │   │   ├── HelmetWrapper.js
│   │   │   ├── LiveStream.js
│   │   │   ├── Modal.js
│   │   │   ├── NavbarAdmin.js
│   │   │   ├── Navbar.js
│   │   │   ├── NavbarUser.js
│   │   │   ├── PrivateRouteAdmin.js
│   │   │   └── PrivateRoute.js
│   │   ├── gen_arbo.sh
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   │   ├── accompagnement.js
│   │   │   ├── accueil.js
│   │   │   ├── accueil_user.js
│   │   │   ├── admin
│   │   │   │   ├── gestion_accompagnement.js
│   │   │   │   ├── gestion_artistes.js
│   │   │   │   ├── gestion_concerts.js
│   │   │   │   ├── gestion_connexion.js
│   │   │   │   └── gestion_reservations.js
│   │   │   ├── agenda.js
│   │   │   ├── agenda_user.js
│   │   │   ├── billetterie.js
│   │   │   ├── conditions_utilisation.js
│   │   │   ├── connexion.js
│   │   │   ├── connexion_user.js
│   │   │   ├── dashboard.js
│   │   │   ├── inscription.js
│   │   │   ├── mentions_legales.js
│   │   │   └── options.js
│   │   ├── styles
│   │   │   ├── accompagnement.css
│   │   │   ├── accueil.css
│   │   │   ├── agenda.css
│   │   │   ├── billetterie.css
│   │   │   ├── card_concert.css
│   │   │   ├── conditions_utilisation.css
│   │   │   ├── connexion.css
│   │   │   ├── footer.css
│   │   │   ├── gestion_accompagnement.css
│   │   │   ├── gestion_artistes.css
│   │   │   ├── gestion_concerts.css
│   │   │   ├── gestion_reservations.css
│   │   │   ├── header.css
│   │   │   ├── inscription.css
│   │   │   ├── mentions_legales.css
│   │   │   ├── modal.css
│   │   │   ├── navbar_admin.css
│   │   │   ├── navbar.css
│   │   │   └── options.css
│   │   └── utils
│   │       └── validation.js
│   └── structure_frontend.md
├── La sicRoom.session.sql
├── LICENSE
├── nginx_logs
├── ouvrir_nginx.sh
├── ouvrir_serveur.sh
├── README.md
└── structure_générale.md

22 directories, 189 files
```
