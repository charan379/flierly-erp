import { Between, Equal, FindOptionsWhere, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, ObjectLiteral, Raw } from 'typeorm';

/**
 * Applies a condition to a TypeORM FindOptionsWhere object.
 *
 * @param {FindOptionsWhere<T>} where - The FindOptionsWhere object to apply conditions to.
 * @param {string} field - The field name.
 * @param {any} condition - The condition value.
 * @returns {FindOptionsWhere<T>} - The updated where condition.
 */
function whereCondition<T extends ObjectLiteral>(where: FindOptionsWhere<T> | undefined, field: string, condition: any): FindOptionsWhere<T> {
  const conditionObject: any = {};

  if (typeof condition === 'object' && !Array.isArray(condition)) {
    // Handle special operators
    Object.keys(condition).forEach((operator) => {
      switch (operator) {
        case '$in': // Handle IN condition
          if (Array.isArray(condition[operator]) && condition[operator].length > 0) {
            conditionObject[field] = In(condition[operator]);
          }
          break;
        case '$notIn': // Handle NOT IN condition
          if (Array.isArray(condition[operator]) && condition[operator].length > 0) {
            conditionObject[field] = Not(In(condition[operator]));
          }
          break;
        case '$gte': // Handle greater than or equal to condition
          conditionObject[field] = MoreThanOrEqual(condition[operator]);
          break;
        case '$lte': // Handle less than or equal to condition
          conditionObject[field] = LessThanOrEqual(condition[operator]);
          break;
        case '$gt': // Handle greater than condition
          conditionObject[field] = MoreThan(condition[operator]);
          break;
        case '$lt': // Handle less than condition
          conditionObject[field] = LessThan(condition[operator]);
          break;
        case '$ne': // Handle not equal condition
          conditionObject[field] = Not(condition[operator]);
          break;
        case '$between': // Handle BETWEEN condition
          conditionObject[field] = Between(condition[operator][0], condition[operator][1]);
          break;
        case '$notBetween': // Handle NOT BETWEEN condition
          conditionObject[field] = Not(Between(condition[operator][0], condition[operator][1]));
          break;
        case '$isNull': // Handle IS NULL condition
          conditionObject[field] = IsNull(); // Set to null for IS NULL condition
          break;
        case '$isNotNull': // Handle IS NOT NULL condition
          conditionObject[field] = Not(IsNull());
          break;
        case '$like': // Handle LIKE condition
          conditionObject[field] = Like(condition[operator]);
          break;
        case '$notLike': // Handle NOT LIKE condition
          conditionObject[field] = Not(Like(condition[operator]));
          break;
        case '$ilike': // Handle ILIKE (case-insensitive LIKE) condition
          conditionObject[field] = ILike(condition[operator]);
          break;
        case '$notIlike': // Handle NOT ILIKE (case-insensitive NOT LIKE) condition
          conditionObject[field] = Not(ILike(condition[operator]));
          break;
        case '$startsWith': // Handle starts with condition
          conditionObject[field] = Like(`${condition[operator]}%`);
          break;
        case '$notStartsWith': // Handle NOT starts with condition
          conditionObject[field] = Not(Like(`${condition[operator]}%`));
          break;
        case '$endsWith': // Handle ends with condition
          conditionObject[field] = Like(`%${condition[operator]}`);
          break;
        case '$notEndsWith': // Handle NOT ends with condition
          conditionObject[field] = Not(Like(`%${condition[operator]}`));
          break;
        case '$regex': // Handle case-sensitive regex matching
          conditionObject[field] = Raw((alias) => `${alias} ~ :${field}`, { [field]: condition[operator] });
          break;
        case '$notRegex': // Handle case-sensitive NOT regex matching
          conditionObject[field] = Raw((alias) => `${alias}!~ :${field}`, { [field]: condition[operator] });
          break;
        case '$regexi': // Handle case-insensitive regex matching
          conditionObject[field] = Raw((alias) => `${alias} ~* :${field}`, { [field]: condition[operator] });
          break;
        case '$notRegexi': // Handle case-insensitive NOT regex matching
          conditionObject[field] = Raw((alias) => `${alias} !~* :${field}`, { [field]: condition[operator] });
          break;
        case '$equalTo': // Handle equality condition
          conditionObject[field] = Equal(condition[operator]);
          break;
        case '$notEqualTo': // Handle not equal condition
          conditionObject[field] = Not(Equal(condition[operator]));
          break;
        default:
          break;
      }
    });
  } else {
    // Handle direct equality condition
    conditionObject[field] = Equal(condition);
  }

  return { ...where, ...conditionObject }; // Combine existing where with new conditions
}

export default whereCondition;
