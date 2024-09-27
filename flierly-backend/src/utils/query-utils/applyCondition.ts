import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

/**
 * Applies a condition to a TypeORM Query Builder.
 * 
 * @param {SelectQueryBuilder<T>} qb - The TypeORM Query Builder instance.
 * @param {string} alias - The alias used in the query.
 * @param {string} field - The field name.
 * @param {any} condition - The condition value.
 * @param {'andWhere' | 'orWhere'} whereMethod - The method to use for applying the condition.
 */
function applyCondition<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    condition: any,
    whereMethod: 'andWhere' | 'orWhere' = 'andWhere'
) {
    if (typeof condition === 'object' && !Array.isArray(condition)) {
        // Handle special operators like $in, $gte, $lte, $between, etc.
        Object.keys(condition).forEach((operator) => {
            switch (operator) {
                case '$in':  // Handle IN condition
                    if (Array.isArray(condition[operator]) && condition[operator].length > 0) {
                        qb[whereMethod](`${alias}.${field} IN (:...${field})`, { [field]: condition[operator] });
                    }
                    break;
                case '$notIn':  // Handle NOT IN condition
                    if (Array.isArray(condition[operator]) && condition[operator].length > 0) {
                        qb[whereMethod](`${alias}.${field} NOT IN (:...${field})`, { [field]: condition[operator] });
                    }
                    break;
                case '$gte':  // Handle greater than or equal to condition
                    qb[whereMethod](`${alias}.${field} >= :${field}`, { [field]: condition[operator] });
                    break;
                case '$lte':  // Handle less than or equal to condition
                    qb[whereMethod](`${alias}.${field} <= :${field}`, { [field]: condition[operator] });
                    break;
                case '$gt':  // Handle greater than condition
                    qb[whereMethod](`${alias}.${field} > :${field}`, { [field]: condition[operator] });
                    break;
                case '$lt':  // Handle less than condition
                    qb[whereMethod](`${alias}.${field} < :${field}`, { [field]: condition[operator] });
                    break;
                case '$ne':  // Handle not equal condition
                    qb[whereMethod](`${alias}.${field} != :${field}`, { [field]: condition[operator] });
                    break;
                case '$between':  // Handle BETWEEN condition
                    qb[whereMethod](`${alias}.${field} BETWEEN :${field}_start AND :${field}_end`, {
                        [`${field}_start`]: condition[operator][0],
                        [`${field}_end`]: condition[operator][1],
                    });
                    break;
                case '$notBetween':  // Handle NOT BETWEEN condition
                    qb[whereMethod](`${alias}.${field} NOT BETWEEN :${field}_start AND :${field}_end`, {
                        [`${field}_start`]: condition[operator][0],
                        [`${field}_end`]: condition[operator][1],
                    });
                    break;
                case '$isNull':  // Handle IS NULL condition
                    qb[whereMethod](`${alias}.${field} IS NULL`);
                    break;
                case '$isNotNull':  // Handle IS NOT NULL condition
                    qb[whereMethod](`${alias}.${field} IS NOT NULL`);
                    break;
                case '$like':  // Handle LIKE condition
                    qb[whereMethod](`${alias}.${field} LIKE :${field}`, { [field]: condition[operator] });
                    break;
                case '$notLike':  // Handle NOT LIKE condition
                    qb[whereMethod](`${alias}.${field} NOT LIKE :${field}`, { [field]: condition[operator] });
                    break;
                case '$ilike':  // Handle ILIKE (case-insensitive LIKE) condition
                    qb[whereMethod](`${alias}.${field} ILIKE :${field}`, { [field]: condition[operator] });
                    break;
                case '$notIlike':  // Handle NOT ILIKE (case-insensitive NOT LIKE) condition
                    qb[whereMethod](`${alias}.${field} NOT ILIKE :${field}`, { [field]: condition[operator] });
                    break;
                case '$startsWith':  // Handle starts with condition
                    qb[whereMethod](`${alias}.${field} LIKE :${field}`, { [field]: `${condition[operator]}%` });
                    break;
                case '$notStartsWith':  // Handle NOT starts with condition
                    qb[whereMethod](`${alias}.${field} NOT LIKE :${field}`, { [field]: `${condition[operator]}%` });
                    break;
                case '$endsWith':  // Handle ends with condition
                    qb[whereMethod](`${alias}.${field} LIKE :${field}`, { [field]: `%${condition[operator]}` });
                    break;
                case '$notEndsWith':  // Handle NOT ends with condition
                    qb[whereMethod](`${alias}.${field} NOT LIKE :${field}`, { [field]: `%${condition[operator]}` });
                    break;
                case '$regex':  // Handle case-sensitive regex matching
                    qb[whereMethod](`${alias}.${field} ~ :${field}`, { [field]: condition[operator] });
                    break;
                case '$notRegex':  // Handle case-sensitive NOT regex matching
                    qb[whereMethod](`${alias}.${field} !~ :${field}`, { [field]: condition[operator] });
                    break;
                case '$regexi':  // Handle case-insensitive regex matching
                    qb[whereMethod](`${alias}.${field} ~* :${field}`, { [field]: condition[operator] });
                    break;
                case '$notRegexi':  // Handle case-insensitive NOT regex matching
                    qb[whereMethod](`${alias}.${field} !~* :${field}`, { [field]: condition[operator] });
                    break;
                case '$equalTo':  // Handle equality condition
                    qb[whereMethod](`${alias}.${field} = :${field}`, { [field]: condition[operator] });
                    break;
                case '$notEqualTo':  // Handle not equal condition
                    qb[whereMethod](`${alias}.${field} != :${field}`, { [field]: condition[operator] });
                    break;
                default:
                    break;
            }
        });
    }
    // Handle direct equality condition
    else {
        qb[whereMethod](`${alias}.${field} = :${field}`, { [field]: condition });
    }
}

export default applyCondition;
