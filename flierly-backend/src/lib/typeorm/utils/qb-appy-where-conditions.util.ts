import { Brackets, WhereExpressionBuilder } from "typeorm";
import parseCondition from "./parse-condition.util";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";

/**
 * Recursively applies filter conditions to a QueryBuilder's `where` clause.
 *
 * This utility function dynamically processes a given set of filter conditions and applies them
 * to the QueryBuilder instance. It supports `$and` and `$or` logical operators for nested conditions
 * and utilizes `parseCondition` for processing atomic conditions.
 *
 * @param qb - The TypeORM QueryBuilder's `WhereExpressionBuilder` instance to which conditions will be applied.
 * @param whereMethod - The method to use for combining conditions (`andWhere` or `orWhere`).
 * @param conditions - The filter conditions to apply. Supports logical operators (`$and`, `$or`) and field conditions.
 * @param alias - The table alias to be prefixed to the field names in the query.
 *
 * @throws FlierlyException - Throws an exception if there's an error parsing a condition.
 *
 * Example usage:
 * ```typescript
 * const qb = repository.createQueryBuilder('entity');
 * applyWhereConditionsQb(qb, 'andWhere', { name: 'John', $or: [{ age: 30 }, { age: 40 }] }, 'entity');
 * ```
 */
const applyWhereConditionsQB = (
    qb: WhereExpressionBuilder,
    whereMethod: 'andWhere' | 'orWhere',
    conditions: any,
    alias: string
) => {
    // Iterate over the conditions provided in the input object
    for (const field in conditions) {
        if (Object.prototype.hasOwnProperty.call(conditions, field)) {
            const condition = conditions[field]; // Extract the condition for the current field

            try {
                // Check for logical operators ($and, $or)
                if (field === '$and' || field === '$or') {
                    // Create a new nested condition using Brackets
                    qb[whereMethod](
                        new Brackets((nestedQb) => {
                            // Recursively process each nested condition
                            condition.forEach((nestedCondition: any) => {
                                applyWhereConditionsQB(
                                    nestedQb,
                                    field === '$and' ? 'andWhere' : 'orWhere',
                                    nestedCondition,
                                    alias
                                );
                            });
                        })
                    );
                } else {
                    // Handle atomic field conditions using `parseCondition`
                    const { query, parameters } = parseCondition({
                        conditionFor: 'qb',          // Specify that this condition is for QueryBuilder
                        fieldAlias: `${alias}.${field}`, // Add alias to the field name
                        condition                    // The actual condition to parse
                    });

                    // Apply the parsed condition to the QueryBuilder
                    qb[whereMethod](query, parameters);
                }
            } catch (error) {
                // Log and throw a custom exception if an error occurs during parsing
                console.error(`Error parsing condition for field "${field}":`, error);

                throw new FlierlyException(
                    `${field}, ${(error as Error).message}`, // User-friendly error message
                    HttpCodes.BAD_REQUEST,                 // HTTP status code for bad requests
                    `Error parsing condition for field "${field}": ${(error as Error).message}`, // Detailed log message
                    JSON.stringify(error)                  // Serialized error details
                );
            }
        }
    }
};

export default applyWhereConditionsQB;
