/*
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

export default PrivateRouteAdmin;*/

/*
// src/composants/PrivateRouteAdmin.js
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // npm install jwt-decode

function PrivateRouteAdmin({ children }) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/connexion" replace />;
  }

  try {
    const decoded = jwt_decode(token); // decode le JWT
    if (decoded.role !== 'admin') {
      return <Navigate to="/unauthorized" replace />; // page 403 custom
    }
  } catch (err) {
    return <Navigate to="/admin/connexion" replace />;
  }

  return children;
}

export default PrivateRouteAdmin;*/

import { Navigate } from 'react-router-dom';

function parseJwt(token) {
  try {
    // Découpe le token et décode la partie payload
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function PrivateRouteAdmin({ children }) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/connexion" replace />;
  }

  const decoded = parseJwt(token);

  if (!decoded || decoded.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default PrivateRouteAdmin;
