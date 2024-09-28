/**
 * Deeply merges two objects. 
 * The properties of the source object will overwrite 
 * the properties of the target object.
 *
 * @param {Object} target - The target object to be merged into.
 * @param {Object} source - The source object to merge from.
 * @returns {Object} - The merged object.
 */
function mergeDeep(target, source) {
    for (const key in source) {
      // Check if the property is an object and not an array
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        // If the target object does not have this key, initialize it as an empty object
        if (!target[key]) Object.assign(target, { [key]: {} });
        // Recursively merge properties
        mergeDeep(target[key], source[key]);
      } else {
        // Assign the value from the source to the target
        target[key] = source[key];
      }
    }
    return target;
  }
  
  export { mergeDeep };
  