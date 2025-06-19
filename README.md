# Présentation
Le projet consiste à développer une application web pour une salle de concert S.M.A.C, spécialisée dans les musiques actuelles : La sicRoom. Cette plateforme doit permettre de présenter la programmation musicale, vendre des billets en ligne, proposer un espace d’accompagnement pour les artistes, et rendre accessible du contenu multimédia (vidéos, live stream, ressources pédagogiques).
Le site s’adresse à plusieurs types d’utilisateurs : le grand public, les artistes locaux, et les administrateurs de la salle.

# Structure du projet
la-sicroom/
│
├── frontend/                         # Partie front-end (React)
│   ├── public/                      # Fichiers statiques publics
│   ├── src/
│   │   ├── assets/                  # Images, logos, icônes
│   │   ├── composants/             # Composants réutilisables (Header, Footer, etc.)
│   │   ├── pages/                  # Pages principales
│   │   │   ├── Accueil.jsx
│   │   │   ├── Agenda.jsx
│   │   │   ├── Billetterie.jsx
│   │   │   ├── Accompagnement.jsx
│   │   │   └── admin/              # Pages d’administration
│   │   │       ├── TableauDeBord.jsx
│   │   │       ├── GestionConcerts.jsx
│   │   │       ├── GestionReservations.jsx
│   │   │       └── GestionDemandes.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── navigation/            # Routes React Router
│   │       └── routes.jsx
│   ├── package.json
│
├── backend/                          # Partie back-end (Node.js)
│   ├── controleurs/                 # Logique métier (équivalent "controllers")
│   ├── modeles/                     # Requêtes vers PostgreSQL
│   ├── routes/                      # Points de terminaison API
│   ├── config/                      # Connexion base de données, .env
│   ├── outils/                      # Fonctions utilitaires (hashage, validation)
│   ├── serveur.js                   # Lancement du serveur
│   └── package.json
│
├── base_de_donnees/                 # Scripts SQL
│   ├── creation.sql                 # Création des tables
│   ├── donnees_test.sql            # Insertion de données
│   ├── fonctions.sql               # Fonctions SQL personnalisées
│
├── documentation/                   # Tous les éléments de doc
│   ├── MCD.xmi                     # Modèle conceptuel
│   ├── logique_modelisation.md     # Explication de la structure
│   ├── maquettes_figma/           # Mockups / UI admin et utilisateur
│   ├── diagrammes/                # Diagrammes UML (cas d'utilisation, séquence)
│   └── README.md
│
├── .env                             # Variables d’environnement
└── README.md                        # Présentation globale du projet

