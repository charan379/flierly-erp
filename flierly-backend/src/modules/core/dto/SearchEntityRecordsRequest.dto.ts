import { IsBoolean, IsInt, IsObject, IsOptional, IsPositive, ValidateNested } from "class-validator";
import SortDTO from "./Sort.dto";
import { Type } from "class-transformer";

export default class SearchEntityRecordsRequestDTO {

    @IsInt()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit: number = 10;

    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => SortDTO)
    sort?: SortDTO;

    @IsObject()
    @Type(() => Object)
    @IsOptional()
    filters: Object = {};

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    withDeleted: boolean = false;

}