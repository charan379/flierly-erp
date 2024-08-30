import { useEffect, useRef, useCallback } from 'react';
import useSessionActivity from '@/hooks/useSessionActivity';
import { useAuth } from './useAuth';

const useTokenRefresh = () => {
    const { tokenExpiresAt, refreshToken } = useAuth();
    const lastActivityRef = useRef(Date.now());
    const intervalIdRef = useRef(null);

    const handleActivity = useCallback(() => {
        lastActivityRef.current = Date.now();
    }, []);

    useSessionActivity(handleActivity);

    useEffect(() => {
        const checkTokenRefresh = () => {
            if (tokenExpiresAt) {
                const expiresAt = new Date(tokenExpiresAt).getTime();
                const currentTime = Date.now();
                const timeToExpire = expiresAt - currentTime;

                if (Date.now() - lastActivityRef.current < 5 * 60 * 1000 && timeToExpire < 10 * 60 * 1000) {
                    refreshToken();
                }
            }
        };

        intervalIdRef.current = setInterval(checkTokenRefresh, 15 * 60 * 1000); // Check every 15 minutes

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [tokenExpiresAt, refreshToken]);

    return null;
};

export default useTokenRefresh;
