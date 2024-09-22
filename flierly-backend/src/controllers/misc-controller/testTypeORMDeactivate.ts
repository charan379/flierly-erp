import HttpCodes from "@/constants/httpCodes";
import { idArraySchema } from "@/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";

const testTypeORMDeactivate = async (req: Request, res: Response): Promise<Response> => {

    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, "dynamic-deactivate");

    const repo = AppDataSource.getRepository('Role');

    const result = await repo.createQueryBuilder()
        .update()
        .set({ isActive: false })
        .where("id IN (:...ids)", { ids: validatedIds }).execute();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: 'Deactivated successfully',
        controller: 'misc.DeactivateRoleController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default testTypeORMDeactivate;