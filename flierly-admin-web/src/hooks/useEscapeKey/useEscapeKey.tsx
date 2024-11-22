import { useCallback, useEffect } from "react";

// Constants for the key name and event type
const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

// Typing the callback function parameter
export default function useEscapeKey(callbackFunc: () => void): void {
  // handleEscKey is a memoized function that checks for the Escape key
  const handleEscKey = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === KEY_NAME_ESC) {
        callbackFunc();
      }
    },
    [callbackFunc]
  );

  useEffect(() => {
    // Listen to keyup events
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    // Cleanup listener when the component unmounts
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}