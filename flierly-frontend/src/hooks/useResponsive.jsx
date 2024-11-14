import { useEffect, useState } from 'react';
import isBrowser from '@/utils/isBrowser';

// Set to store all subscribers
const subscribers = new Set();

// Information about the current screen size
let info;

// Configuration for different screen sizes
let responsiveConfig = {
    xs: 0,
    sm: 576,
    isMobile: 768,
    md: 768,
    lg: 992,
    xl: 1200,
};

/**
 * Handle window resize events.
 * Recalculates the screen size information and notifies all subscribers if it has changed.
 */
function handleResize() {
    const oldInfo = info;
    calculate();
    if (oldInfo === info) return;
    for (const subscriber of subscribers) {
        subscriber();
    }
}

// Flag to indicate if we are currently listening for resize events
let listening = false;

/**
 * Calculate the current screen size information based on the window width and the responsiveConfig.
 */
function calculate() {
    const width = window.innerWidth;
    const newInfo = {};
    let shouldUpdate = false;
    for (const key of Object.keys(responsiveConfig)) {
        newInfo[key] = width >= responsiveConfig[key];
        if (newInfo[key] !== info[key]) {
            shouldUpdate = true;
        }
    }
    if (shouldUpdate) {
        info = newInfo;
    }
}

/**
 * Update the responsive configuration.
 * @param {Object} config - The new responsive configuration.
 */
export function configResponsive(config) {
    responsiveConfig = config;
    if (info) calculate();
}

/**
 * React hook to get the current screen size information.
 * returns {Object} The current screen size information.
 */
export default function useResponsive() {
    // Start listening for resize events if we are in a browser environment and not already listening
    if (isBrowser && !listening) {
        info = {};
        calculate();
        window.addEventListener('resize', handleResize);
        listening = true;
    }

    // State to store the current screen size information
    const [state, setState] = useState(info);

    useEffect(() => {
        if (!isBrowser) return;
        // In React 18's StrictMode, useEffect perform twice, resize listener is remove, so handleResize is never perform.
        // https://github.com/alibaba/hooks/issues/1910
        if (!listening) {
            window.addEventListener('resize', handleResize);
        }
        const subscriber = () => {
            setState(info);
        };
        subscribers.add(subscriber);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                window.removeEventListener('resize', handleResize);
                listening = false;
            }
        };
    }, []);

    return { screenSize: state, isMobile: !state.md };
}
