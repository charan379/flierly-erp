import { useEffect } from 'react';

const useSessionActivity = (onActivity) => {
    useEffect(() => {
        const handleActivity = () => {
            onActivity();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('click', handleActivity);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('click', handleActivity);
        };
    }, [onActivity]);
};

export default useSessionActivity;
