import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Pages utilisateurs
import Accueil from './pages/accueil';
import AccueilUser from './pages/accueil_user';
import Agenda from './pages/agenda';
import Billetterie from './pages/billetterie';
import Accompagnement from './pages/accompagnement';
import Options from './pages/options';
import Dashboard from './pages/dashboard';
import AgendaUser from './pages/agenda_user';


// Cadre légal
import MentionsLegales from './pages/mentions_legales';
import ConditionsUtilisation from './pages/conditions_utilisation';

// Admin
import GestionConnexion from './pages/admin/gestion_connexion';
import GestionConcerts from './pages/admin/gestion_concerts';
import GestionReservations from './pages/admin/gestion_reservations';
import GestionAccompagnement from './pages/admin/gestion_accompagnement';
import GestionArtistes from './pages/admin/gestion_artistes';

// Authentification
import PrivateRoute from './composants/PrivateRoute';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import ConnexionUser from './pages/connexion_user';

//Routes
function App() {
  return (
    // Router englobe toute l’application et active la navigation via les URLs
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/options" element={<Options />} />

        {/*Espace personnel*/}
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

        {/*Inscription et Authentification utilisateurs*/}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion_user" element={<ConnexionUser />} />

        {/*Authentification_admin */}
        <Route path="/admin/connexion" element={<GestionConnexion />} />

        {/* Cadre légal */}
        <Route path="/mentions_legales" element={<MentionsLegales />} />
        <Route path="/conditions_utilisation" element={<ConditionsUtilisation />} />

        {/* Admin */}
        <Route path="/admin/concerts" element={
          <PrivateRoute><GestionConcerts /></PrivateRoute>
          } />
        <Route path="/admin/reservations" element={
          <PrivateRoute><GestionReservations /></PrivateRoute>
          } />
        <Route path="/admin/accompagnement" element={
          <PrivateRoute><GestionAccompagnement /></PrivateRoute>
          } />
        <Route path="/admin/artistes" element={
          <PrivateRoute><GestionArtistes /></PrivateRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
