import { IsArray, IsBoolean, IsInt, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import SortDTO from "./Sort.dto";
import { Type } from "class-transformer";

export default class PageRequestDTO {

    @IsInt()
    @IsOptional()
    @IsPositive()
    page: number = 1;

    @IsInt()
    @IsOptional()
    @IsPositive()
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

    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    loadRelations: String[] = [];

}