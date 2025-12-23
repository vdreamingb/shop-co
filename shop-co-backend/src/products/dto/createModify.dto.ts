import { IsString, MinLength, IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateModifyDto{
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    description?: string

    @Type(()=>Number)
    @IsNumber()
    price: number

    @IsOptional()
    @IsString()
    @MinLength(3)
    brand?:string
}