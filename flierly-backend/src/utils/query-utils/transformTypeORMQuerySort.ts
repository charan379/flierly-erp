import { FindOptionsOrder } from "typeorm";

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

/**
 * Transforms a sort object with various sort order representations into a format compatible with TypeORM.
 * 
 * @param {Object<string, SortOrder>} sort - An object where keys are field names and values are sort orders.
 *   - Values can be: 'ascend', 'descend', 'asc', 'desc', 'ascending', 'descending', 1, or -1.
 * @returns {FindOptionsOrder<any>} - An object where keys are field names and values are TypeORM-compatible sort orders.
 *   - TypeORM-compatible values are either "ASC" (ascending) or "DESC" (descending).
 */
function transformTypeORMQuerySort(sort: { [key: string]: SortOrder }): FindOptionsOrder<any> {
    return Object.fromEntries(
        Object.entries(sort).map(([key, value]) => {
            let order: "ASC" | "DESC";

            // Determine the TypeORM sort order based on the input value
            switch (value) {
                case 'ascend':
                case 'asc':
                case 'ascending':
                case 1:
                    order = "ASC"; // Ascending order
                    break;
                case 'descend':
                case 'desc':
                case 'descending':
                case -1:
                    order = "DESC"; // Descending order
                    break;
                default:
                    order = "ASC"; // Default to ascending if the value is unknown
            }

            return [key, order];
        })
    );
}

export default transformTypeORMQuerySort;
