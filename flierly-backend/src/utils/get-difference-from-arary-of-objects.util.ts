/**
 * Get the difference between two arrays of objects based on a common key.
 *
 * @template T - The type of objects in the arrays.
 * @param {object[]} array1 - The first array of objects.
 * @param {object[]} array2 - The second array of objects.
 * @param {string} key - The common key to compare objects.
 * @returns {T[]} The objects in `array2` that are not in `array1`.
 */
function getDifferenceFromArrayOfObjects<T>(array1: object[], array2: object[], key: string): T[] {
  // Create a set of keys from array1 for efficient lookup
  const keysInArray1 = new Set(array1.map((obj: { [key: string]: any }) => obj[key]));

  // Filter objects in array2 that are not in array1 based on keys in array
  const difference = array2.filter((obj: { [key: string]: any }) => !keysInArray1.has(obj[key]));

  return difference as T[];
}

export default getDifferenceFromArrayOfObjects;
