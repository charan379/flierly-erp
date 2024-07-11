/**
 * Checks if a string is a valid JSON string.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns true if the string is a valid JSON string, otherwise false.
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        console.error(e.message);
        return false;
    }
};

/**
 * Performs a health check on the local storage.
 * Removes items that are not valid JSON strings or are empty objects.
 * If an exception occurs, clears the entire local storage.
 */
export const localStorageHealthCheck = async () => {
    for (let i = 0; i < localStorage.length; i++) {
        try {
            const key = localStorage.key(i);
            const result = window.localStorage.getItem(key);
            if (!isJsonString(result) || (result && Object.keys(result).length === 0)) {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            window.localStorage.clear();
            console.error('window.localStorage Exception occurred:', error);
        }
    }
};

/**
 * Provides methods for interacting with the local storage.
 */
export const statePersist = {
    /**
     * Stores a JavaScript object in the local storage.
     *
     * @param {string} key - The key under which to store the object.
     * @param {Object} state - The object to store.
     */
    set: (key, state) => {
        window.localStorage.setItem(key, JSON.stringify(state));
    },

    /**
     * Retrieves an item from the local storage.
     * If the item is a valid JSON string, it is parsed into a JavaScript object and returned.
     * If the item is not a valid JSON string, it is removed from the local storage and false is returned.
     *
     * @param {string} key - The key of the item to retrieve.
     * @returns {Object|boolean} - The retrieved object, or false if the item is not a valid JSON string.
     */
    get: (key) => {
        const result = window.localStorage.getItem(key);
        if (!result) {
            return false;
        } else {
            if (!isJsonString(result)) {
                window.localStorage.removeItem(key);
                return false;
            } else return JSON.parse(result);
        }
    },

    /**
     * Removes an item from the local storage.
     *
     * @param {string} key - The key of the item to remove.
     */
    remove: (key) => {
        window.localStorage.removeItem(key);
    },

    /**
     * Returns the entire local storage object.
     *
     * @returns {Storage} - The local storage object.
     */
    getAll: () => {
        return window.localStorage;
    },

    /**
     * Clears the entire local storage.
     */
    clear: () => {
        window.localStorage.clear();
    },
};

export default statePersist;  
