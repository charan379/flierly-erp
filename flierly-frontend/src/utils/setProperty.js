/**
 * Sets a nested property in an object based on a dot-separated path.
 * @param {Object} obj - The object to update.
 * @param {string} path - The dot-separated path of the property to update.
 * @param {*} value - The value to set at the specified property.
 * @returns {Object} - A new object with the updated property.
 */
const setProperty = (obj, path, value) => {
    if (typeof obj !== 'object' || obj === null) {
        throw new TypeError('First argument must be an object');
    }
    if (typeof path !== 'string') {
        throw new TypeError('Second argument must be a string');
    }

    const keys = path.split('.');
    const lastKey = keys.pop();
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Deep clone to avoid mutation
    const newObj = deepClone(obj);

    let current = newObj;
    for (const key of keys) {
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }

    current[lastKey] = value;
    return newObj;
};


export default setProperty;