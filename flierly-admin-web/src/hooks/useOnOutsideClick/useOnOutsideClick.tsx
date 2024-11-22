import { useEffect } from "react";

// Typing the callback function parameter and elementId
export default function useOnOutsideClick(
  elementId: string, 
  callbackFunc: () => void, 
  executeOnlyOnTouchDevices: boolean = false
): void {
  useEffect(() => {
    // Listener function with event parameter typed as Event
    const listener = (event: Event): void => {
      // Do nothing if event type is not 'touchstart' and executeOnlyOnTouchDevices is true
      if (executeOnlyOnTouchDevices && event.type !== 'touchstart') {
        return;
      }

      // Get the element by ID
      const element = document.getElementById(elementId);

      // Do nothing if clicking inside the element or its descendant elements
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      // Execute the callback function if clicking outside the element
      callbackFunc();
    };

    // Listen to mousedown and touchstart events
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elementId, callbackFunc, executeOnlyOnTouchDevices]);
}