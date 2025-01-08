import { IsArray, IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import Pagination from '../Pagination.dto';

class PageRequestBody extends Pagination {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    loadRelations?: string[];

    @IsOptional()
    @IsBoolean()
    withDeleted: boolean = false;

    @IsOptional()
    @IsObject()
    filters: object = {};

};

export default PageRequestBody;
