import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import generateJoiSchemaFromTypeORM from "@/utils/joiObjectValidator/generators/generateJoiSchemaFromTypeORM";
import JoiSchemaValidator from "@/utils/joiObjectValidator/joiSchemaValidator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ObjectLiteral } from "typeorm";

const testTypeORMCreate = async (req: Request, res: Response): Promise<Response> => {

    // Get the repository for the Role entity
    const repo = AppDataSource.getRepository("Role");

    const schemaVal = repo.metadata.columns.reduce((acc: Record<string, any>, column) => {
        acc[column.propertyName] = column.type;
        return acc;
    }, {});

    const validatedRole: ObjectLiteral = await JoiSchemaValidator(generateJoiSchemaFromTypeORM(schemaVal), req.body, { abortEarly: false }, "dynamic create");

    // Create a new Role instance
    const newRole = repo.create(validatedRole);

    const errors = await validate(newRole);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    };

    // Save the new Role to the database
    const savedRole = await repo.save(newRole);

    // Respond with the created Privilege
    return res.status(HttpCodes.CREATED).json(
        apiResponse({
            success: true,
            result: savedRole,
            message: 'Role created successfully',
            controller: 'misc.CreateRoleController',
            httpCode: HttpCodes.CREATED,
            error: null,
            req, res
        })
    );
};

export default testTypeORMCreate;
