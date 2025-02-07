import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export default class ReadEntityRecordRequestDTO {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    entityRecordId: number;

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    withDeleted: boolean = false;

    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    loadRelations: string[] = [];

}