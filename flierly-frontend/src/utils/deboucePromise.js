/**
 * Creates a debounced version of a function that returns a promise.
 * The debounced function delays the execution of the original function until after
 * a specified delay has elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} fn - The function to debounce. It should return a promise.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - A debounced version of the original function.
 */
function debouncePromise(fn, delay) {
    let timeoutId;

    return function (...args) {
        return new Promise((resolve, reject) => {
            // Clear the previous timeout if it exists
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Set a new timeout to call the function after the delay
            timeoutId = setTimeout(() => {
                fn(...args)
                    .then(resolve)
                    .catch(reject);
            }, delay);
        });
    };
}

export default debouncePromise;
