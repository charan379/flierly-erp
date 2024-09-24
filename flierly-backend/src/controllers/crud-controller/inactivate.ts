import HttpCodes from "@/constants/httpCodes";
import { idArraySchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";

const inactivate = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const validatedIds: number[] = await JoiSchemaValidator(idArraySchema, req.body, {}, "dynamic-deactivate");

    const repo = AppDataSource.getRepository(entity);

    const result = await repo.createQueryBuilder()
        .update()
        .set({ isActive: false })
        .where("id IN (:...ids)", { ids: validatedIds }).execute();

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: `${result.affected} ${repo.metadata.name}'s inactivated successfully.`,
        controller: 'CRUD.InactivateController',
        httpCode: HttpCodes.OK,
        error: null,
        req, res
    }));
}

export default inactivate;