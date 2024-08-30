import useSessionActivity from '@/hooks/useSessionActivity';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';

const useTokenRefresh = () => {

    const [lastActivity, setLastActivity] = useState(Date.now());

    const { tokenExpiresAt } = useAuth();


    useSessionActivity(() => {
        setLastActivity(Date.now());
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (tokenExpiresAt) {
                const expiresAt = new Date(tokenExpiresAt).getTime();
                const currentTime = Date.now();
                const timeToExpire = expiresAt - currentTime;

                if (Date.now() - lastActivity < 5 * 60 * 1000 && timeToExpire < 10 * 60 * 1000) { // Check if user was active in the last 5 minutes and token expires in the next 10 minutes
                    refreshToken();
                }
            }
        }, 15 * 60 * 1000); // Check every 15 minutes

        return () => clearInterval(interval);
    }, [lastActivity, tokenExpiresAt]);

    return null;
}

export default useTokenRefresh;