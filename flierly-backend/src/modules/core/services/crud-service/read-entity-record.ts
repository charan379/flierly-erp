import { EntityTarget, ObjectLiteral } from "typeorm";
import { EntityReadRequestBody } from "../../@types/request-data.types";
import { AppDataSource } from "@/lib/typeorm/app-datasource";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";


const readEntityRecord = async (entity: EntityTarget<ObjectLiteral>, request: EntityReadRequestBody): Promise<ObjectLiteral> => {

    try {

        const { id: entityRecordId, loadRelations } = request;

        const repositoty = AppDataSource.getRepository(entity);

        // Find the entity by ID with the specified relations
        const data = await repositoty.findOne({
            where: { id: entityRecordId },
            relations: loadRelations?.length > 0 ? loadRelations : loadRelations,
        });

        if (data === null)
            throw new FlierlyException(
                `No rows found with given id: ${entityRecordId}`,
                HttpCodes.BAD_REQUEST, '');

        return data;

    } catch (error) {

        throw error;
    }
};

export default readEntityRecord;