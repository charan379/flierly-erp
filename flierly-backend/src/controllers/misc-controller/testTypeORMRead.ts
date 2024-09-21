import HttpCodes from "@/constants/httpCodes";
import { idSchema } from "@/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import FlierlyException from "@/lib/flierly.exception";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";

const testTypeORMRead = async (req: Request, res: Response): Promise<Response> => {

    const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, "misc-controller-get-testTypeORMCreate");

    const repo = AppDataSource.getRepository('Privilege');

    const data = await repo.findOneBy({ id });

    if (data === null) throw new FlierlyException(`No documents found with given id: ${id}`, HttpCodes.BAD_REQUEST, '', '');

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: data,
        message: 'Data fetched successfully',
        controller: 'misc.CreateRoleController',
        httpCode: HttpCodes.CREATED,
        error: null,
        req, res
    }));
}

export default testTypeORMRead;