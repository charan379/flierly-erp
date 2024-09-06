import { useState, useEffect } from "react";

function useElementHeight(className) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let observer = null;
    let retryTimeout = null;

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
      } else {
        // Retry after 500ms if the element is not found
        retryTimeout = setTimeout(observeElement, 50);
      }
    };

    observeElement();
    // Cleanup observer and timeout on component unmount
    return () => {
      if (observer) observer.disconnect();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [className]);

  return height;
}

export default useElementHeight;
