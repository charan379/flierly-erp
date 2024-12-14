import { useState, useEffect } from "react";

interface UseElementHeightOptions {
  maxRetries?: number;
  delay?: number;
  fallbackHeight?: number;
}

export default function useElementHeightByClassName(
  className: string,
  options: UseElementHeightOptions = {}
): number {
  const { maxRetries = 20, delay = 500, fallbackHeight = 0 } = options;

  const [height, setHeight] = useState<number>(fallbackHeight);

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    let retryTimeout: NodeJS.Timeout | null = null;
    let retryCount: number = 0;

    const updateHeight = (element: HTMLElement) => {
      setHeight(element.offsetHeight);
    };

    const observeElement = () => {
      const element = document.getElementsByClassName(className)[0] as HTMLElement;
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

    // Periodically check for element removal and re-adding
    const monitorElement = () => {
      const element = document.getElementsByClassName(className)[0] as HTMLElement;

      if (!element && retryCount < maxRetries) {
        retryCount += 1;
        retryTimeout = setTimeout(observeElement, delay); // Retry to observe the element if it reappears
      } else if (element) {
        // Reset retry count if element is found again
        retryCount = 0;
        updateHeight(element);
      }
    };

    observeElement();

    // Set an interval to monitor if the element gets removed and re-added
    const monitorInterval = setInterval(monitorElement, delay);

    // Cleanup observer, timeout, and interval on component unmount
    return () => {
      if (observer) observer.disconnect();
      if (retryTimeout) clearTimeout(retryTimeout);
      clearInterval(monitorInterval);
    };
  }, [className, maxRetries, delay]);

  return height;
}
