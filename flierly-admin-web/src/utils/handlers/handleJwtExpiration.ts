import { logout } from "@/modules/auth/service/authStateService";

/**
 * Handles JWT expiration by logging the user out and redirecting to the login page.
 */
const handleJwtExpiration = (): void => {
    logout();  // Log the user out
    const callback = {
      pathname: window.location.pathname,  // Current page path
      search: window.location.search,      // Current query parameters
      url: window.location.href,           // Current full URL
    };
    // Redirect to login page with the current URL as the callback
    // window.location.href = `/login?callback=${encodeURIComponent(JSON.stringify(callback))}`;
  };

  export default handleJwtExpiration;