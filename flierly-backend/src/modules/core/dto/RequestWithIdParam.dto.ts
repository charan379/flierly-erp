import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export default class RequestWithIdParamDTO {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}