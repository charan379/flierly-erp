/**
 * Creates a throttled function that only invokes `func` at most once per every `limit` milliseconds.
 *
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to throttle invocations to.
 * @returns The new throttled function.
 */
const throttle = <T extends (..._args: any[]) => void>(func: T, limit: number): T => {
  let lastRan = 0 // Timestamp of the last function execution
  let lastFunc: ReturnType<typeof setTimeout> | null = null // Timeout ID for the last scheduled function call

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now() // Current timestamp

    if (now - lastRan >= limit) {
      // If the time since the last execution is greater than or equal to the limit, execute the function
      func.apply(this, args)
      lastRan = now // Update the last execution timestamp
    } else {
      // Clear the previous timeout if it exists
      if (lastFunc) {
        clearTimeout(lastFunc)
      }
      // Schedule the function to be called after the remaining time
      lastFunc = setTimeout(
        () => {
          func.apply(this, args)
          lastRan = Date.now() // Update the last execution timestamp
        },
        limit - (now - lastRan),
      )
    }
  } as T
}

export default throttle
