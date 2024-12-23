import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

/**
 * Applies sorting to a TypeORM Query Builder.
 *
 * @param {SelectQueryBuilder<T>} queryBuilder - The TypeORM Query Builder instance.
 * @param {Record<string, SortOrder>} sort - An object where keys are field names and values are sort orders.
 *   - Values can be: 'ascend', 'descend', 'asc', 'desc', 'ascending', 'descending', 1, or -1.
 * @returns {SelectQueryBuilder<T>} - The updated Query Builder with applied sorting.
 */
function qbSortOrder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, sort: Record<string, SortOrder>): SelectQueryBuilder<T> {
  Object.entries(sort).forEach(([key, value]) => {
    const order = value === 'ascend' || value === 'asc' || value === 'ascending' || value === 1 ? 'ASC' : 'DESC'; // Default to DESC if not ascending

    // Apply order to the query builder
    queryBuilder.addOrderBy(`${queryBuilder.alias}.${key}`, order);
  });

  return queryBuilder;
}

export default qbSortOrder;
