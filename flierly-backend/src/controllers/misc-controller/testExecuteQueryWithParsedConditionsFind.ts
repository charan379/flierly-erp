import parseCondition from '@/lib/typeorm/utils/parse-condition.util';
import { AppDataSource } from '@/lib/typeorm/app-datasource';
import { Request, Response } from 'express';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import { FindManyOptions, FindOperator, ObjectLiteral, Raw } from 'typeorm';
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

    // const genWhere = (condition: any): FindOperator<any> => {
    // let parameters: ObjectLiteral = {};
    // return Raw((alias: string) => {
    //     // console.log({ alias, condition });
    //     const { query, parameters: parsedParameters } = parseCondition({ fieldAlias: alias, condition });
    //     parameters = { ...parameters, ...parsedParameters };
    //     // console.log(parameters)
    //     return query;
    // }, { ...parameters });

    // return Raw((alias: string) => parseCondition({ fieldAlias: alias, condition }).query, {});
    // };

    for (const field in filterConditions) {
        if (Object.prototype.hasOwnProperty.call(filterConditions, field)) {
            const condition = filterConditions[field];
            try {
                // Parse the condition and add it to the query
                const w = whereCondition(findOptions.where, field, filterConditions[field]);
                // const f = genWhere(filterConditions[field]);
                // console.log({ field, w, f });
                // findOptions.where = { ...findOptions.where, ...whereCondition(findOptions.where, field, filterConditions[field]) };
                findOptions.where = { ...findOptions.where, [field]: parseCondition({ conditionFor: "find", condition, fieldAlias: field }) }
            } catch (error) {
                console.error(`Error parsing condition for field "${field}":`, error);
                invalidConditions.set(field, `${(error as Error).message}`);
            }
        }
    }

    // Get the paginated and filtered rows
    const results = await repository.find(findOptions);

    try {
        // Execute the query and get results

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
