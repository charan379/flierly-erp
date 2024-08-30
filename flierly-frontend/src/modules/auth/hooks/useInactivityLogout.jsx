import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import useSessionActivity from '@/hooks/useSessionActivity';

const useInactivityLogout = (timeout) => {
    const [lastActivity, setLastActivity] = useState(Date.now());
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useSessionActivity(() => {
        setLastActivity(Date.now());
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn && (Date.now() - lastActivity > timeout)) {
                // Log out the user
                logout();
                navigate('/login')
            }
        }, 1 * 60 * 1000); // Check every 1 miniutes

        return () => clearInterval(interval);

    }, [lastActivity, timeout]);

    return null;
};

export default useInactivityLogout;
