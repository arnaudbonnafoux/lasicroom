import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * 🔐 PrivateRoute
 * Protège les routes utilisateur (authentification requise)
 */
const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
}): React.ReactElement => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/connexion_user" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
