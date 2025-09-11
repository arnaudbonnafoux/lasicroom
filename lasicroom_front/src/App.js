import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Router : permet la navigation via l’URL
// Routes : conteneur de toutes les routes de l’app
// Route : définit une correspondance entre une URL et un composant
import './App.css';


// 📄 Pages "utilisateurs classiques"
import Accueil from './pages/accueil';
import AccueilUser from './pages/accueil_user';
import Agenda from './pages/agenda';
import Billetterie from './pages/billetterie';
import Accompagnement from './pages/accompagnement';
import Options from './pages/options';
import Dashboard from './pages/dashboard';
import AgendaUser from './pages/agenda_user';


// 📜 Cadre légal
import MentionsLegales from './pages/mentions_legales';
import ConditionsUtilisation from './pages/conditions_utilisation';


// 👨‍💼 Pages Admin
import PrivateRouteAdmin from './composants/PrivateRouteAdmin';
// Composant qui protège les routes admin (auth obligatoire)
import GestionConnexion from './pages/admin/gestion_connexion';
import GestionConcerts from './pages/admin/gestion_concerts';
import GestionReservations from './pages/admin/gestion_reservations';
import GestionAccompagnement from './pages/admin/gestion_accompagnement';
import GestionArtistes from './pages/admin/gestion_artistes';

// 🔑 Authentification
import PrivateRoute from './composants/PrivateRoute';
// Composant qui protège les routes utilisateurs (auth obligatoire)
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import ConnexionUser from './pages/connexion_user';


// 🚏 Définition des routes principales de l’application
function App() {
  return (
    // Router englobe toute l’application et active la navigation via les URLs
    <Router>
      <Routes>
        {/* 🏠 Pages publiques accessibles sans connexion */}
        <Route path="/" element={<Accueil />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/options" element={<Options />} />

        {/* 👤 Espace utilisateur (protégé par PrivateRoute = login obligatoire) */}
        <Route path="accueil_user" element={
          <PrivateRoute><AccueilUser /></PrivateRoute>
          } />
        <Route path="/billetterie" element={
          <PrivateRoute><Billetterie /></PrivateRoute>
          } />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
          } />
        <Route path="/agenda_user" element={
          <PrivateRoute><AgendaUser /></PrivateRoute>
          } />

        {/* 🔑 Pages d’inscription et connexion utilisateurs */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion_user" element={<ConnexionUser />} />

         {/* 🔒 Connexion Admin (publique mais liée à un compte admin) */}
        <Route path="/admin/connexion" element={<GestionConnexion />} />
        
        {/* 📜 Pages légales */}
        <Route path="/mentions_legales" element={<MentionsLegales />} />
        <Route path="/conditions_utilisation" element={<ConditionsUtilisation />} />

        {/* 👨‍💼 Espace Admin (protégé par PrivateRouteAdmin) */}
        <Route path="/admin/concerts" element={
          <PrivateRouteAdmin><GestionConcerts /></PrivateRouteAdmin>
          } />
        <Route path="/admin/reservations" element={
          <PrivateRouteAdmin><GestionReservations /></PrivateRouteAdmin>
          } />
        <Route path="/admin/accompagnement" element={
          <PrivateRouteAdmin><GestionAccompagnement /></PrivateRouteAdmin>
          } />
        <Route path="/admin/artistes" element={
          <PrivateRouteAdmin><GestionArtistes /></PrivateRouteAdmin>
          } />
      </Routes>
    </Router>
  );
}

export default App;

/*
Router → active la navigation par URL.
Routes → contient toutes les routes de l’app.
Route → fait correspondre une URL (path) à un composant (element).
PrivateRoute → protège certaines pages côté utilisateur (authentification requise).
PrivateRouteAdmin → protège l’espace admin (authentification + rôle admin requis).
*/