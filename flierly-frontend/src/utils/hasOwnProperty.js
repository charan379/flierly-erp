/**
 * Custom implementation of hasOwnProperty to check if an object
 * contains a specific property, even if it is inherited from its prototype.
 *
 * @param {Object} obj - The object to check for the property.
 * @param {string} prop - The property name to check for.
 * @returns {boolean} - Returns true if the property exists in the object and is not inherited from the prototype.
 */
function hasOwnProperty(obj, prop) {
  // Get the object's prototype (either via __proto__ or constructor prototype)
  var proto = obj.__proto__ || obj.constructor.prototype;

  // Check if the property exists in the object itself and not in its prototype chain
  return prop in obj && (!(prop in proto) || proto[prop] !== obj[prop]);
}

export default hasOwnProperty;
