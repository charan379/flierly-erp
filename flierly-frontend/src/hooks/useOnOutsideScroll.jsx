import debounce from "@/utils/debounce";
import { useEffect } from "react";

function useOnOutsideScroll(elementId, callbackFunc, delay = 100) {
  useEffect(() => {
    console.log('useOnOutsideScroll executed');

    let element = document.getElementById(elementId);

    const handleScroll = (event) => {
      if (!element) {
        element = document.getElementById(elementId);
      }

      if (element && element.contains(event.target)) {
        return;
      }

      callbackFunc();
    };

    const debouncedHandleScroll = debounce(handleScroll, delay);

    document.addEventListener("scroll", debouncedHandleScroll, { capture: true, passive: true });

    return () => {
      document.removeEventListener("scroll", debouncedHandleScroll, { capture: true });
    };
  }, [elementId, callbackFunc]);
}

export { useOnOutsideScroll };
