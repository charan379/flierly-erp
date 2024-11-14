import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import useSessionActivity from '@/hooks/useSessionActivity';

const useInactivityLogout = (timeout) => {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    // Track last activity time (use useRef for performance)
    const lastActivityRef = useRef(Date.now());
    const intervalIdRef = useRef(null);

    const handleActivity = useCallback(() => {
        lastActivityRef.current = Date.now();
    }, []);

    useSessionActivity(handleActivity);

    useEffect(() => {
        const checkInactivity = () => {
            if (isLoggedIn && (Date.now() - lastActivityRef.current > timeout)) {
                const callback = {
                    pathname: window.location.pathname,
                    search: window.location.search,
                    url: window.location.href
                };
                // Log out the user
                logout();
                navigate(`/login?callback=${encodeURIComponent(JSON.stringify(callback))}`);
            }
        };

        intervalIdRef.current = setInterval(checkInactivity, 1 * 60 * 1000); // Check every 1 minute

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [isLoggedIn, logout, navigate, timeout]);

    return null;
};

export default useInactivityLogout;
