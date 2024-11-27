import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook to track the width of a referenced HTML element.
 * @template T The type of the element to observe (e.g., HTMLDivElement).
 * @returns An object containing:
 *  - `ref`: A ref to attach to the element whose width needs to be observed.
 *  - `width`: The current width of the element.
 */
const useElementWidth = <T extends HTMLElement>() => {
    const ref = useRef<T>(null); // Generic ref to support any HTMLElement type
    const [width, setWidth] = useState<number>(0);

    const updateWidth = useCallback(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth); // Update width on element resize
        }
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Use requestAnimationFrame to improve performance and avoid multiple updates in a single frame
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateWidth); // Optimize updates by scheduling them to happen in the next animation frame
        });

        resizeObserver.observe(element);
        updateWidth(); // Initialize the width on mount

        return () => {
            resizeObserver.disconnect(); // Cleanup observer when component unmounts
        };
    }, [updateWidth]);

    return { ref, width }; // Return the ref and the width
};

export default useElementWidth;
