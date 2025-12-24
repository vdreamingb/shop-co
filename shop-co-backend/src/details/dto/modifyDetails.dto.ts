import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class ModifyDetailsDto{
    @IsOptional()
    @IsString()
    @MinLength(4)
    style?: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    type?: string;

    @Type(() => Number)
    @IsNumber()
    pricePercent: number;

    @Type(() => Number)
    @IsNumber()
    stock: number;
}