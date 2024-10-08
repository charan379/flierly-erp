import HttpCodes from "@/constants/httpCodes";
import { idSchema } from "@/utils/joi-object-validator/joi-schemas/common.joi.schemas";
import { AppDataSource } from "@/lib/app-data-source";
import apiResponse from "@/utils/api/responseGenerator";
import JoiSchemaValidator from "@/utils/joi-object-validator/joiSchemaValidator";
import { Request, Response } from "express";
import FlierlyException from "@/lib/flierly.exception";
import { Account } from "@/entities/account/Account.entity";
import { Address } from "@/entities/address/Address.entity"; // Import Address entity
import Joi from "joi";

// Validate and return the account ID
const validateAccountId = async (id: string): Promise<number> => {
    return await JoiSchemaValidator<number>(idSchema, id, { abortEarly: false, allowUnknown: false }, "account-update");
};

// Validate and return the update payload
const validateUpdatePayload = async (payload: any): Promise<any> => {
    return await JoiSchemaValidator<object>(Joi.object().required(), payload, { abortEarly: false, allowUnknown: false }, "account-update");
};

// Check and update the primary address if necessary
const updatePrimaryAddress = async (existingAccount: Account, newPrimaryAddressId: number | undefined, entityManager: any) => {
    if (newPrimaryAddressId) {
        const addressRepo = entityManager.getRepository(Address);
        const newPrimaryAddress = await addressRepo.findOne({ where: { id: newPrimaryAddressId } });

        if (!newPrimaryAddress) {
            throw new FlierlyException(`Primary address not found with ID: ${newPrimaryAddressId}`, HttpCodes.BAD_REQUEST, `Invalid Primary Address`);
        }

        // If the new primary address is the same as the existing one, skip the update
        if (existingAccount.primaryAddress?.id === newPrimaryAddress.id) {
            return null; // No update needed
        }

        return newPrimaryAddress; // Return the new primary address
    }
    return null; // No new primary address provided
};

// Update account logic
const updateAccount = async (req: Request, res: Response): Promise<Response> => {
    // Validate account ID and request body
    const accountId = await validateAccountId(req.params.id);
    const updatePayload: any = await validateUpdatePayload(req.body);

    if (updatePayload?.id) delete updatePayload.id; // Remove ID from update payload

    const updateResult = await AppDataSource.transaction(async (entityManager) => {
        const accountRepo = entityManager.getRepository(Account);

        // Find existing account, including the primary address relation
        const existingAccount = await accountRepo.findOne({ where: { id: accountId }, relations: ['primaryAddress'] });

        if (!existingAccount) {
            throw new FlierlyException(`Account not found with ID: ${accountId}`, HttpCodes.BAD_REQUEST, `Account not found with ID: ${accountId}, Invalid Update`);
        }

        // Check and potentially update the primary address
        const newPrimaryAddress = await updatePrimaryAddress(existingAccount, updatePayload.primaryAddress?.id, entityManager);
        if (newPrimaryAddress) {
            existingAccount.primaryAddress = newPrimaryAddress; // Assign new primary address
            delete updatePayload.primaryAddress; // Remove from update payload to avoid double-update
        }

        // Merge and save the updated account
        const updatedAccount = accountRepo.merge(existingAccount, updatePayload);
        await accountRepo.save(updatedAccount); // This triggers @BeforeUpdate hooks

        return updatedAccount; // Return updated account
    });

    return res.status(HttpCodes.OK).json(apiResponse({
        success: true,
        result: updateResult,
        message: `Account updated successfully with ID: ${accountId}`,
        controller: 'CRUD.UpdateController',
        httpCode: HttpCodes.OK,
        error: null,
        req,
        res
    }));
};

export default updateAccount;
