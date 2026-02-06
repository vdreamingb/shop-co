import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateItemDto{
    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    detailsId?: number
}