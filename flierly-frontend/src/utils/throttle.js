/**
 * Creates a throttled function that only invokes `func` at most once per every `limit` milliseconds.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The number of milliseconds to throttle invocations to.
 * @returns {Function} - Returns the new throttled function.
 */
const throttle = (func, limit) => {
  let lastRan = 0; // Timestamp of the last function execution
  let lastFunc; // Timeout ID for the last scheduled function call

  return (...args) => {
    const now = Date.now(); // Current timestamp

    if (now - lastRan >= limit) {
      // If the time since the last execution is greater than or equal to the limit, execute the function
      func(...args);
      lastRan = now; // Update the last execution timestamp
    } else {
      // Clear the previous timeout if it exists
      clearTimeout(lastFunc);
      // Schedule the function to be called after the remaining time
      lastFunc = setTimeout(() => {
        func(...args);
        lastRan = Date.now(); // Update the last execution timestamp
      }, limit - (now - lastRan));
    }
  };
};

export default throttle;
