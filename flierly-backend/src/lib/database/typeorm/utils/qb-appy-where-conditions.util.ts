import { Brackets, WhereExpressionBuilder } from "typeorm";
import parseCondition from "./parse-condition.util";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import iocContainer from "@/lib/di-ioc-container";
import LoggerService from "@/modules/core/services/logger-service/LoggerService";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

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
    // get logger service instance from ioc container
    const logger = iocContainer.get<LoggerService>(BeanTypes.LoggerService);
    const loggerMeta = { service: "ApplyWhereConditionQB" };
    for (const field in conditions) {
        if (Object.prototype.hasOwnProperty.call(conditions, field)) {
            const condition = conditions[field];

            try {
                if (field === '$and' || field === '$or') {
                    qb[whereMethod](
                        new Brackets((nestedQb) => {
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
                    // Handle related entity fields dynamically
                    let fieldAlias = `${alias}.${field}`;
                    if (field.includes('.')) {
                        const [relation, relatedField] = field.split('.');
                        fieldAlias = `${relation}.${relatedField}`;
                    }

                    const { query, parameters } = parseCondition({
                        conditionFor: 'qb',
                        fieldAlias, // Dynamically handle nested aliases
                        condition,
                    });

                    qb[whereMethod](query, parameters);
                }
            } catch (error) {
                logger.debug(`Error parsing condition for field "${field}": ${(error as Error).message}`, { ...loggerMeta, error: JSON.stringify(error) });
                throw new FlierlyException(
                    `Error parsing condition for field "${field}": ${(error as Error).message}`,
                    HttpCodes.BAD_REQUEST,
                    JSON.stringify(error)
                );
            }
        }
    }
};

export default applyWhereConditionsQB;