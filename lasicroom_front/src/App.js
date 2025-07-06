import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages utilisateurs
import Accueil from './pages/accueil';
import Agenda from './pages/agenda';
import Billetterie from './pages/billetterie';
import Accompagnement from './pages/accompagnement';
import Options from './pages/options';

// Cadre légale
import MentionsLegales from './pages/mentions_legales';
import ConditionsUtilisation from './pages/conditions_utilisation';

// Admin
import GestionConnexion from './pages/admin/gestion_connexion';
import GestionConcerts from './pages/admin/gestion_concerts';
import GestionReservations from './pages/admin/gestion_reservations';
import GestionAccompagnement from './pages/admin/gestion_accompagnement';
import GestionArtistes from './pages/admin/gestion_artistes';

// Authentification
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';

//Routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/billetterie" element={<Billetterie />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/options" element={<Options />} />

        {/*Inscription et Authentification utilisateurs*/}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        
        {/*Authentification_admin */}
        <Route path="/admin/connexion" element={<GestionConnexion />} />

        {/* Cadre légale */}
        <Route path="/mentions_legales" element={<MentionsLegales />} />
        <Route path="/conditions_utilisation" element={<ConditionsUtilisation />} />
      
        {/* Admin */}
        <Route path="/admin/concerts" element={<GestionConcerts />} />
        <Route path="/admin/reservations" element={<GestionReservations />} />
        <Route path="/admin/accompagnement" element={<GestionAccompagnement />} />
        <Route path="/admin/artistes" element={<GestionArtistes />} />
      </Routes>
    </Router>
  );
}

export default App;
