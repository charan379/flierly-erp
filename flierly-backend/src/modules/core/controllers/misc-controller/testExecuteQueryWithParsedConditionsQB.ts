import parseCondition from '@/lib/database/typeorm/utils/parse-condition.util';
import { AppDataSource } from '@/lib/database/typeorm/app-datasource';
import { Request, Response } from 'express';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { Brackets, ObjectLiteral, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import applyWhereConditionsQB from '@/lib/database/typeorm/utils/qb-appy-where-conditions.util';

/**
 * Executes a query with parsed filter conditions using the query builder.
 *
 * @param req - The Express request object containing filter conditions in the body.
 * @param res - The Express response object to send the response.
 */
const executeQueryWithParsedConditions = async (req: Request, res: Response): Promise<Response> => {
    const { filters, page, limit } = req.body;
    let relations: string[] = req.query?.relations?.toString().split(',') ?? [];

    console.log(relations);

    const repository = AppDataSource.getRepository('Product');
    const queryBuilder = repository.createQueryBuilder('product');

    queryBuilder.withDeleted();

    for (let relation of relations) {
        queryBuilder.leftJoinAndSelect(`product.${relation}`, relation);
    };

    // Track invalid conditions with error messages
    const invalidConditions = new Map<string, string>();

    // processConditions(queryBuilder, 'andWhere', filterConditions, 'product');

    applyWhereConditionsQB(queryBuilder, 'andWhere', filters, 'product')
    try {
        // Execute the query and get results
        const results = await queryBuilder.getMany();
        const sql = queryBuilder.getSql();

        // Build and send the response
        return res.status(200).json(
            apiResponseBuilder({
                controller: "misc.testExecuteQueryWithParsedConditionsQB",
                error: null,
                httpCode: 200,
                message: "Data fetched successfully",
                req,
                res,
                success: true,
                result: {
                    results,
                    sql,
                    invalidConditions: Object.fromEntries(invalidConditions),
                    parameters: queryBuilder.getParameters(),
                },
            })
        );
    } catch (error) {
        // Handle any errors during query execution
        console.error("Error executing query:", error);
        return res.status(500).json(
            apiResponseBuilder({
                controller: "misc.testExecuteQueryWithParsedConditionsQB",
                error: `${(error as Error).message}`,
                httpCode: 500,
                message: "Error fetching data",
                req,
                res,
                success: false,
                result: JSON.stringify({ invalidConditions: Object.fromEntries(invalidConditions), error: JSON.stringify(error), sql: queryBuilder.getSql(), parameters: queryBuilder.getParameters() }),
            })
        );
    }
};

export default executeQueryWithParsedConditions;
