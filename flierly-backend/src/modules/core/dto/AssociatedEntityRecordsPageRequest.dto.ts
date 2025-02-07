import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import EntityRecordsPageRequestDTO from "./EntityRecordsPageRequest.dto";
import { Exclude, Type } from "class-transformer";
import { AssociatedEntityPageRequestType } from "../constants/associated-entity-page-requestatype.enum";

export default class AssociatedEntityRecordsPageRequestDTO extends EntityRecordsPageRequestDTO {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    entityRecordId: number;

    @IsString()
    @IsNotEmpty()
    associatedEntityCode: string;

    @IsString()
    @IsNotEmpty()
    entitySideField: string;

    @IsString()
    @IsNotEmpty()
    associatedEntitySideField: string;

    @IsEnum(AssociatedEntityPageRequestType)
    @IsNotEmpty()
    type: AssociatedEntityPageRequestType;

    @Exclude()
    loadRelations: never;
}