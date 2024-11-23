import UnAuthorized from "@/components/UnAuthorized";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredPermissionRegex: RegExp;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredPermissionRegex }) => {
  const { isLoggedIn, hasPermission } = useAuth();

  const callback = {
    pathname: window.location.pathname,
    search: window.location.search,
    url: window.location.href,
  };

  // Check if user is logged in
  if (!isLoggedIn) {
    return (
      <Navigate
        to={`/login?callback=${encodeURIComponent(JSON.stringify(callback))}`}
      />
    );
  }

  // Check if user has the required permission
  if (!hasPermission(requiredPermissionRegex)) {
    return <UnAuthorized />;
  }

  // If the user is logged in and has the required permission, render the element
  return element;
};

export default ProtectedRoute;
