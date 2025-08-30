// src/composants/PrivateRoute.js
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('token'); // vérifie la session en cours

  if (!token) {
    // si pas de token en session → redirige vers /connexion
    return <Navigate to="/connexion_user" replace />;
  }

  // sinon on affiche la page demandée
  return children;
}

export default PrivateRoute;
