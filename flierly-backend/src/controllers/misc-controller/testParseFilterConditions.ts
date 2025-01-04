import HttpCodes from "@/constants/http-codes.enum";
import parseCondition from "@/lib/typeorm/utils/parse-condition.util";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import { Request, Response } from "express";

const testParseFilterConditions = async (req: Request, res: Response): Promise<Response> => {
    const filterConditions: { [key: string]: any } = req.body;

    const validConditions = new Map<string, any>();
    const invalidConditions = new Map<string, string>();

    for (const field in filterConditions) {
        if (Object.prototype.hasOwnProperty.call(filterConditions, field)) {
            const condition = filterConditions[field];
            try {
                const parsedCondition = parseCondition({ fieldAlias: `entity.${field}`, condition, conditionFor: "qb" });
                validConditions.set(field, parsedCondition);
            } catch (error) {
                invalidConditions.set(field, (error as Error).message);
            }
        }
    }

    const result = {
        validConditions: Object.fromEntries(validConditions),
        invalidConditions: Object.fromEntries(invalidConditions)
    };

    return res.status(HttpCodes.OK).json(
        apiResponseBuilder({
            controller: "misc.testParseFilterConditions",
            error: null,
            httpCode: HttpCodes.OK,
            message: "Data fetched successfully",
            req,
            res,
            success: true,
            result // Convert map to JSON-friendly format
        })
    );
};

export default testParseFilterConditions;
