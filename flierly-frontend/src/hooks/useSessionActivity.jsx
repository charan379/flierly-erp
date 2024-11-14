import { useEffect, useCallback, useRef } from 'react';

const useSessionActivity = (onActivity) => {
  const timeoutIdRef = useRef(null);

  // Debounce the activity handler to reduce the frequency of updates
  const handleActivity = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(onActivity, 300); // Adjust debounce delay as needed
  }, [onActivity]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [handleActivity]);

  return null;
};

export default useSessionActivity;
