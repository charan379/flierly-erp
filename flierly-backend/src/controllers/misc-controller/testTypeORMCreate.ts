import HttpCodes from "@/constants/httpCodes";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api-response.generator";
import { validate } from "class-validator";
import { Request, Response } from "express";

const testTypeORMCreate = async (req: Request, res: Response): Promise<Response> => {

    const roleData = req.body;

    // Get the repository for the Role entity
    const repo = AppDataSource.getRepository("Role");

    // Create a new Role instance
    const newRole = repo.create(roleData);

    const errors = await validate(newRole);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    };

    // Save the new Role to the database
    const savedRole = await repo.save(newRole);

    // Respond with the created Privilege
    return res.status(HttpCodes.CREATED).json(
        apiResponse(
            true,
            savedRole,
            "Role created successfully",
            "misc.createRole",
            req.url,
            null,
            HttpCodes.CREATED,
            req,
            res
        )
    );

    };

export default testTypeORMCreate;
