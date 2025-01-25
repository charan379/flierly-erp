/**
 * Creates a debounced version of a function that returns a promise, based on a unique key.
 * The debounced function delays the execution of the original function until after
 * a specified delay has elapsed since the last time the debounced function was invoked with the same key.
 *
 * @param {Function} fn - The function to debounce. It should return a promise.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {Function} - A debounced version of the original function.
 */
function debouncePromise<T extends any[]>(fn: (...args: T) => Promise<any>, delay: number): (key: string, ...args: T) => Promise<any> {
  // Map to store timeout IDs based on unique keys
  const timeoutMap = new Map<string, NodeJS.Timeout>()

  return function (key: string, ...args: T): Promise<any> {
    return new Promise((resolve, reject) => {
      // Clear the previous timeout if it exists for the given key
      if (timeoutMap.has(key)) {
        clearTimeout(timeoutMap.get(key)!)
      }

      // Set a new timeout to call the function after the delay
      const timeoutId = setTimeout(() => {
        fn(...args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            // Clean up the timeoutMap by removing the key after the function execution
            timeoutMap.delete(key)
          })
      }, delay)

      // Store the timeout ID in the map with the given key
      timeoutMap.set(key, timeoutId)
    })
  }
}

export default debouncePromise
