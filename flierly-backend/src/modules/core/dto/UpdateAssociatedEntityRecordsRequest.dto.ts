import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export default class UpdateEntityAssociatedRecordsRequestDTO {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    entityRecordId: number;

    @IsString()
    @IsNotEmpty()
    entitySideField: string;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    addOne?: number;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    removeOne?: number;

    @Type(() => Number)
    @IsNumber({}, { each: true })
    @IsOptional()
    addMultiple?: number[];

    @Type(() => Number)
    @IsNumber({}, { each: true })
    @IsOptional()
    removeMultiple?: number[];

    @Type(() => Number)
    @IsNumber({}, { each: true })
    @IsOptional()
    replaceWith?: number[];
}