import parseCondition from '@/lib/typeorm/utils/parse-condition.util';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { Request, Response } from 'express';
import apiResponseBuilder from '@/utils/builders/api-response.builder';

/**
 * Executes a query with parsed filter conditions using the query builder.
 *
 * @param req - The Express request object containing filter conditions in the body.
 * @param res - The Express response object to send the response.
 */
const executeQueryWithParsedConditions = async (req: Request, res: Response): Promise<Response> => {
    const filterConditions: { [key: string]: any } = req.body;

    const repository = AppDataSource.getRepository('Privilege');
    const queryBuilder = repository.createQueryBuilder('privilege');

    // Track invalid conditions with error messages
    const invalidConditions = new Map<string, string>();

    for (const field in filterConditions) {
        if (Object.prototype.hasOwnProperty.call(filterConditions, field)) {
            const condition = filterConditions[field];
            try {
                // Parse the condition and add it to the query
                const pc = parseCondition({ conditionFor: 'qb', fieldAlias: `privilege.${field}`, condition });

                if ('query' in pc) {
                    const { query: whereQuery, parameters } = pc
                    queryBuilder.andWhere(whereQuery, parameters);
                }

            } catch (error) {
                console.error(`Error parsing condition for field "${field}":`, error);
                invalidConditions.set(field, `${(error as Error).message}`);
            }
        }
    }
    queryBuilder.withDeleted();
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
