import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

/**
 * Applies sorting to a TypeORM Query Builder.
 * 
 * @param {SelectQueryBuilder<T>} queryBuilder - The TypeORM Query Builder instance.
 * @param {Object<string, SortOrder>} sort - An object where keys are field names and values are sort orders.
 *   - Values can be: 'ascend', 'descend', 'asc', 'desc', 'ascending', 'descending', 1, or -1.
 * @returns {SelectQueryBuilder<T>} - The updated Query Builder with applied sorting.
 */
function applySort<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    sort: { [key: string]: SortOrder }
): SelectQueryBuilder<T> {
    Object.entries(sort).forEach(([key, value], index) => {
        let order: "ASC" | "DESC";

        switch (value) {
            case 'ascend':
            case 'asc':
            case 'ascending':
            case 1:
                order = "ASC";
                break;
            case 'descend':
            case 'desc':
            case 'descending':
            case -1:
                order = "DESC";
                break;
            default:
                order = "ASC";
        }

        if (index === 0) {
            queryBuilder.orderBy(`${queryBuilder.alias}.${key}`, order);
        } else {
            queryBuilder.addOrderBy(`${queryBuilder.alias}.${key}`, order);
        }
    });

    return queryBuilder;
}

export default applySort;