import { IsBoolean, IsObject, IsOptional, } from "class-validator";
import { Type } from "class-transformer";

export default class IsEntityRecordExistsRequestDTO {

    @IsBoolean()
    @Type(() => Boolean)
    @IsOptional()
    withDeleted: boolean = true;

    @IsObject()
    @Type(() => Object)
    @IsOptional()
    filters: Object = {};

}