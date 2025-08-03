import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, ArrayMinSize, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export default class RequestWithIdsArrayDTO {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsNumber({}, { each: true })
    @IsPositive({ each: true })
    @Type(() => Number)
    @IsNotEmpty({ each: true })
    ids: number[];
}