import { IsIn, IsNotEmpty, IsString } from "class-validator";


export default class SortDTO {
    @IsString()
    @IsNotEmpty()
    property: string;

    @IsString()
    @IsIn(['asc', 'desc'])
    order: SortOrder;
}