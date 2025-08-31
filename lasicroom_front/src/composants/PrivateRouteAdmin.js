// src/composants/PrivateRoute.js
import { Navigate } from 'react-router-dom';

function PrivateRouteAdmin({ children }) {
  const token = sessionStorage.getItem('token'); // vérifie la session en cours

  if (!token) {
    // si pas de token en session → redirige vers /connexion
    return <Navigate to="/admin/connexion" replace />;
  }

  // sinon on affiche la page demandée (children => page entre le composant)
  return children;
}

export default PrivateRouteAdmin;
