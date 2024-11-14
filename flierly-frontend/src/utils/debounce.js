/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - Returns the new debounced function.
 */
const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    // Clear the previous timeout if it exists
    if (timeoutId) clearTimeout(timeoutId);

    // Set a new timeout to invoke the function after the specified delay
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
