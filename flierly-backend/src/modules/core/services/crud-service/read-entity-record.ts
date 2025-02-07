import { EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import FlierlyException from "@/lib/errors/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import ReadEntityRecordRequestDTO from "../../dto/ReadEntityRecordRequest.dto";


const readEntityRecord = async (entity: EntityTarget<ObjectLiteral>, request: ReadEntityRecordRequestDTO): Promise<ObjectLiteral> => {

    try {

        const { entityRecordId, loadRelations, withDeleted } = request;

        const entityRepositoty = AppDataSource.getRepository(entity);

        // Find the entity by ID with the specified relations
        const data = await entityRepositoty.findOne({
            where: { id: entityRecordId },
            relations: loadRelations?.length > 0 ? loadRelations : loadRelations,
            withDeleted
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