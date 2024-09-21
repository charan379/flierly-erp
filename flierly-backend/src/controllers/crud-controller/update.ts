import HttpCodes from "@/constants/httpCodes";
import { idSchema } from "@/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";
import { EntityTarget, ObjectLiteral } from "typeorm";

const update = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, "dynamic-update");

    const update = await JoiSchemaValidator<object>(Joi.object().required(), req.body, { abortEarly: false, allowUnknown: false }, "dynamic-update");

    const result = await AppDataSource.transaction(async (entityManager) => {

        const repo = entityManager.getRepository(entity);

        const updateResult = await repo.createQueryBuilder()
            .update()
            .set({ ...update })
            .where("id = :id", { id: id }) // Specify which IDs to update
            .execute();

        return updateResult; // Return the result of the update operation
    });

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: 'Updated successfully',
        controller: 'CRUD.UpdateController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default update;