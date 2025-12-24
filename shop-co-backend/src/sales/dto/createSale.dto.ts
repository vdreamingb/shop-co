import { IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";
export class CreateSaleDto{
    @Type(() => Number)
    @IsNumber()
    id: number;

    @Type(() => Number)
    @IsNumber()
    productId: number;

    @Type(() => Number)
    @IsNumber()
    salesPercent: number;

    @Type(() => Date)
    @IsDate()
    saleDate: Date;

    @Type(() => Date)
    @IsDate()
    expiryDate: Date;
}