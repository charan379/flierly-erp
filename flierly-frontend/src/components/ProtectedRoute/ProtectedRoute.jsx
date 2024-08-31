import { useAuth } from "@/modules/auth/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";
import UnAuthorized from "../UnAuthorized";

const ProtectedRoute = ({ element, requiredPermission }) => {
  const { allowedAccess, isLoggedIn } = useAuth();

  const callback = {
    pathname: window.location.pathname,
    search: window.location.search,
    url: window.location.href,
  };

  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?callback=${encodeURIComponent(JSON.stringify(callback))}`}
      />
    );
  }

  if (!allowedAccess.includes(requiredPermission)) {
    return <UnAuthorized />;
  }

  return element;
};

export default ProtectedRoute;
