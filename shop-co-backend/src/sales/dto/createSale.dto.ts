import { IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";
export class CreateSaleDto{
    @Type(() => Number)
    @IsNumber()
    productId: number;

    @Type(() => Number)
    @IsNumber()
    salesPercent: number;

    @Type(() => Date)
    @IsDate()
    saleDate: string;

    @Type(() => Date)
    @IsDate()
    expiryDate: string;
}