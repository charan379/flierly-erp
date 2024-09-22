import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import generateJoiSchemaFromTypeORM from "@/utils/joi-object-validator/generators/generateJoiSchemaFromTypeORM";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";

const create = async (entity: EntityTarget<ObjectLiteral>, req: Request, res: Response): Promise<Response> => {

    const repo = AppDataSource.getRepository(entity);

    const schemaVal = repo.metadata.columns.reduce((acc: Record<string, any>, column) => {
        acc[column.propertyName] = column.type;
        return acc;
    }, {});

    const validatedRow: ObjectLiteral = await JoiSchemaValidator(generateJoiSchemaFromTypeORM(schemaVal), req.body, { abortEarly: false }, "dynamic-create");

    const newRow = repo.create(validatedRow);

    const errors = await validate(newRow);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    };

    // Save the new row to the database
    const savedRole = await repo.save(newRow);

    // Respond with the created row
    return res.status(HttpCodes.CREATED).json(
        apiResponse({
            success: true,
            result: savedRole,
            message: 'Row created successfully',
            controller: 'CRUD.CreateController',
            httpCode: HttpCodes.CREATED,
            error: null,
            req, res
        })
    );
};

export default create;
