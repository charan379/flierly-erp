import UnAuthorized from "@/components/UnAuthorized";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation, useNavigation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredPermissionRegex?: RegExp;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredPermissionRegex }) => {
  const { isLoggedIn, hasPermission, tokenExpiresAt } = useAuth();
  const navigate = useNavigate();
  // const navigation = useNavigation();
  const location = useLocation();

  const callback = {
    pathname: location.pathname,
    search: location.search,
  };

  // Convert token expiration date to Date object
  const tokenExpiresAtDateTime = new Date(tokenExpiresAt);
  const currentDateTime = new Date();
  const isTokenExpired = tokenExpiresAtDateTime < currentDateTime;



  useEffect(() => {
    // Check for the navigation type (reload, back/forward, or new navigation)
    const performanceEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    console.log("hook", performanceEntry?.type)
    // Check if the token is expired and if it's a reload, back, forward, or new navigation
    if (isLoggedIn && isTokenExpired && ["reload", "back_forward", "navigate"].includes(performanceEntry?.type as string)) {
      const targetPath = `/login?callback=${encodeURIComponent(JSON.stringify(callback))}`;
      // navigate(targetPath, { replace: true }); // Perform the navigation
    }

    return () => {

    }
  }, [isLoggedIn, isTokenExpired])

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to={`/login?callback=${encodeURIComponent(JSON.stringify(callback))}`} replace />;
  }

  // Check for required permissions
  if (requiredPermissionRegex && !hasPermission(requiredPermissionRegex)) {
    return <UnAuthorized />;
  }

  // If everything is fine, render the protected content
  return element;
};

export default ProtectedRoute;
