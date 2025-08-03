import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export default class SearchEntityDetailsRequestDTO {

    @IsInt()
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit: number = 20;

    @IsString()
    keyword: string = '';

}