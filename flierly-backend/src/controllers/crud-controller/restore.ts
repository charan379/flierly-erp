import HttpCodes from "@/constants/httpCodes";
import { idArraySchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";

const restore = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, "dynamic-restore");

    const repo = AppDataSource.getRepository(entity);

    const result = await repo.createQueryBuilder()
        .restore()
        .where("id IN (:...ids)", { ids: validatedIds }).execute();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: `${result.affected} ${repo.metadata.name}'s restored successfully.`,
        controller: 'misc.RestoreRoleController',
        httpCode: HttpCodes.CREATED,
        error: null,
        req, res
    }));
}

export default restore;