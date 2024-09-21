import HttpCodes from "@/constants/httpCodes";
import { idArraySchema } from "@/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";

const testTypeORMActivate = async (req: Request, res: Response): Promise<Response> => {

    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, "dynamic-activate");

    const repo = AppDataSource.getRepository('Role');

    const result = await repo.createQueryBuilder()
        .update()
        .set({ isActive: true })
        .where("id IN (:...ids)", { ids: validatedIds }).execute();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: 'Activated successfully',
        controller: 'misc.ActivateRoleController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default testTypeORMActivate;