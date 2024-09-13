import mongoose, { Types } from 'mongoose';

/**
 * Compare two arrays of ObjectIds and return items to add and remove.
 * 
 * @param existingArray - The original array of ObjectIds or strings.
 * @param newArray - The new array of ObjectIds or strings to compare against.
 * @returns An object containing items to add and items to remove.
 */
const compareObjectIdArrays = (
    existingArray: (Types.ObjectId | string)[],
    newArray: (Types.ObjectId | string)[]
): { newEntries: Types.ObjectId[], removedEntries: Types.ObjectId[] } => {

    // console.time('compareObjectIdArrays');

    /**
     * Helper function to ensure the value is an ObjectId.
     * If the value is a string and a valid ObjectId, it converts it to ObjectId.
     * Otherwise, it returns the original value.
     */
    const toObjectId = (item: Types.ObjectId | string): Types.ObjectId => {
        return typeof item === 'string' && mongoose.isValidObjectId(item)
            ? new mongoose.Types.ObjectId(item)
            : item as Types.ObjectId;
    };

    // Convert arrays to ObjectIds
    const existingObjectIds = existingArray.map(toObjectId);
    const newObjectIds = newArray.map(toObjectId);

    // Create sets for fast lookup
    const existingSet = new Set(existingObjectIds.map(id => id.toString()));
    const newSet = new Set(newObjectIds.map(id => id.toString()));

    // Items to Add: Items in newSet but not in existingSet
    const newEntries = newObjectIds.filter(item => !existingSet.has(item.toString()));

    // Items to Remove: Items in existingSet but not in newSet
    const removedEntries = existingObjectIds.filter(item => !newSet.has(item.toString()));

    // console.timeEnd('compareObjectIdArrays');

    return { newEntries, removedEntries };
};

export default compareObjectIdArrays;