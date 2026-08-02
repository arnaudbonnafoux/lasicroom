import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteAdminProps {
  children: ReactNode;
}

interface JWTPayload {
  role: string;
  [key: string]: any;
}

/**
 * 🔐 Décoder un JWT token
 */
function parseJwt(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

/**
 * 🔒 PrivateRouteAdmin
 * Protège les routes admin (authentification + rôle admin requis)
 */
const PrivateRouteAdmin: FC<PrivateRouteAdminProps> = ({
  children,
}): React.ReactElement => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/connexion" replace />;
  }

  const decoded = parseJwt(token);

  if (!decoded || decoded.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRouteAdmin;
