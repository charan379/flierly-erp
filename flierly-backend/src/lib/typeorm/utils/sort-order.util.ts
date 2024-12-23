import { ObjectLiteral, FindOptionsOrder } from 'typeorm';

/**
 * Type representing possible sort order values.
 */
type SortOrder = 'ascend' | 'descend' | 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

/**
 * Applies sorting options for the TypeORM repository find method.
 *
 * @param {Record<string, SortOrder>} sort - An object where keys are field names and values are sort orders.
 *   - Values can be: 'ascend', 'descend', 'asc', 'desc', 'ascending', 'descending', 1, or -1.
 * @returns {FindOptionsOrder<ObjectLiteral>} - The constructed sort options for use in repo.find().
 */
function sortOrder(sort: Record<string, SortOrder>): FindOptionsOrder<ObjectLiteral> {
  const order: FindOptionsOrder<ObjectLiteral> = {};

  Object.entries(sort).forEach(([key, value]) => {
    order[key] = value === 'ascend' || value === 'asc' || value === 'ascending' || value === 1 ? 'ASC' : 'DESC'; // Default to DESC if not ascending
  });

  return order;
}

export default sortOrder;
