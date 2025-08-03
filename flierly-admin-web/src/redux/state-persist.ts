/**
 * Checks if a string is a valid JSON string.
 *
 * @param str - The string to check.
 * @returns true if the string is a valid JSON string, otherwise false.
 */
function isJsonString(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    console.error((e as Error).message)
    return false
  }
}

/**
 * Performs a health check on the local storage.
 * Removes items that are not valid JSON strings or are empty objects.
 * If an exception occurs, clears the entire local storage.
 */
export const localStorageHealthCheck = async (): Promise<void> => {
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const key = localStorage.key(i)
      if (key === null) continue // Edge case: key could be null

      const result = window.localStorage.getItem(key)

      if (result && (!isJsonString(result) || Object.keys(JSON.parse(result)).length === 0)) {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      window.localStorage.clear()
      console.error('window.localStorage Exception occurred:', error)
    }
  }
}

/**
 * Provides methods for interacting with the local storage.
 */
export const statePersist = {
  /**
   * Stores a JavaScript object in the local storage.
   *
   * @param key - The key under which to store the object.
   * @param state - The JSON String object to store.
   */
  set: (key: string, state: string): void => {
    window.localStorage.setItem(key, state)
  },

  /**
   * Retrieves an item from local storage.
   * If the item is a valid JSON string, it is parsed into a JavaScript object and returned.
   * If the item is not valid or not found, `null` is returned.
   *
   * @param key - The key of the item to retrieve.
   * @returns The parsed object or `null` if invalid or not found.
   */
  get: <T>(key: string): T | null => {
    const result = window.localStorage.getItem(key)
    if (!result || !isJsonString(result)) {
      window.localStorage.removeItem(key)
      return null
    }
    return JSON.parse(result) as T
  },

  /**
   * Removes an item from the local storage.
   *
   * @param key - The key of the item to remove.
   */
  remove: (key: string): void => {
    window.localStorage.removeItem(key)
  },

  /**
   * Returns the entire local storage object.
   *
   * @returns The local storage object.
   */
  getAll: (): Storage => {
    return window.localStorage
  },

  /**
   * Clears the entire local storage.
   */
  clear: (): void => {
    window.localStorage.clear()
  },
}

export default statePersist
