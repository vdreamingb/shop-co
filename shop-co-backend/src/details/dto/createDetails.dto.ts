import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { SizeEnum, TypeEnum, StyleEnum, GenderEnum } from "src/common/enums/details.enum";


export class CreateDetailsDto{
    @Type(() => Number)
    @IsNumber()
    productId: number

    @IsString()
    @MinLength(3)
    color: string

    @IsEnum(SizeEnum)
    size: string

    @IsOptional()
    @IsEnum(GenderEnum)
    gender: string

    @IsOptional()
    @IsEnum(StyleEnum)
    style?: string

    @IsOptional()
    @IsEnum(TypeEnum)
    type?:string

    @Type(() => Number)
    @IsNumber()
    stock: number

    @Type(() => Number)
    @IsNumber()
    pricePercent: number
}