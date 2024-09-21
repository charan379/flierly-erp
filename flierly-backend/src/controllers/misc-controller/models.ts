import HttpCodes from "@/constants/httpCodes";
import { getModelsList } from "@/models";
import apiResponse from "@/utils/api-response.generator";
import filterAndLimit from "@/utils/filter-and-limit-arary-of-objects.util";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { Request, Response } from "express";
import Joi from "joi";


const modelsQuerySchema: Joi.ObjectSchema = Joi.object({
    keyword: Joi.string().allow("").default(""),
    limit: Joi.number().default(50),
})

const models = async (req: Request, res: Response): Promise<Response> => {

    const { keyword, limit } = await JoiSchemaValidator<{ keyword: string, limit: number }>(modelsQuerySchema, req.query, { abortEarly: false, allowUnknown: false }, "misc-controller-get-models");

    const matcher = new RegExp(String(keyword.trim()), "ig");

    let models: ModelDetails[] = await getModelsList();

    models = filterAndLimit<ModelDetails>({
        data: models,
        limit,
        matcher,
        queryKey: "entity"
    });

    models.forEach(model => model.filePath = '[REDACTED]')

    return res.status(HttpCodes.OK).json(
        apiResponse(
            true,
            models,
            "Models fetched successfully",
            "misc.models",
            req.url,
            null,
            HttpCodes.OK, req, res
        ));
}

export default models;