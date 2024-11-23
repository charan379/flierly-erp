/**
 * Custom implementation of hasOwnProperty to check if an object
 * contains a specific property, even if it is inherited from its prototype.
 *
 * @param obj - The object to check for the property.
 * @param prop - The property name to check for.
 * @returns Returns true if the property exists in the object and is not inherited from the prototype.
 */
function hasOwnProperty<T extends object>(obj: T, prop: keyof any): boolean {
    // Get the object's prototype (either via Object.getPrototypeOf or constructor prototype)
    const proto = Object.getPrototypeOf(obj) || obj.constructor.prototype;
  
    // Check if the property exists in the object itself and not in its prototype chain
    return prop in obj && (!(prop in proto) || proto[prop] !== (obj as any)[prop]);
  }
  
  export default hasOwnProperty;
  