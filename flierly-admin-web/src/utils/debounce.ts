/**
 * Creates a debounced function that delays invoking `func` until after `delay` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    // Clear the previous timeout if it exists
    if (timeoutId) clearTimeout(timeoutId)

    // Set a new timeout to invoke the function after the specified delay
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default debounce
