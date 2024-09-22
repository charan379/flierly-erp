import HttpCodes from "@/constants/httpCodes";
import { idArraySchema } from "@/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";

const testTypeORMDelete = async (req: Request, res: Response): Promise<Response> => {

    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, "dynamic-delete");

    const result = await AppDataSource.transaction(async (entityManager) => {

        const repo = entityManager.getRepository("Role");

        const updateResult = await repo.createQueryBuilder()
            .update()
            .set({
                deletedAt: new Date(), // Set the deletion timestamp
                isActive: false           // Set active to false
            })
            .where("id IN (:...ids)", { ids: validatedIds }) // Specify which IDs to update
            .execute();

        return updateResult; // Return the result of the update operation
    });

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: 'Deleted successfully',
        controller: 'misc.DeleteRoleController',
        httpCode: HttpCodes.CREATED,
        error: null,
        req, res
    }));
}

export default testTypeORMDelete;