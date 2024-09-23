/**
 * Compare two arrays of numbers (or string numbers) and return items to add and remove.
 * 
 * @param existingArray - The original array of numbers or string numbers.
 * @param newArray - The new array of numbers or string numbers to compare against.
 * @returns An object containing items to add and items to remove.
 */
const compareNumberArrays = (
    existingArray: (number | string)[],
    newArray: (number | string)[]
): { newEntries: number[], removedEntries: number[] } => {

    // Helper function to convert items to numbers
    const toNumber = (item: number | string): number => {
        return typeof item === 'string' ? parseFloat(item) : item;
    };

    // Convert all items to numbers
    const existingNumbers = existingArray.map(toNumber);
    const newNumbers = newArray.map(toNumber);

    // Create sets for fast lookup
    const existingSet = new Set(existingNumbers);
    const newSet = new Set(newNumbers);

    // Items to Add: Items in newSet but not in existingSet
    const newEntries = newNumbers.filter(item => !existingSet.has(item));

    // Items to Remove: Items in existingSet but not in newSet
    const removedEntries = existingNumbers.filter(item => !newSet.has(item));

    return { newEntries, removedEntries };
};

export default compareNumberArrays;
