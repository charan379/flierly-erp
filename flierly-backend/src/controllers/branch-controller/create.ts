import HttpCodes from "@/constants/httpCodes";
import { createBranchSchema } from "@/joi-schemas/branch.joi.schema";
import BranchModel from "@/models/branch.model";
import { Branch } from "@/models/interfaces/branch.interface";
import apiResponse from "@/utils/api-response.generator";
import JoiSchemaValidator from "@/utils/joi-schema.validator";
import { Request, Response } from "express";



const create = async (req: Request, res: Response) => {
    const branch: Branch = await JoiSchemaValidator<Branch>(createBranchSchema, req.body, { abortEarly: false, allowUnknown: false }, "create-branch-custom-controller");

    const result = await BranchModel.create({ ...branch });

    res.status(HttpCodes.CREATED).json(
        apiResponse(
            true,
            result,
            "Branch Created Successfully",
            "branch.create",
            req.url,
            null,
            HttpCodes.OK, req, res)
    );

}

export default create;