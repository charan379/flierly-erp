import { useEffect } from "react";

function useOnOutsideScroll(elementId, callbackFunc) {
  useEffect(() => {
    const handleScroll = (event) => {
      // Get the element by ID
      const element = document.getElementById(elementId);

      // Do nothing if scrolling inside the element or its descendant elements
      if (element && element.contains(event.target)) {
        return;
      }

      // Trigger the callback function on scroll outside the element
      callbackFunc();
    };

    // Listen for scroll events (using capture phase to listen for scroll events on all elements)
    document.addEventListener("scroll", handleScroll, true);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [elementId, callbackFunc]);

}

export { useOnOutsideScroll };