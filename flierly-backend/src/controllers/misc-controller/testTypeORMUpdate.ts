import HttpCodes from "@/constants/httpCodes";
import { idSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";

const testTypeORMUpdate = async (req: Request, res: Response): Promise<Response> => {

    const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, "misc-controller-get-testTypeORMUpdate");

    const update = await JoiSchemaValidator<object>(Joi.object().required(), req.body, { abortEarly: false, allowUnknown: false }, "misc-controller-get-testTypeORMUpdate");

    const result = await AppDataSource.transaction(async (entityManager) => {

        const repo = entityManager.getRepository("Role");

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
        controller: 'misc.UpdateRoleController',
        httpCode: HttpCodes.CREATED,
        error: null,
        req, res
    }));
}

export default testTypeORMUpdate;