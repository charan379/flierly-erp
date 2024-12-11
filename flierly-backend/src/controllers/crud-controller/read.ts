import HttpCodes from "@/constants/httpCodes";
import { idSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import FlierlyException from "@/lib/flierly.exception";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";
import Joi from "joi";

interface ReadRequestBody {
    loadRelations: string[];
    id: number;
}

const readQuerySchema: Joi.ObjectSchema<ReadRequestBody> = Joi.object({
    loadRelations: Joi.array().items(Joi.string().disallow('').disallow(null)).unique(),
    id: idSchema
});

const read = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const { id, loadRelations } = await JoiSchemaValidator<ReadRequestBody>(readQuerySchema, req.body, { abortEarly: false, allowUnknown: false }, "dynamic-read");

    const repo = AppDataSource.getRepository(entity);

    const data = await repo.findOne({ where: { id: id }, relations: loadRelations?.length > 0 ? loadRelations : loadRelations });

    if (data === null) throw new FlierlyException(`No rows found with given id: ${id}`, HttpCodes.BAD_REQUEST, '', '');

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: data,
        message: 'Data fetched successfully',
        controller: 'CRUD.READController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default read;