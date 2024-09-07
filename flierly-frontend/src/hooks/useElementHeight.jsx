import { useState, useEffect } from "react";

function useElementHeight(className, maxRetries = 10, delay = 500) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let observer = null;
    let retryTimeout = null;
    let retryCount = 0; // Initialize retry counter

    const updateHeight = (element) => {
      setHeight(element.offsetHeight);
    };

    const observeElement = () => {
      const element = document.getElementsByClassName(className)[0];
      if (element) {
        // Set initial height
        updateHeight(element);

        // Create a ResizeObserver to listen for changes in size
        observer = new ResizeObserver(() => {
          updateHeight(element);
        });
        observer.observe(element);
      } else if (retryCount < maxRetries) {
        // Retry after the specified delay if the element is not found and retry limit is not reached
        retryCount += 1;
        retryTimeout = setTimeout(observeElement, delay);
      }
    };

    observeElement();

    // Cleanup observer and timeout on component unmount
    return () => {
      if (observer) observer.disconnect();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [className, maxRetries, delay]);

  return height;
}

export default useElementHeight;
