import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import applyCondition from './applyCondition';

/**
 * Applies filters to a TypeORM Query Builder.
 * 
 * @param {SelectQueryBuilder<T>} queryBuilder - The TypeORM Query Builder instance.
 * @param {string} alias - The alias used in the query.
 * @param {any} filter - The filter object.
 */
function applyFilters<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, alias: string, filter: any) {
    Object.keys(filter).forEach((field) => {
        const value = filter[field];

        // Apply standard conditions
        applyCondition(queryBuilder, alias, field, value, 'andWhere');
    });
}

export default applyFilters;
