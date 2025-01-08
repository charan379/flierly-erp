import { IsSortOrderObject } from "@/lib/class-validator/custom-validators/IsSortOrderObject";
import { IsIn, IsInt, IsObject, IsOptional, IsString, Min } from "class-validator";

class Pagination {

    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit: number = 20;

    @IsOptional()
    @IsObject()
    @IsSortOrderObject({ message: 'Sort values must be either "ascend" or "descend".' })
    sort: { [key: string]: 'ascend' | 'descend' };

}


export default Pagination;