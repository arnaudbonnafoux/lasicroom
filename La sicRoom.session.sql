-- Script SQL de création de la base de données lasicroom2 (PostgreSQL)

-- Suppression des tables si elles existent déjà (ordre inverse des dépendances)
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS accompagnement;
DROP TABLE IF EXISTS concert;
DROP TABLE IF EXISTS utilisateur;

-- Création de la table utilisateur
CREATE TABLE utilisateur (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('utilisateur', 'admin')) NOT NULL
);

-- Création de la table concert (ajout des tarifs)
CREATE TABLE concert (
    id_concert SERIAL PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    date_concert TIMESTAMP NOT NULL,
    nb_places_total INT NOT NULL,
    nb_places_restantes INT NOT NULL,
    lien_video VARCHAR(255),
    tarif_plein NUMERIC(6,2) NOT NULL,
    tarif_abonne NUMERIC(6,2) NOT NULL
);

-- Création de la table reservation (ajout type_tarif et montant)
CREATE TABLE reservation (
    id_reservation SERIAL PRIMARY KEY,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_utilisateur INT REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    id_concert INT REFERENCES concert(id_concert) ON DELETE CASCADE,
    type_tarif VARCHAR(20) CHECK (type_tarif IN ('plein', 'abonne')) NOT NULL,
    montant NUMERIC(6,2) NOT NULL
);

-- Création de la table accompagnement
CREATE TABLE accompagnement (
    id_demande SERIAL PRIMARY KEY,
    nom_artiste VARCHAR(100) NOT NULL,
    email_artiste VARCHAR(100) NOT NULL,
    style_musical VARCHAR(100),
    message TEXT,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    traite BOOLEAN DEFAULT FALSE
);
