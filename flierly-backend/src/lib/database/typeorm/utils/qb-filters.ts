import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import qbWhereCondition from './qb-where-condition.util';

/**
 * Applies filters to a TypeORM Query Builder.
 *
 * @param {SelectQueryBuilder<T>} queryBuilder - The TypeORM Query Builder instance.
 * @param {string} alias - The alias used in the query.
 * @param {any} filter - The filter object.
 */
function qbFilters<T extends ObjectLiteral> (queryBuilder: SelectQueryBuilder<T>, alias: string, filter: any): void {
  Object.keys(filter).forEach((field) => {
    const value = filter[field];

    // Apply standard conditions
    qbWhereCondition(queryBuilder, alias, field, value, 'andWhere');
  });
}

export default qbFilters;
