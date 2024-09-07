import mongoose from "mongoose";

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

/**
 * Transforms a sort object with various sort order representations into a format compatible with MongoDB.
 * 
 * @param {Object<string, SortOrder>} sort - An object where keys are field names and values are sort orders.
 *   - Values can be: 'ascend', 'descend', 'asc', 'desc', 'ascending', 'descending', 1, or -1.
 * @returns {Object<string, mongoose.SortOrder>} - An object where keys are field names and values are MongoDB-compatible sort orders.
 *   - MongoDB-compatible values are either 1 (ascending) or -1 (descending).
 */
function transformMongoQuerySort(sort: { [key: string]: SortOrder }): { [key: string]: mongoose.SortOrder } {
   console.log(sort)
    return Object.fromEntries(
        Object.entries(sort).map(([key, value]) => {
            let order: mongoose.SortOrder;

            // Determine the MongoDB sort order based on the input value
            switch (value) {
                case 'ascend':
                case 'asc':
                case 'ascending':
                case 1:
                    order = 1; // Ascending order
                    break;
                case 'descend':
                case 'desc':
                case 'descending':
                case -1:
                    order = -1; // Descending order
                    break;
                default:
                    order = 1; // Default to ascending if the value is unknown
            }

            return [key, order];
        })
    );
}

export default transformMongoQuerySort;
