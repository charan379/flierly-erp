import { useState, useEffect } from "react";

function useElementHeight(className) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = document.getElementsByClassName(className)[0];
    if (element) {
      const updateHeight = () => {
        setHeight(element.offsetHeight);
      };

      // Set initial height
      updateHeight();

      // Create a ResizeObserver to listen for changes in size
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });

      resizeObserver.observe(element);

      // Cleanup observer on component unmount
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [className]);

  return height;
}

export default useElementHeight;
