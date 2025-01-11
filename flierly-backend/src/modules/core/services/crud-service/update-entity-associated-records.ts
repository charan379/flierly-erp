import { EntityTarget, ObjectLiteral } from "typeorm";
import { UpdateAssociatedEntityRecordsRequestBody } from "../../@types/request-data.types";
import { AppDataSource } from "@/lib/database/typeorm/app-datasource";
import FlierlyException from "@/lib/flierly.exception";
import HttpCodes from "@/constants/http-codes.enum";
import getDiffFromArrayOfNumbers from "@/utils/get-diff-from-array-of-numbers.util";


const updateAssociatedEntityRecords = async (entity: EntityTarget<ObjectLiteral>, request: UpdateAssociatedEntityRecordsRequestBody): Promise<string[]> => {
    try {

        const { entityRecordId, entitySideField, addMultiple, addOne, newArray, removeMultiple, removeOne } = request;

        const repository = AppDataSource.getRepository(entity);

        // Fetch relation columns and validate the entitySide field
        const entitySideFieldMetadata = repository.metadata.relations.reduce((acc: Record<string, any>, column) => {
            acc[column.propertyName] = column.relationType;
            return acc;
        }, {});

        if (!Object.keys(entitySideFieldMetadata).includes(entitySideField)) {
            throw new FlierlyException(
                `${entitySideField} does not exist in ${entity.toString()}`,
                HttpCodes.BAD_REQUEST);
        }

        if (entitySideFieldMetadata[entitySideField] !== 'many-to-many') {
            throw new FlierlyException(
                `${entitySideField} is not many-to-many related to ${entity.toString()}`,
                HttpCodes.BAD_REQUEST);
        }

        // Fetch the current field data with relations loaded
        const queryBuilder = repository.createQueryBuilder();
        const entityRecord = await queryBuilder.where('id = :id', { id: entityRecordId }).loadAllRelationIds().getOneOrFail();

        const existingArray: number[] = entityRecord[entitySideField] ?? [];

        // Compute additions and removals based on request
        let idsToAdd: number[] = [];
        let idsToRemove: number[] = [];

        if (newArray) {
            // Sync array with newArray
            const compareResult = getDiffFromArrayOfNumbers(existingArray, newArray);
            idsToAdd = compareResult.newEntries;
            idsToRemove = compareResult.removedEntries;
        } else {
            // Handle individual and batch updates
            if (addOne && !existingArray.includes(addOne)) idsToAdd.push(addOne); // Add if not already present
            if (removeOne && existingArray.includes(removeOne)) idsToRemove.push(removeOne); // Remove if exists

            if (addMultiple) {
                idsToAdd.push(...addMultiple.filter((item) => !existingArray.includes(item))); // Filter items not already present
            }

            if (removeMultiple) {
                idsToRemove.push(...removeMultiple.filter((item) => existingArray.includes(item))); // Filter items that exist
            }

            // Ensure no duplicates in operations
            idsToAdd = [...new Set(idsToAdd)];
            idsToRemove = [...new Set(idsToRemove)];
        }

        // Execute transaction for updates
        await AppDataSource.transaction(async (entityManager) => {
            const transactionRepo = entityManager.getRepository(entity);

            await transactionRepo.createQueryBuilder().relation(entitySideField).of(entityRecordId).addAndRemove(idsToAdd, idsToRemove);
        });

        return [
            `Updates for entity ${entity.toString()} (ID: ${entityRecordId}, Relation: ${entitySideField}): Added IDs: ${idsToAdd.join(', ') || 'none'}, Removed IDs: ${idsToRemove.join(', ') || 'none'}.`,
            `Updated ${entitySideField}: ${idsToAdd.length} added, ${idsToRemove.length} removed.`
        ];

    } catch (error) {

        throw error;

    }
};

export default updateAssociatedEntityRecords;