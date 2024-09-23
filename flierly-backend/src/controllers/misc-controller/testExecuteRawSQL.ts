import HttpCodes from "@/constants/httpCodes";
import { Privilege } from "@/entities/iam/Privilege.entity";
import { idSchema } from "@/joi-schemas/common.joi.schemas";
import executeQueryFromFile from "@/lib/queries/queryExecutor";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";

const testExecuteRawSQL = async (req: Request, res: Response): Promise<Response> => {

    const id = await JoiSchemaValidator<number>(idSchema, req.params.id, { abortEarly: false, allowUnknown: false }, "misc-controller-get-testExecuteRawSQL");

    console.time("testExecuteRawSQL");
    const result: Privilege[] = await executeQueryFromFile<Privilege[]>("./iam/userPrivileges.sql", [id]);
    console.timeEnd('testExecuteRawSQL')
    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result,
        message: 'Data fetched successfully',
        controller: 'misc.CreateRoleController',
        httpCode: HttpCodes.CREATED,
        error: null,
        req, res
    }));
}

export default testExecuteRawSQL;