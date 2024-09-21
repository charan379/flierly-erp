import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import handleFilter from "@/utils/handleFilter";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";

const searchQuerySchema: Joi.ObjectSchema = Joi.object({
    filter: Joi.object().required(),
    limit: Joi.number().default(50),
})

const testTypeORMSearch = async (req: Request, res: Response): Promise<Response> => {

    const { filter, limit } = await JoiSchemaValidator<{ filter: object, limit: number }>(searchQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "misc-controller-post-testTypeORMSearch");

    const repo = AppDataSource.getRepository('Role');

    // Create query builder for the entity
    const queryBuilder = repo.createQueryBuilder('role');

    // Apply filters to the query builder
    handleFilter(queryBuilder, 'role', filter);

    // Apply pagination (skip and take for offset and limit)
    queryBuilder.take(limit);

    // Get the paginated and filtered users
    const results = await queryBuilder.getMany();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: results,
        controller: "misc.testTypeORMSearch",
        message: "testTypeORMSearch fetched successfully",
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));

}

export default testTypeORMSearch;