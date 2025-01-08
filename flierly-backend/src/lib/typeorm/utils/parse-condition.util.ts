import { Between, Equal, FindOperator, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Raw } from 'typeorm';
import { v4 as uuid } from 'uuid'

// Define the type for FindOperatorQB
export interface FindOperatorQB {
    query: string;
    parameters?: any;
}

// Centralized operator map
const operatorMap: Record<string, string> = {
    $in: 'IN',
    $notIn: 'NOT IN',
    $gte: '>=',
    $lte: '<=',
    $gt: '>',
    $lt: '<',
    $between: 'BETWEEN',
    $notBetween: 'NOT BETWEEN',
    $like: 'LIKE',
    $notLike: 'NOT LIKE',
    $ilike: 'ILIKE',
    $notIlike: 'NOT ILIKE',
    $startsWith: 'LIKE',
    $notStartsWith: 'NOT LIKE',
    $endsWith: 'LIKE',
    $notEndsWith: 'NOT LIKE',
    $regex: '~',
    $notRegex: '!~',
    $regexi: '~*',
    $notRegexi: '!~*',
    $equalTo: '=',
    $notEqualTo: '<>',
    $jsonContains: '@>',
    $jsonContained: '<@',
    $jsonEquals: '=',
    $jsonHasKey: '?',
};

// Function overloads for parseCondition

/**
 * Parses condition for TypeORM query builder ('qb') type. 
 * @param params - Object with parameters for the condition.
 * @param params.conditionFor - Specifies the type of condition ('qb').
 * @param params.fieldAlias - Optional alias for the field.
 * @param params.condition - The condition to apply in the query.
 * @returns {FindOperatorQB} - The parsed condition object for use in query builder.
 */
function parseCondition(params: { conditionFor: "qb", fieldAlias: string; condition: any; }): FindOperatorQB;

/**
 * Parses condition for TypeORM 'find' operator type.
 * @param params - Object with parameters for the condition.
 * @param params.conditionFor - Specifies the type of condition ('find').
 * @param params.condition - The condition to apply in the query.
 * @returns {FindOperator<any>} - The parsed condition object for use in find operation.
 */
function parseCondition(params: { conditionFor: "find", condition: any; fieldAlias: string; }): FindOperator<any>;

/**
 * Parses conditions into a TypeORM-compatible format.
 * Uses Raw for complex conditions and supports both 'qb' and 'find' types.
 * 
 * @param params - Object with the following properties:
 *   - `fieldAlias`: Optional alias for the field (used only for 'qb' conditions).
 *   - `condition`: The condition to apply in the query.
 *   - `conditionFor`: Specifies the type of condition, either 'qb' or 'find'.
 * @returns {any} - A parsed condition, either in the form of a `FindOperatorQB` or `FindOperator<any>`.
 * @throws Error if an unsupported `conditionFor` value is provided.
 */
