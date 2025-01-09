import parseCondition from '@/lib/typeorm/utils/parse-condition.util';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { Request, Response } from 'express';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { FindManyOptions, ObjectLiteral } from 'typeorm';
import whereCondition from '@/lib/typeorm/utils/where-condintion.util';

/**
 * Executes a query with parsed filter conditions using the find function.
 *
 * @param req - The Express request object containing filter conditions in the body.
 * @param res - The Express response object to send the response.
 */
const executeQueryWithParsedConditionsWithFind = async (req: Request, res: Response): Promise<Response> => {
    const filterConditions: { [key: string]: any } = req.body;

    const repository = AppDataSource.getRepository('Privilege');

    // Initialize FindManyOptions
    const findOptions: FindManyOptions<ObjectLiteral> = {
        relations: [], // Load relations if required
        relationLoadStrategy: 'join',
        where: {}, // Initialize where clause
        withDeleted: true, // Include soft-deleted records
    };

    // Track invalid conditions with error messages
    const invalidConditions = new Map<string, string>();

    const processConditions = (conditions: any, where: any) => {
        for (const field in conditions) {
            if (Object.prototype.hasOwnProperty.call(conditions, field)) {
                const condition = conditions[field];
                try {
                    if (field === '$and' || field === '$or') {
                        const nestedConditions = condition.map((nestedCondition: any) => processConditions(nestedCondition, {}));
                        where[field === '$and' ? '$and' : '$or'] = nestedConditions;
                    } else {
                        where[field] = parseCondition({ conditionFor: "find", condition, fieldAlias: field });
                    }
                } catch (error) {
                    console.error(`Error parsing condition for field "${field}":`, error);
                    invalidConditions.set(field, `${(error as Error).message}`);
                }
            }
        }
    };

    processConditions(filterConditions, findOptions.where);

    try {
        // Get the paginated and filtered rows
        const results = await repository.find(findOptions);

        // Build and send the response
        return res.status(200).json(
            apiResponseBuilder({
                controller: "misc.executeQueryWithParsedConditionsWithFind",
                error: null,
                httpCode: 200,
                message: "Data fetched successfully",
                req,
                res,
                success: true,
                result: {
                    results,
                    invalidConditions: Object.fromEntries(invalidConditions),
                },
            })
        );
    } catch (error) {
        // Handle any errors during query execution
        console.error("Error executing query:", error);
        return res.status(500).json(
            apiResponseBuilder({
                controller: "misc.executeQueryWithParsedConditionsWithFind",
                error: `${(error as Error).message}`,
                httpCode: 500,
                message: "Error fetching data",
                req,
                res,
                success: false,
                result: JSON.stringify({
                    invalidConditions: Object.fromEntries(invalidConditions),
                    error: JSON.stringify(error),
                }),
            })
        );
    }
};

export default executeQueryWithParsedConditionsWithFind;