function parseCondition({ fieldAlias: a, condition, conditionFor }: { fieldAlias: string; condition: any; conditionFor: "qb" | "find" }): any {

    if (conditionFor !== 'qb' && conditionFor !== 'find') {
        // Throw an error if an unsupported `conditionFor` value is passed
        throw new Error("Unsupported conditionFor value");
    }

    // Generate a unique prefix for parameter aliases
    const uniqueId = uuid().replace(/-/g, '_');

    // Basic validation: Check if alias is a non-empty string
    if ((typeof a !== 'string' || a.trim().length === 0) && conditionFor === 'qb') {
        throw new Error('Alias must be a non-empty string');
    }

    // Validate condition is not undefined or null
    if (condition === undefined || condition === null) {
        throw new Error('Condition cannot be undefined or null');
    }

    // If the condition is an object, then it must have exactly one key
    if (typeof condition === 'object' && !Array.isArray(condition)) {

        // Check if the condition object has exactly one key, if not throw an error
        // This is to ensure that the condition object is a valid condition
        // e.g. { $in: [1, 2, 3] }
        // if no keys are found, then the object is not a valid condition
        if (Object.keys(condition).length !== 1) {
            throw new Error('Condition object must have exactly one key');
        }

        // Get the key and value of the condition object
        const [conditionOperator, conditionValue] = Object.entries(condition)[0];

        // Check if the condition operator is a valid string
        if (typeof conditionOperator !== 'string') {
            throw new Error('Condition operator must be a string');
        }

        // Check if the condition value is valid for the given operator
        if (conditionValue === undefined || conditionValue === null) {
            throw new Error(`${conditionOperator} operator cannot have undefined or null value`);
        }

        // Get the parameter prefix for parameter aliases along opreator 
        const pp = `${uniqueId}_${conditionOperator.replace(/\$/, "")}`;

        // Check if the condition operator is a valid operator
        switch (conditionOperator) {
            // If the condition operator is a valid operator, then return the parsed condition object
            case '$in':
                // Check if the condition value is an array of strings or numbers or dates
                if (Array.isArray(conditionValue) && conditionValue.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)) {
                    return (conditionFor === "qb")
                        ?
                        // Return a FindOperatorQB object for the 'qb' condition
                        { query: `${a} IN (:...${pp}_${a})`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        :
                        // Return a Raw object for the 'find' condition
                        In(conditionValue);

                } else {
                    throw new Error(`${conditionOperator} operator must have an array of strings or numbers`);
                }
            case '$notIn':
                // Check if the condition value is an array of strings or numbers or dates
                if (Array.isArray(conditionValue) && conditionValue.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)) {
                    return (conditionFor === "qb")
                        ?
                        // Return a FindOperatorQB object for the 'qb' condition
                        { query: `${a} NOT IN (:...${pp}_${a})`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        :
                        // Return a Raw object for the 'find' condition
                        Not(In(conditionValue))
                } else {
                    throw new Error(`${conditionOperator} operator must have an array of strings or numbers`);
                }
            case '$gte':
                // Check if the condition value is a number, string, or Date
                if (['number', 'string'].includes(typeof conditionValue) || conditionValue instanceof Date) {
                    return (conditionFor === "qb")
                        ?
                        // Return a FindOperatorQB object for the 'qb' condition
                        { query: `${a} >= :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        :
                        // Return a Raw object for the 'find' condition
                        MoreThanOrEqual(conditionValue);
                } else {
                    throw new Error(`${conditionOperator} operator must have a number, string, or Date value`);
                }
            case '$lte':
                // Check if the condition value is a number, string, or Date
                if (['number', 'string'].includes(typeof conditionValue) || conditionValue instanceof Date) {
                    return (conditionFor === "qb")
                        ?
                        // Return a FindOperatorQB object for the 'qb' condition
                        { query: `${a} <= :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        :
                        // Return a Raw object for the 'find' condition
                        LessThanOrEqual(conditionValue);
                } else {
                    throw new Error(`${conditionOperator} operator must have a number, string, or Date value`);
                }
            case '$gt':
                // Check if the condition value is a number, string or Date
                if (['number', 'string'].includes(typeof conditionValue) || conditionValue instanceof Date) {
                    return (conditionFor === "qb")
                        ?
                        // Return a FindOperatorQB object for the 'qb' condition
                        { query: `${a} > :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        :
                        // Return a Raw object for the 'find' condition
                        MoreThan(conditionValue);
                } else {
                    throw new Error(`${conditionOperator} operator must have a number, string, or Date value`);
                }
            case '$lt':
                // Check if the condition value is a number, string or Date
                if (['number', 'string'].includes(typeof conditionValue) || conditionValue instanceof Date) {
                    return (conditionFor === "qb")
                        // Return a FindOperatorQB object for the 'qb' condition
                        ? { query: `${a} < :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        // Return a Raw object for the 'find' condition
                        : LessThan(conditionValue);
                } else {
                    throw new Error(`${conditionOperator} operator must have a number, string, or Date value`);
                }
            case '$between':
                // Check if the condition value is an array with two values, each being a string, number, or Date
                if (Array.isArray(conditionValue) && conditionValue.length === 2 && conditionValue.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)) {
                    return (conditionFor === "qb")
                        ? { query: `${a} BETWEEN :${pp}_${a}_start AND :${pp}_${a}_end`, parameters: { [`${pp}_${a}_start`]: conditionValue[0], [`${pp}_${a}_end`]: conditionValue[1] } }
                        : Between(conditionValue[0], conditionValue[1]);
                } else {
                    throw new Error(`${conditionOperator} operator must have an array with two values `);
                }
            case '$notBetween':
                // Check if the condition value is an array with two values, each being a string, number, or Date
                if (Array.isArray(conditionValue) && conditionValue.length === 2 && conditionValue.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)) {
                    return (conditionFor === "qb")
                        ? { query: `${a} NOT BETWEEN :${pp}_${a}_start AND :${pp}_${a}_end`, parameters: { [`${pp}_${a}_start`]: conditionValue[0], [`${pp}_${a}_end`]: conditionValue[1] } }
                        : Not(Between(conditionValue[0], conditionValue[1]));
                } else {
                    throw new Error(`${conditionOperator} operator must have an array with two values `);
                }
            case '$like':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}%` } }
                        : Like(`%${conditionValue}%`);
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notLike':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} NOT LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}%` } }
                        : Not(Like(`%${conditionValue}%`));
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$ilike':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} ILIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}%` } }
                        : ILike(`%${conditionValue}%`);
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notIlike':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} NOT ILIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}%` } }
                        : Not(ILike(`%${conditionValue}%`));
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$startsWith':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `${conditionValue}%` } }
                        : Like(`${conditionValue}%`);
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notStartsWith':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} NOT LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `${conditionValue}%` } }
                        : Not(Like(`${conditionValue}%`));
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$endsWith':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}` } }
                        : Like(`%${conditionValue}`);
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notEndsWith':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    return (conditionFor === "qb")
                        ? { query: `${a} NOT LIKE :${pp}_${a}`, parameters: { [`${pp}_${a}`]: `%${conditionValue}` } }
                        : Not(Like(`%${conditionValue}`));
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$equalTo':
                // Check if the condition value is a string, number, boolean, or Date
                if ((typeof conditionValue === 'string' || typeof conditionValue === 'number' || typeof conditionValue === 'boolean' || conditionValue instanceof Date)) {
                    return (conditionFor === "qb")
                        ? { query: `${a} = :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        : Equal(conditionValue);
                } else {
                    throw new Error(`${conditionOperator} operator must have a string, number, boolean, or Date value`);
                }
            case '$notEqualTo':
                // Check if the condition value is a string, number, boolean, or Date
                if ((typeof conditionValue === 'string' || typeof conditionValue === 'number' || typeof conditionValue === 'boolean' || conditionValue instanceof Date)) {
                    return (conditionFor === "qb")
                        ? { query: `${a} != :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } }
                        : Not(Equal(conditionValue));
                } else {
                    throw new Error(`${conditionOperator} operator must have a string, number, boolean, or Date value`);
                }
            case '$regex':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    if (conditionFor === "qb") {
                        // Return a FindOperatorQB object for the 'qb' condition
                        return { query: `${a} ~ :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } };
                    } else {
                        // Return a Raw object for the 'find' condition
                        return Raw((alias: string) => `${alias} ~ :${pp}_${a}`, { [`${pp}_${a}`]: conditionValue });
                    }
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notRegex':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    if (conditionFor === "qb") {
                        // Return a FindOperatorQB object for the 'qb' condition
                        return { query: `${a} !~ :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } };
                    } else {
                        // Return a Raw object for the 'find' condition
                        return Raw((alias: string) => `${alias} !~ :${pp}_${a}`, { [`${pp}_${a}`]: conditionValue });
                    }
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$regexi':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    if (conditionFor === "qb") {
                        // Return a FindOperatorQB object for the 'qb' condition
                        return { query: `${a} ~* :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } };
                    } else {
                        // Return a Raw object for the 'find' condition
                        return Raw((alias: string) => `${alias} ~* :${pp}_${a}`, { [`${pp}_${a}`]: conditionValue });
                    }
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$notRegexi':
                // Check if the condition value is a string
                if (typeof conditionValue === 'string') {
                    if (conditionFor === "qb") {
                        // Return a FindOperatorQB object for the 'qb' condition
                        return { query: `${a} !~* :${pp}_${a}`, parameters: { [`${pp}_${a}`]: conditionValue } };
                    } else {
                        // Return a Raw object for the 'find' condition
                        return Raw((alias: string) => `${alias} !~* :${pp}_${a}`, { [`${pp}_${a}`]: conditionValue });
                    }
                } else {
                    throw new Error(`${conditionOperator} operator must have a string value`);
                }
            case '$jsonContains':
                if (conditionFor === "qb") {
                    // Return a FindOperatorQB object for the 'qb' condition
                    return { query: `${a} @> :${pp}_${a}`, parameters: { [`${pp}_${a}`]: JSON.stringify(conditionValue) } };
                } else {
                    // Return a Raw object for the 'find' condition
                    return Raw((alias: string) => `${alias} @> :${pp}_${a}`, { [`${pp}_${a}`]: JSON.stringify(conditionValue) });
                }
            case '$jsonContained':
                if (conditionFor === "qb") {
                    // Return a FindOperatorQB object for the 'qb' condition
                    return { query: `${a} <@ :${pp}_${a}`, parameters: { [`${pp}_${a}`]: JSON.stringify(conditionValue) } };
                } else {
                    // Return a Raw object for the 'find' condition
                    return Raw((alias: string) => `${alias} <@ :${pp}_${a}`, { [`${pp}_${a}`]: JSON.stringify(conditionValue) });
                }
            case '$jsonEquals':
                if (conditionFor === "qb") {
                    // Return a FindOperatorQB object for the 'qb' condition
                    return { query: `${a} = :${pp}_${a}`, parameters: { [`${pp}_${a}`]: JSON.stringify(conditionValue) } };
                } else {
                    // Return a Raw object for the 'find' condition
                    return Raw((alias: string) => `${alias} = :${pp}_${a}`, { [`${pp}_${a}`]: JSON.stringify(conditionValue) });
                }
            case '$jsonHasKey':
                if (conditionFor === "qb") {
                    // Return a FindOperatorQB object for the 'qb' condition
                    return { query: `${a} ? :${pp}_${a}_key`, parameters: { [`${pp}_${a}_key`]: conditionValue } };
                } else {
                    // Return a Raw object for the 'find' condition
                    return Raw((alias: string) => `${alias} ? :${pp}_${a}_key`, { [`${pp}_${a}_key`]: conditionValue });
                }
            default:
                // If the condition operator is not a valid operator, then throw an error
                throw new Error(`Unsupported operator: ${conditionOperator}`);
        }
    }
    // If the condition is an array, then return the parsed condition object
    else if (Array.isArray(condition) && condition.every(item => typeof item === 'string' || typeof item === 'number' || item instanceof Date)) {
        return (conditionFor === "qb")
            ?
            // Return a FindOperatorQB object for the 'qb' condition
            { query: `${a} IN (:...${uniqueId}_in_${a})`, parameters: { [`${uniqueId}_in_${a}`]: condition } }
            :
            // Return a Raw object for the 'find' condition
            In(condition);
    }
    else if (condition === "$isNull") {
        return (conditionFor === "qb")
            ?
            // Return a FindOperatorQB object for the 'qb' condition
            { query: `${a} IS NULL` }
            :
            // Return a Raw object for the 'find' condition
            IsNull();
    }
    else if (condition === "$isNotNull") {
        return (conditionFor === "qb")
            ?
            // Return a FindOperatorQB object for the 'qb' condition
            { query: `${a} IS NOT NULL` }
            :
            // Return a Raw object for the 'find' condition
            Not(IsNull());
    }
    // If the condition is null, undefined, string, number, boolean, or Date, then return the parsed condition object
    else if (typeof condition === 'string' || typeof condition === 'number' || typeof condition === 'boolean' || condition instanceof Date) {
        return (conditionFor === "qb")
            ?
            // Return a FindOperatorQB object for the 'qb' condition
            { query: `${a} = :${uniqueId}_eq_${a}`, parameters: { [`${uniqueId}_eq_${a}`]: condition } }
            :
            // Return a Raw object for the 'find' condition
            Equal(condition);
    }
    // If the condition is not a valid condition, then throw an error
    else {
        throw new Error(`Invalid condition, must be an object, array, string, number, boolean, or Date`);
    }
}
export default parseCondition;
